import MessageBox from "../Features/Chats/MessageBox";
import ContactedList from "../Features/Chats/contactedPeople/ContactedList";
import { useState, useEffect } from "react";
import Loader from "../ui/Loader";

function Messages() {
  const [currChat, setCurrChat] = useState(null);
  const [loading, setLoading] = useState(false);

  function handleChangeChat(contact) {
    setCurrChat(contact);
  }

  if (loading) return <Loader />;

  return (
    <div className="relative grid h-full max-h-[800px] w-full grid-cols-[auto_1fr] border">
      <ContactedList currChat={currChat} handleChangeChat={handleChangeChat} />
      <MessageBox currChat={currChat} setCurrChat={setCurrChat} />
    </div>
  );
}

export default Messages;
