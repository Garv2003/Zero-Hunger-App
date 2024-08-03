import Button from "../../ui/Button";
import Message from "./Message";
import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useSocket } from "../../context/SocketProvider";
import { useAuthContext } from "../../context/AuthProvider";
import axios from "axios";

const ChatBox = () => {
  const { id } = useParams();
  const { user } = useAuthContext();
  const { socket } = useSocket();

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrMessage, setArrMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("Not Active");
  const [isTyping, setIsTyping] = useState(false);

  const scrollRef = useRef();

  useEffect(() => {
    const handleTypingResponse = (data) => {
      setStatus(data.text);
      setIsTyping(data.text === "Typing...");
    };

    const handleGetMessage = (message) => {
      setArrMessage({
        senderId: message.senderId,
        receiverId: message.receiverId,
        text: message.text,
        createdAt: message.createdAt,
      });
    };

    socket.current.on("typingResponse", handleTypingResponse);
    socket.current.on("getMessage", handleGetMessage);

    return () => {
      socket.current.off("typingResponse", handleTypingResponse);
      socket.current.off("getMessage", handleGetMessage);
    };
  }, [id, socket]);

  useEffect(() => {
    if (arrMessage && id === arrMessage.senderId) {
      setMessages((prevMessages) => [...prevMessages, arrMessage]);
    }
  }, [arrMessage, id]);

  useEffect(() => {
    socket.current.emit("addUser", user._id);

    const handleGetUsers = (users) => {
      const userIsActive = users.some((user) => user.userId === id);
      setStatus(userIsActive ? "Active Now" : "Not Active");
    };

    socket.current.on("getUsers", handleGetUsers);

    return () => {
      socket.current.off("getUsers", handleGetUsers);
    };
  }, [id, socket, user._id]);

  const handleSendMessage = async () => {
    if (newMessage.trim() === "") return;

    const message = {
      senderId: user._id,
      receiverId: id,
      text: newMessage,
      createdAt: Date.now(),
    };

    socket.current.emit("sendMessage", message);
    setMessages((prevMessages) => [...prevMessages, message]);
    setNewMessage("");

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/message/create`,
        {
          from: user._id,
          to: id,
          message: newMessage,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/message/messages`,
          {
            from: user._id,
            to: id,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );
        setMessages(res.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getMessages();
  }, [id, user._id]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  //   // const handleTyping = (type) => {
  //   //   socket.current.emit("typing", {
  //   //     senderId: user._id,
  //   //     receiverId: id,
  //   //     text: type ? "Typing..." : "Active Now",
  //   //   });

  //   //   if (newMessage.trim() === "") {
  //   //     socket.current.emit("typing", {
  //   //       senderId: user._id,
  //   //       receiverId: id,
  //   //       text: "Online",
  //   //     });
  //   //   }
  //   // };

  return (
    <div className="grid h-full w-full grid-rows-[1fr_auto]">
      <ul className="flex h-full max-h-[600px] w-full flex-col gap-4 overflow-y-scroll p-4">
        {messages.map((message) => {
          return (
            <Message
              text={message.text}
              key={message._id}
              sender={message.senderId}
            />
          );
        })}
      </ul>
      <div ref={scrollRef}></div>
      <div className="w-full overflow-hidden rounded-md border">
        <form
          className="grid h-full w-full grid-cols-[1fr_auto] overflow-hidden"
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
        >
          <textarea
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="h-full w-full border-none p-4"
          ></textarea>
          <Button type="patient" purpose="submit" size="small">
            Send
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChatBox;
