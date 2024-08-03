import { useMutation, useQueryClient } from "@tanstack/react-query";
import { makeDonation } from "../../services/apiDonations";
import toast from "react-hot-toast";
function useDonateFunction() {
  const queryClient = useQueryClient();
  const { mutate: donateFunc, isPending: isDonating } = useMutation({
    mutationFn: makeDonation,
    onSuccess: () => {
      toast.success("Transaction successfull");
      queryClient.invalidateQueries({
        queryKey: ["donations"],
      });
    },
    onError: (error) => {
      toast.error("Transaction failed");
      console.log(error);
    },
  });
  return { donateFunc, isDonating };
}

export default useDonateFunction;
