import { FaStar } from "react-icons/fa";

function FeedbackRating({ rating }) {
  return (
    <ul className="flex items-center text-yellow-500">
      {Array.from({ length: rating }, (v, i) => (
        <FaStar key={i} />
      ))}
    </ul>
  );
}

export default FeedbackRating;
