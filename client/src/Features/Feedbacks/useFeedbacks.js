import { useQuery } from "@tanstack/react-query";

function useFeedbacks(id) {
  const { data: feedbacksList, isPending: loadingFeedbacks } = useQuery({
    queryKey: ["feedbacks", id],
    queryFn: () => {
      //   getDonations();
      //handle fetch donations
      return [];
    },
  });
  return { feedbacksList, loadingFeedbacks };
}

export default useFeedbacks;
