import express from "express";
import {
  getDonations,
  createDonation,
  dashboard,
} from "../controllers/donation.js";
const router = express.Router();

router.get("/donations/:id", getDonations);
router.get("/dashboard/", dashboard);
router.post("/donation", createDonation);

export default router;
