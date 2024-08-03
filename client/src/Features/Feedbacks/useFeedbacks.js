import { useQuery } from "@tanstack/react-query";
import { getFeedbacks } from "../../services/apiFeebacks";

function useFeedbacks(organization) {
  const { data: feedbacksList, isPending: loadingFeedbacks } = useQuery({
    queryKey: ["feedbacks", organization._id],
    queryFn: () => {
      return getFeedbacks(organization._id);
    },
  });
  return { feedbacksList, loadingFeedbacks };
}

export default useFeedbacks;
