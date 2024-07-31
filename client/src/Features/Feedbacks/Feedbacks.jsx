import Modal from "../../ui/Modal";
import FeedbackList from "./FeedbackList";
import CreateFeedbackForm from "./CreateFeedbackForm";
import { useAuthContext } from "../../context/AuthProvider";

function Feedbacks() {
  const { user } = useAuthContext();

  return (
    <div className="flex flex-col gap-4">
      <div>
        {user.user.type === "Donor" && (
          <Modal>
            <Modal.Open opens="feedbackForm">
              <button className="rounded-md border border-stone-300 p-2 shadow-md">
                Add Feedback
              </button>
            </Modal.Open>
            <Modal.Window name="feedbackForm">
              <CreateFeedbackForm />
            </Modal.Window>
          </Modal>
        )}
      </div>
      <FeedbackList />
    </div>
  );
}

export default Feedbacks;
