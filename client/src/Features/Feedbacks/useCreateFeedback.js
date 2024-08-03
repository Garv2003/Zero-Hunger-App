import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addFeedback } from "../../services/apiFeebacks";
import toast from "react-hot-toast";

function useCreateFeedback(id) {
  const queryClient = useQueryClient();
  const { mutate: createFeedback, isPending: isSubmitting } = useMutation({
    mutationFn: (d) => addFeedback(d),
    onSuccess: () => {
      toast.success("Feedback posted ");
      queryClient.invalidateQueries({
        queryKey: ["feedbacks", id],
      });
    },
    onError: () => toast.error("Failed to post feedback"),
  });

  return { createFeedback, isSubmitting };
}

export default useCreateFeedback;
