import express from "express";
import {
  getDonors,
  getOrganizationById,
  getOrganizations,
} from "../controllers/users.js";

const router = express.Router();

router.get("/organizations", getOrganizations);
router.get("/organization/:id", getOrganizationById);
router.get("/donors", getDonors);

export default router;
