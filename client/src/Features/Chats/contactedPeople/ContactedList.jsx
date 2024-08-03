import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";
import ContactRow from "./ContactRow";
import { useState, useEffect } from "react";
import axios from "axios";
import propTypes from "prop-types";
import { useAuthContext } from "../../../context/AuthProvider";

function ContactedList({ currChat, handleChangeChat }) {
  const [showContacts, setShowContacts] = useState(true);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  const { user } = useAuthContext();

  useEffect(() => {
    async function fetchUsers() {
      try {
        const url =
          user.user.type === "Donor"
            ? "/api/users/organizations"
            : "/api/users/donors";
        const { data } = await axios.get(import.meta.env.VITE_API_URL + url, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (data.success) {
          setUsers(data.organizations || data.donors);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="grid h-full w-fit grid-rows-[auto_1fr] gap-2 overflow-y-scroll p-4">
      <button className="text-xl" onClick={() => setShowContacts((p) => !p)}>
        {showContacts ? <AiOutlineMenuFold /> : <AiOutlineMenuUnfold />}
      </button>
      {showContacts && (
        <ul className="absolute top-10 flex flex-col gap-4 rounded-xl border bg-white p-4 md:static">
          {users.map((user) => (
            <ContactRow
              contact={user}
              key={user._id}
              handleChangeChat={handleChangeChat}
              currChat={currChat}
              setShowContact={setShowContacts}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

ContactedList.propTypes = {
  currChat: propTypes.object,
  handleChangeChat: propTypes.func,
};

export default ContactedList;
