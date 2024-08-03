import express from "express";
import { getPhotos, createPhoto } from "../controllers/photo.js";
const router = express.Router();

router.get("/photos/:id", getPhotos);
router.post("/create", createPhoto);

export default router;
