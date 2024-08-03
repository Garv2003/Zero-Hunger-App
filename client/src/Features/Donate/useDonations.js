import { useQuery } from "@tanstack/react-query";
import { getDonations } from "../../services/apiDonations";

function useDonations(type) {
  const { data: donationList = [], isPending: loadingDonations } = useQuery({
    queryKey: ["donations"],
    queryFn: () => getDonations(type),
  });
  return { donationList, loadingDonations };
}

export default useDonations;
