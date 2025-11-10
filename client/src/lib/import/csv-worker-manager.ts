// CSV import manager using PapaParse with built-in worker
// Handles streaming, batching, and sequential uploads
// Server handles transformation and quota checking

import Papa from "papaparse";
import { DateTime } from "luxon";
import type { ImportProgress, UmamiEvent } from "./types";

type ProgressCallback = (progress: ImportProgress) => void;
type CompleteCallback = (success: boolean, message: string) => void;

const BATCH_SIZE = 5000;

const umamiHeaders = [
  undefined,
  "session_id",
  undefined,
  undefined,
  "hostname",
  "browser",
  "os",
  "device",
  "screen",
  "language",
  "country",
  "region",
  "city",
  "url_path",
  "url_query",
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  "referrer_path",
  "referrer_query",
  "referrer_domain",
  "page_title",
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  "event_type",
  "event_name",
  undefined,
  "distinct_id",
  "created_at",
  undefined,
];

export class CSVWorkerManager {
  private aborted = false;
  private progress: ImportProgress = {
    status: "idle",
    parsedRows: 0,
    skippedRows: 0,
    importedEvents: 0,
    errors: 0,
  };
  private onProgress: ProgressCallback | null = null;
  private onComplete: CompleteCallback | null = null;
  private uploadInProgress = false;
  private parsingComplete = false;
  private siteId: number = 0;
  private importId: string = "";

  private currentBatch: UmamiEvent[] = [];
  private earliestAllowedDate: DateTime | null = null;
  private latestAllowedDate: DateTime | null = null;

  constructor(onProgress?: ProgressCallback, onComplete?: CompleteCallback) {
    this.onProgress = onProgress || null;
    this.onComplete = onComplete || null;
  }

  startImport(
    file: File,
    siteId: number,
    importId: string,
    earliestAllowedDate: string,
    latestAllowedDate: string
  ): void {
    this.siteId = siteId;
    this.importId = importId;
    this.parsingComplete = false;
    this.uploadInProgress = false;
    this.currentBatch = [];
    this.aborted = false;

    this.progress = {
      status: "parsing",
      parsedRows: 0,
      skippedRows: 0,
      importedEvents: 0,
      errors: 0,
    };

    // Set up date range filter
    this.earliestAllowedDate = DateTime.fromFormat(earliestAllowedDate, "yyyy-MM-dd", { zone: "utc" }).startOf("day");
    this.latestAllowedDate = DateTime.fromFormat(latestAllowedDate, "yyyy-MM-dd", { zone: "utc" }).endOf("day");

    if (!this.earliestAllowedDate.isValid) {
      this.handleError(`Invalid earliest allowed date: ${earliestAllowedDate}`);
      return;
    }

    if (!this.latestAllowedDate.isValid) {
      this.handleError(`Invalid latest allowed date: ${latestAllowedDate}`);
      return;
    }

    // Start parsing with PapaParse worker
    Papa.parse<UmamiEvent>(file, {
      worker: true,
      header: true,
      skipEmptyLines: "greedy",
      delimiter: "",
      transformHeader: (header, index) => {
        return umamiHeaders[index] || header;
      },
      step: results => {
        if (this.aborted) return;

        if (results.data) {
          this.handleParsedRow(results.data);
        }
        if (results.errors && results.errors.length > 0) {
          this.progress.errors++;
        }
      },
      complete: () => {
        if (this.aborted) return;
        this.handleParseComplete();
      },
      error: error => {
        if (this.aborted) return;
        this.handleError(error.message);
      },
    });

    this.notifyProgress();
  }

  private isDateInRange(dateStr: string): boolean {
    const createdAt = DateTime.fromFormat(dateStr, "yyyy-MM-dd HH:mm:ss", { zone: "utc" });
    if (!createdAt.isValid) {
      return false;
    }

    if (this.earliestAllowedDate && createdAt < this.earliestAllowedDate) {
      return false;
    }

    if (this.latestAllowedDate && createdAt > this.latestAllowedDate) {
      return false;
    }

    return true;
  }

