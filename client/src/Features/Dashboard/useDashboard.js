import { useQuery } from "@tanstack/react-query";

import { getDashboard } from "../../services/apiDashboard";

function useDashboard() {
  const { data: dashboard, isPending: loadingDashboard } = useQuery({
    queryKey: ["dashboard"],
    queryFn: async () => {
      return await getDashboard();
    },
  });
  return { dashboard, loadingDashboard };
}

export default useDashboard;
