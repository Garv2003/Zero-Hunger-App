function FeedbackRow({ feedback }) {
  return (
    <li className="flex items-center justify-between gap-4 rounded-md bg-red-50 p-4">
      <div className="flex flex-col gap-2 text-sm">
        <p className="font-semibold">{feedback.username}</p>
        <p className="italic">{feedback.comment}</p>
      </div>
      <div>{feedback.rating}/5</div>
    </li>
  );
}

export default FeedbackRow;
