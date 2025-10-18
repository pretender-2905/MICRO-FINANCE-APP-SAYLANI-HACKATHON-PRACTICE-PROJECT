import express from "express";
import FamilyMember from "../models/FamilyMember.js";
import File from "../models/File.js";
import { authenticateUser } from "../middlewares/authentication.js";
// import { auth } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create family member
router.post("/", authenticateUser, async (req, res) => {
  const { name, relationship } = req.body;
  if (!name) return res.status(400).json({ msg: "Name required" });
  const member = await FamilyMember.create({ userId: req.user, name, relationship });
  res.json(member);
});

// List family members for user
router.get("/", authenticateUser, async (req, res) => {
  const members = await FamilyMember.find({ userId: req.user }).sort({ createdAt: -1 });
  res.json(members);
});

// Remove family member 
router.delete("/:id", authenticateUser, async (req, res) => {
  try {
    const member = await FamilyMember.findById(req.params.id);
    if (!member) {
      return res.status(404).json({ msg: "Member not found" });
    }

    // ✅ FIX #1: normalize userId from req.user
    const userId = typeof req.user === "object" ? req.user._id : req.user;

    // ✅ FIX #2: compare correctly
    if (member.userId.toString() !== userId) {
      return res.status(403).json({ msg: "Unauthorized" });
    }

    // delete all files for this member
    await File.deleteMany({ familyMemberId: member._id });

    // ✅ FIX #3: use findByIdAndDelete (remove() deprecated)
    await FamilyMember.findByIdAndDelete(member._id);

    return res.json({ msg: "Member removed and related files deleted" });
  } catch (err) {
    console.error("Delete error:", err);
    return res.status(500).json({ msg: "Server error" });
  }
});




// get the reports individually

// GET /api/files?familyMemberId=<id>
router.get("/", authenticateUser, async (req, res) => {
  const filter = { userId: req.user };
  if (req.query.familyMemberId) filter.familyMemberId = req.query.familyMemberId;
  const files = await File.find(filter).sort({ uploadedAt: -1 });
  res.json(files);
});

export default router;
