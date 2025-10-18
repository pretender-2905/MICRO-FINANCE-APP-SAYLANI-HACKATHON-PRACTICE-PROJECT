import express from "express";
import Vital from "../models/Vital.js";
import { authenticateUser } from "../middlewares/authentication.js";
// import { auth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authenticateUser, async (req, res) => {
  const vital = await Vital.create({ userId: req.user, ...req.body });
  res.json(vital);
});

router.get("/", auth, async (req, res) => {
  const vitals = await Vital.find({ userId: req.user }).sort({ recordedAt: -1 });
  res.json(vitals);
});

export default router;