  private handleParsedRow(row: unknown): void {
    const rawEvent = row as Record<string, unknown>;

    const umamiEvent: UmamiEvent = {
      session_id: String(rawEvent.session_id || ""),
      hostname: String(rawEvent.hostname || ""),
      browser: String(rawEvent.browser || ""),
      os: String(rawEvent.os || ""),
      device: String(rawEvent.device || ""),
      screen: String(rawEvent.screen || ""),
      language: String(rawEvent.language || ""),
      country: String(rawEvent.country || ""),
      region: String(rawEvent.region || ""),
      city: String(rawEvent.city || ""),
      url_path: String(rawEvent.url_path || ""),
      url_query: String(rawEvent.url_query || ""),
      referrer_path: String(rawEvent.referrer_path || ""),
      referrer_query: String(rawEvent.referrer_query || ""),
      referrer_domain: String(rawEvent.referrer_domain || ""),
      page_title: String(rawEvent.page_title || ""),
      event_type: String(rawEvent.event_type || ""),
      event_name: String(rawEvent.event_name || ""),
      distinct_id: String(rawEvent.distinct_id || ""),
      created_at: String(rawEvent.created_at || ""),
    };

    // Skip rows with missing created_at (required field)
    if (!umamiEvent.created_at) {
      this.progress.skippedRows++;
      return;
    }

    // Apply quota-based date range filter
    if (!this.isDateInRange(umamiEvent.created_at)) {
      this.progress.skippedRows++;
      return;
    }

    // Add to batch
    this.currentBatch.push(umamiEvent);
    this.progress.parsedRows++;

    // Send batch when it reaches chunk size
    if (this.currentBatch.length >= BATCH_SIZE) {
      this.sendBatch();
    }
  }

  private sendBatch(): void {
    if (this.currentBatch.length > 0) {
      const batch = this.currentBatch;
      this.currentBatch = [];

      // Upload batch (sequential)
      this.progress.status = "uploading";
      this.notifyProgress();
      this.uploadBatch(batch);
    }
  }

  private handleParseComplete(): void {
    this.parsingComplete = true;

    // Send final batch if any
    this.sendBatch();

    // Check if upload is complete
    this.checkCompletion();
  }

  private handleError(message: string): void {
    this.progress.status = "failed";
    this.progress.errors++;
    this.notifyProgress();
    if (this.onComplete) {
      this.onComplete(false, message);
    }
  }

  private async uploadBatch(events: UmamiEvent[]): Promise<void> {
    this.uploadInProgress = true;

    try {
      const response = await fetch(`/api/batch-import-events/${this.siteId}/${this.importId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          events,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: "Unknown error" }));
        throw new Error(errorData.error || `HTTP ${response.status}`);
      }

      const data = await response.json();
      this.progress.importedEvents += data.importedCount ?? events.length;
      this.notifyProgress();
    } catch (error) {
      // Fail fast - no retries
      this.progress.status = "failed";
      this.progress.errors++;
      this.notifyProgress();

      if (this.onComplete) {
        this.onComplete(false, `Upload failed: ${error instanceof Error ? error.message : "Unknown error"}`);
      }

      this.terminate();
      return;
    } finally {
      this.uploadInProgress = false;
    }

    // Check if we're done
    this.checkCompletion();
  }

  private checkCompletion(): void {
    if (this.parsingComplete && !this.uploadInProgress) {
      this.progress.status = "completed";
      this.notifyProgress();
      if (this.onComplete) {
        this.onComplete(true, `Import completed successfully: ${this.progress.importedEvents} events imported`);
      }
    }
  }

  private notifyProgress(): void {
    if (this.onProgress) {
      this.onProgress({ ...this.progress });
    }
  }

  getProgress(): ImportProgress {
    return { ...this.progress };
  }

  terminate(): void {
    this.aborted = true;
  }
}
