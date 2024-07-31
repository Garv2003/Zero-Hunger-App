import React from "react";
import FeedbackRow from "./FeedbackRow";
import Empty from "../../ui/Empty";
import useFeedbacks from "./useFeedbacks";

function FeedbackList({ id }) {
  const feedbacks = [
    {
      id: 1,
      username: "john_doe",
      rating: 5,
      comment: "Great service! Highly recommend.",
    },
    {
      id: 2,
      username: "jane_smith",
      rating: 4,
      comment: "Good experience overall, but there is room for improvement.",
    },
    {
      id: 3,
      username: "sam_jones",
      rating: 3,
      comment: "Average experience, nothing special.",
    },
    {
      id: 4,
      username: "linda_brown",
      rating: 2,
      comment: "Not very satisfied with the service.",
    },
    {
      id: 5,
      username: "mike_johnson",
      rating: 1,
      comment: "Terrible experience. Will not come back.",
    },
  ];

  const { feedbacksList = [], loadingFeedbacks } = useFeedbacks();
  console.log(feedbacks);

  if (feedbacks.length === 0) return <Empty resource="feedbacks" />;
  //get feedbacks for the org
  return (
    <ul className="flex flex-col gap-4">
      {feedbacks.map((feedback) => (
        <FeedbackRow feedback={feedback} key={feedback.id} />
      ))}
    </ul>
  );
}

export default FeedbackList;
