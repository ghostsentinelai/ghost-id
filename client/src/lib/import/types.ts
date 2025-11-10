export interface AllowedDateRange {
  earliestAllowedDate: string;
  latestAllowedDate: string;
}

export interface UmamiEvent {
  session_id: string;
  hostname: string;
  browser: string;
  os: string;
  device: string;
  screen: string;
  language: string;
  country: string;
  region: string;
  city: string;
  url_path: string;
  url_query: string;
  referrer_path: string;
  referrer_query: string;
  referrer_domain: string;
  page_title: string;
  event_type: string;
  event_name: string;
  distinct_id: string;
  created_at: string;
}

// Batch import request (client sends raw rows to server)
export interface BatchImportRequest {
  events: UmamiEvent[]; // Raw Umami CSV rows
  importId: string;
}

// Batch import response
export interface BatchImportResponse {
  success: boolean;
  importedCount: number;
  message?: string;
  error?: string;
}

// Import progress tracking
export interface ImportProgress {
  status: "idle" | "parsing" | "uploading" | "completed" | "failed";
  parsedRows: number;
  skippedRows: number;
  importedEvents: number;
  errors: number;
}
