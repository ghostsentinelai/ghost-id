import { useQuery } from "@tanstack/react-query";
import { authedFetch, getQueryParams } from "../../utils";
import { GetSessionsResponse } from "../useGetUserSessions";
import { Time } from "../../../components/DateSelector/types";
import { FunnelStep } from "./useGetFunnel";
import { Filter } from "@rybbit/shared";
import { getFilteredFilters } from "../../../lib/store";
import { FUNNEL_PAGE_FILTERS } from "../../../lib/filterGroups";

interface FunnelStepSessionsResponse {
  data: GetSessionsResponse;
}

export function useGetFunnelStepSessions({
  steps,
  stepNumber,
  siteId,
  time,
  mode,
  page = 1,
  limit = 25,
  enabled = false,
}: {
  steps: FunnelStep[];
  stepNumber: number;
  siteId: number;
  time: Time;
  mode: "reached" | "dropped";
  page?: number;
  limit?: number;
  enabled?: boolean;
  filters?: Filter[];
}) {
  const timeParams = getQueryParams(time);
  const filteredFilters = getFilteredFilters(FUNNEL_PAGE_FILTERS);

  return useQuery({
    queryKey: ["funnel-step-sessions", steps, stepNumber, siteId, timeParams, mode, page, limit, filteredFilters],
    queryFn: async () => {
      return authedFetch<FunnelStepSessionsResponse>(
        `/funnel/${stepNumber}/sessions/${siteId}`,
        {
          ...timeParams,
          mode,
          page,
          limit,
          filters: filteredFilters,
        },
        {
          method: "POST",
          data: { steps },
        }
      );
    },
    enabled: !!siteId && !!steps && steps.length >= 2 && enabled,
  });
}
