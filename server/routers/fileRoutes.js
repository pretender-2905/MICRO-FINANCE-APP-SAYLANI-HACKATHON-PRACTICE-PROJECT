import express from "express";
import multer from "multer";
import cloudinary from "../utils/cloudinary.js";
import File from "../models/File.js";
import { authenticateUser } from "../middlewares/authentication.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// In your backend fileRoutes.js
router.post("/upload", authenticateUser, upload.single("file"), async (req, res) => {
  try {
    console.log("Upload request received");
    console.log("Request body:", req.body);
    console.log("Request file:", req.file);
    console.log("User ID:", req.user._id);
    
    if (!req.file) {
      console.log("No file in request");
      return res.status(400).json({
        success: false,
        message: "No file uploaded"
      });
    }

    // Check if familyMemberId is provided
    if (!req.body.familyMemberId) {
      console.log("No familyMemberId provided");
      return res.status(400).json({
        success: false,
        message: "Family member ID is required"
      });
    }

    // Upload file to Cloudinary
    console.log("Uploading to Cloudinary...");
    const result = await cloudinary.uploader.upload(req.file.path);
    console.log("Cloudinary upload successful:", result.secure_url);

    // Create a new File document
    const file = await File.create({
      userId: req.user._id,
      familyMemberId: req.body.familyMemberId,
      originalName: req.file.originalname,
      cloudUrl: result.secure_url,
      mimeType: req.file.mimetype,
      reportDate: req.body.reportDate,
      testName: req.body.testName,
      doctor: req.body.doctor,
      price: req.body.price,
      note: req.body.note,
    });

    console.log("File saved to database:", file._id);

    res.json({
      success: true,
      message: "Report uploaded successfully",
      file,
    });
  } catch (err) {
    console.error("Upload error details:", err);
    res.status(500).json({
      success: false,
      message: "File upload failed",
      error: err.message,
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
