import { Link } from "react-router-dom";
import propTypes from "prop-types";

function ContactRow({ contact, currChat, handleChangeChat, setShowContact }) {
  return (
    <Link
      className={`ease ${currChat === contact ? "bg-stone-200" : "bg-stone-50"} flex flex-col rounded-md p-2 transition-all duration-75 hover:bg-stone-200`}
      onClick={() => {
        handleChangeChat(contact);
        setShowContact(false);
      }}
      to={`with/${contact._id}`}
    >
      <span className="font-medium">{contact.name}</span>
      <span className="text-sm text-stone-600">{contact.email}</span>
    </Link>
  );
}

ContactRow.propTypes = {
  contact: propTypes.object.isRequired,
  currChat: propTypes.object,
  handleChangeChat: propTypes.func,
  setShowContact: propTypes.func,
};

export default ContactRow;
