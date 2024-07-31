import express from "express";
import { getDonations, createDonation } from "../controllers/donation.js";
const router = express.Router();

router.get("/donations/:id", getDonations);
router.post("/donation", createDonation);

export default router;
