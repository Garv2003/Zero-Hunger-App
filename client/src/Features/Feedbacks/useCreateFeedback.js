import { useMutation } from "@tanstack/react-query";
import { addFeedback } from "../../services/apiFeebacks";

function useCreateFeedback() {
  const { mutate: createFeedback, isPending: isSubmitting } = useMutation({
    mutationFn: (d) => {
      //   addFeedback(d);
      console.log(d);
    },
  });
  return { createFeedback, isSubmitting };
}

export default useCreateFeedback;
