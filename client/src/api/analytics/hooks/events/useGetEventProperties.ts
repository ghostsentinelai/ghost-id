import { useQuery } from "@tanstack/react-query";
import { timeZone } from "../../../../lib/dateTimeUtils";
import { EVENT_FILTERS } from "../../../../lib/filterGroups";
import { getFilteredFilters, useStore } from "../../../../lib/store";
import { getStartAndEndDate } from "../../../utils";
import { fetchEventProperties } from "../../endpoints";

export function useGetEventProperties(eventName: string | null) {
  const { site, time } = useStore();

  const filteredFilters = getFilteredFilters(EVENT_FILTERS);
  const { startDate, endDate } = getStartAndEndDate(time);

  return useQuery({
    queryKey: ["event-properties", site, eventName, time, filteredFilters],
    enabled: !!site && !!eventName,
    queryFn: () => {
      return fetchEventProperties(site, {
        startDate: startDate ?? "",
        endDate: endDate ?? "",
        timeZone,
        filters: filteredFilters.length > 0 ? filteredFilters : undefined,
        eventName: eventName!,
      });
    },
  });
}
