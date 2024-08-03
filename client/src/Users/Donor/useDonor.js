import { useQuery } from "@tanstack/react-query";
import { getDonor } from "../../services/apiDonor";

function useDonor(_id) {
  const { data: donor, isPending: loadingDonor } = useQuery({
    queryKey: ["donor", _id],
    queryFn: (_id) => getDonor(_id),
  });

  return { donor, loadingDonor };
}

export default useDonor;
