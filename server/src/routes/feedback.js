import express from "express";
import { createFeedback, getFeedback } from "../controllers/feedback.js";

const router = express.Router();

router.get("/list/:id", getFeedback);
router.post("/create", createFeedback);

export default router;
