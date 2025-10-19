import express from "express";
import multer from "multer";
import cloudinary from "../utils/cloudinary.js";
import File from "../models/File.js";
import { authenticateUser } from "../middlewares/authentication.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// ✅ Upload a file/report
router.post("/upload", authenticateUser, upload.single("file"), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    const file = await File.create({
      userId: req.user._id,
      familyMemberId: mongoose.Types.ObjectId(req.body.familyMemberId), // ✅ convert string to ObjectId
      originalName: req.file.originalname,
      cloudUrl: result.secure_url,
      mimeType: req.file.mimetype,
      reportDate: req.body.reportDate,
      testName: req.body.testName,
      doctor: req.body.doctor,
      price: req.body.price,
      note: req.body.note,
    });
    res.json(file);
  } catch (err) {
    console.error("Upload failed:", err);
    res.status(500).json({ msg: "File upload failed" });
  }
});

// ✅ Get all reports (optionally filter by familyMemberId)
router.get("/", authenticateUser, async (req, res) => {
  try {
    const filter = { userId: req.user._id };
    if (req.query.familyMemberId) {
      filter.familyMemberId = req.query.familyMemberId;
    }

    const files = await File.find(filter).sort({ createdAt: -1 });
    res.json({
      success: true,
      data: files,
      count: files.length
    });
  } catch (err) {
    console.error("Error fetching reports:", err);
    res.status(500).json({ 
      success: false,
      message: "Failed to fetch reports",
      error: err.message 
    });
  }
});

// In your backend fileRoutes.js
// router.get("/reports", authenticateUser, async (req, res) => {
//   try {
//     const filter = { userId: req.user._id };
//     if (req.query.familyMemberId) {
//       filter.familyMemberId = req.query.familyMemberId;
//     }

//     const files = await File.find(filter).sort({ createdAt: -1 });
//     res.json({
//       success: true,
//       data: files,
//       count: files.length
//     });
//   } catch (err) {
//     console.error("Error fetching reports:", err);
//     res.status(500).json({ 
//       success: false,
//       message: "Failed to fetch reports"
//     });
//   }
// });

export default router;
