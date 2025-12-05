import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useStore } from "../../../lib/store";
import { authedFetch } from "../../utils";

/**
 * Hook for deleting a saved funnel report
 */
export function useDeleteFunnel() {
  const queryClient = useQueryClient();
  const { site } = useStore();

  return useMutation<{ success: boolean }, Error, number>({
    mutationFn: async reportId => {
      try {
        return await authedFetch<{ success: boolean }>(`/funnels/${reportId}/${site}`, undefined, {
          method: "DELETE",
        });
      } catch (error) {
        console.error(error);
        throw new Error("Failed to delete funnel");
      }
    },
    onSuccess: () => {
      // Invalidate the funnels query to refresh the list
      queryClient.invalidateQueries({ queryKey: ["funnels"] });
    },
  });
}
