import Message from "../models/message.js";

export const getMessages = async (req, res, next) => {
  try {
    const { from, to } = req.body;

    const messages = await Message.find({
      users: {
        $all: [from, to],
      },
    }).sort({ updatedAt: 1 });

    res.json(messages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to get messages" });
  }
};

export const addMessage = async (req, res, next) => {
  try {
    const { from, to, message } = req.body;
    const data = await Message.create({
      text: message,
      users: [from, to],
      senderId: from,
    });

    if (data) {
      res
        .status(201)
        .json({ success: true, message: "Message added successfully." });
    } else {
      res.status(500).json({ error: "Failed to add message to the database" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add message" });
  }
};
