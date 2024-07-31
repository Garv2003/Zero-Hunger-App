import express from "express";
import { register, login, updateProfile } from "../controllers/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/update/:id", updateProfile);

export default router;
