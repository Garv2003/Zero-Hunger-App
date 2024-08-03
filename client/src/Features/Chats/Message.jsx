import propTypes from "prop-types";
import { useAuthContext } from "../../context/AuthProvider";

function Message({ text, sender }) {
  const { user } = useAuthContext();

  return (
    <div
      className={`flex w-full ${sender === user._id ? "justify-end" : "justify-start"} gap-2`}
    >
      <h1
        className={` ${sender === "Alice" ? "bg-blue-500" : "bg-blue-400"} w-fit max-w-[80%] rounded-lg p-2 text-sm`}
      >
        {text}
      </h1>
    </div>
  );
}

Message.propTypes = {
  text: propTypes.string.isRequired,
  sender: propTypes.string.isRequired,
};

export default Message;
