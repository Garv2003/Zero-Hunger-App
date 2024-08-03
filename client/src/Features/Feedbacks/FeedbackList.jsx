import FeedbackRow from "./FeedbackRow";
import Empty from "../../ui/Empty";
import useFeedbacks from "./useFeedbacks";
import Loader from "../../ui/Loader";
import propTypes from "prop-types";

function FeedbackList({ organization }) {
  const { feedbacksList, loadingFeedbacks } = useFeedbacks(organization);

  return (
    <ul className="flex w-full flex-col gap-4">
      {loadingFeedbacks ? (
        <Loader type={2} />
      ) : feedbacksList.length === 0 ? (
        <Empty resource="feedbacks" />
      ) : (
        feedbacksList.map((feedback) => (
          <FeedbackRow feedback={feedback} key={feedback._id} />
        ))
      )}
    </ul>
  );
}

FeedbackList.propTypes = {
  organization: propTypes.object.isRequired,
};

export default FeedbackList;
