import { getOrganizationById } from "../../services/apiOrganizations";
import { useQuery } from "@tanstack/react-query";

function useOrganizationById(id) {
  const { data: organization, isLoading: loadingOrganization } = useQuery({
    queryKey: ["organization", id],
    queryFn: () => getOrganizationById(id),
  });
  return { organization, loadingOrganization };
}

export default useOrganizationById;
