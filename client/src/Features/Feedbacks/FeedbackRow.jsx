import FeedbackRating from "../../ui/FeedbackRating";
import propTypes from "prop-types";

function FeedbackRow({ feedback }) {
  return (
    <li className="flex items-center justify-between gap-4 rounded-md bg-red-50 p-4">
      <div className="flex flex-col gap-2 text-sm">
        <p className="font-semibold">{feedback.donor.name}</p>
        <p className="italic">{feedback.message}</p>
      </div>
      <FeedbackRating rating={feedback.rating} />
    </li>
  );
}

FeedbackRow.propTypes = {
  feedback: propTypes.object.isRequired,
};

export default FeedbackRow;
