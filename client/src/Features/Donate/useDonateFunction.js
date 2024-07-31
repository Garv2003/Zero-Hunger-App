import { useMutation } from "@tanstack/react-query";
import { makeDonation } from "../../services/apiDonations";

function useDonateFunction() {
  const { mutate: donateFunc, isPending: isDonating } = useMutation({
    mutationFn: async (d) => {
      return await makeDonation(d);
    },
  });
  return { donateFunc, isDonating };
}

export default useDonateFunction;
