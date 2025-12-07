import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { SESSION_PAGE_FILTERS } from "../../../lib/filterGroups";
import { getFilteredFilters, useStore } from "../../../lib/store";
import { buildApiParams, timeZone } from "../../utils";
import {
  fetchSession,
  fetchSessions,
  fetchUserSessionCount,
  GetSessionsResponse,
  SessionPageviewsAndEvents,
  UserSessionCountResponse,
} from "../endpoints";

export function useGetSessions(
  userId?: string,
  page: number = 1,
  limit: number = 100,
  identifiedOnly: boolean = false
) {
  const { time, site } = useStore();

  const filteredFilters = getFilteredFilters(SESSION_PAGE_FILTERS);

  // When filtering by userId, we fetch all sessions for that user (no time filter)
  // Otherwise use buildApiParams which handles past-minutes mode
  const params = userId
    ? { startDate: "", endDate: "", timeZone, filters: filteredFilters }
    : buildApiParams(time, { filters: filteredFilters });

  return useQuery<{ data: GetSessionsResponse }>({
    queryKey: ["sessions", time, site, filteredFilters, userId, page, limit, identifiedOnly],
    queryFn: () => {
      return fetchSessions(site, {
        ...params,
        page,
        limit,
        userId,
        identifiedOnly,
      });
    },
    staleTime: Infinity,
  });
}

export function useGetSessionsInfinite(userId?: string) {
  const { time, site } = useStore();

  const filteredFilters = getFilteredFilters(SESSION_PAGE_FILTERS);

  // When filtering by userId, we fetch all sessions for that user (no time filter)
  // Otherwise use buildApiParams which handles past-minutes mode
  const params = userId
    ? { startDate: "", endDate: "", timeZone, filters: filteredFilters }
    : buildApiParams(time, { filters: filteredFilters });

  return useInfiniteQuery<{ data: GetSessionsResponse }>({
    queryKey: ["sessions-infinite", time, site, filteredFilters, userId],
    queryFn: ({ pageParam = 1 }) => {
      return fetchSessions(site, {
        ...params,
        page: pageParam as number,
        userId,
      });
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage: { data: GetSessionsResponse }, allPages) => {
      // If we have data and it's a full page (100 items), there might be more
      if (lastPage?.data && lastPage.data.length === 100) {
        return allPages.length + 1;
      }
      return undefined;
    },
    staleTime: Infinity,
  });
}

export function useGetSessionDetailsInfinite(sessionId: string | null) {
  const { site, time } = useStore();
  const pastMinutesMode = time.mode === "past-minutes";

  // Get minutes based on the time mode
  let minutes: number | undefined;
  if (pastMinutesMode && time.mode === "past-minutes") {
    minutes = time.pastMinutesStart;
  }

  return useInfiniteQuery<{ data: SessionPageviewsAndEvents }>({
    queryKey: ["session-details-infinite", sessionId, site, minutes],
    queryFn: ({ pageParam = 0 }) => {
      if (!sessionId) throw new Error("Session ID is required");

      return fetchSession(site, {
        sessionId,
        limit: 100,
        offset: pageParam as number,
        minutes: pastMinutesMode ? minutes : undefined,
      });
    },
    initialPageParam: 0,
    getNextPageParam: lastPage => {
      if (lastPage?.data?.pagination?.hasMore) {
        return lastPage.data.pagination.offset + lastPage.data.pagination.limit;
      }
      return undefined;
    },
    enabled: !!sessionId && !!site,
    staleTime: Infinity,
  });
}

export function useGetUserSessionCount(userId: string) {
  const { site } = useStore();

  return useQuery<{ data: UserSessionCountResponse[] }>({
    queryKey: ["user-session-count", userId, site],
    queryFn: () => {
      return fetchUserSessionCount(site, {
        userId,
        timeZone,
      });
    },
    staleTime: Infinity,
    enabled: !!site && !!userId,
  });
}
