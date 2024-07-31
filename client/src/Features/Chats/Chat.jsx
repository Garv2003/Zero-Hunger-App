function Chat() {
  return <div>Chat</div>;
}

export default Chat;

// import Picker from "emoji-picker-react";

//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");
//   const [arrMessage, setarrMessage] = useState(null);
//   const [Status, setStatus] = useState("Not Active");

//   const [isTyping, setIsTyping] = useState(false);
//   const [EmojiBox, setEmojiBox] = useState(false);
//   const { socket } = UseSocket();

//   const scrollRef = useRef();

//   useEffect(() => {
//     socket.current.on("typingResponse", (data) => {
//       setStatus(data.text);
//       if (data.text === "Typing...") {
//         setIsTyping(true);
//       } else {
//         setIsTyping(false);
//       }
//     });
//     socket.current.on("getmessage", (message) => {
//       setarrMessage({
//         senderId: message.senderId,
//         receiverId: message.receiverId,
//         text: message.text,
//         createdAt: message.createdAt,
//       });
//     });
//   }, [isTyping]);

//   useEffect(() => {
//     arrMessage &&
//       info?._id === arrMessage.senderId &&
//       setMessages((messages) => [...messages, arrMessage]);
//   }, [arrMessage, info._id]);

//   useEffect(() => {
//     socket.current.emit("adduser", Id);
//     socket.current.on("getusers", (us) => {
//       const user = us.filter((user) => user.userId === info._id);
//       if (user[0]) {
//         setStatus("Active Now");
//       } else {
//         setStatus("Not Active");
//       }
//     });
//   }, [info]);

//   const handleSendMessage = async () => {
//     let message = {
//       senderId: Id,
//       receiverId: info._id,
//       text: newMessage,
//       createdAt: Date.now(),
//     };
//     if (newMessage.trim() !== "") {
//       socket.current.emit("sendmessage", message);
//       setMessages((messages) => [...messages, message]);
//       setNewMessage("");
//       await axios
//         .post(`${import.meta.env.VITE_APP_BACKEND_URL}/message/addmessage`, {
//           from: Id,
//           to: info._id,
//           message: newMessage,
//         })
//         .then(() => {
//           message = "";
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     }
//   };

//   useEffect(() => {
//     const getmessages = async () => {
//       setLoading(true);
//       await axios
//         .post(`${import.meta.env.VITE_APP_BACKEND_URL}/message/getmessage`, {
//           from: Id,
//           to: info._id,
//         })
//         .then((res) => {
//           setMessages(res.data);
//           setLoading(false);
//         })
//         .catch((err) => {
//           setError(err.message);
//           setLoading(false);
//         });
//     };
//     getmessages();
//   }, [info._id]);

//   useEffect(() => {
//     scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
//   }, [messages]);

//   const handleTyping = (type) => {
//     socket.current.emit("typing", {
//       senderId: Id,
//       receiverId: info._id,
//       text: type ? "Typing..." : "Active Now",
//     });

//     if (newMessage.trim() === "") {
//       socket.current.emit("typing", {
//         senderId: Id,
//         receiverId: info._id,
//         text: "Online",
//       });
//     }
//   };
