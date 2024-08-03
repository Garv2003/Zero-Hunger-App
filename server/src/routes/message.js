import express from "express";
import { getMessages, addMessage } from "../controllers/message.js";

const router = express.Router();

router.post("/messages", getMessages);
router.post("/create", addMessage);

export default router;
