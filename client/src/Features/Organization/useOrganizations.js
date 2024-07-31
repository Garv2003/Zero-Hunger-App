import { useQuery } from "@tanstack/react-query";
import { getOrganizations } from "../../services/apiOrganizations";

function useOrganizations() {
  const { data: organizationsList, isPending: loadingOrganizations } = useQuery(
    {
      queryKey: ["organizations"],
      queryFn: async () => {
        return await getOrganizations();
      },
    },
  );
  return { organizationsList, loadingOrganizations };
}

export default useOrganizations;
