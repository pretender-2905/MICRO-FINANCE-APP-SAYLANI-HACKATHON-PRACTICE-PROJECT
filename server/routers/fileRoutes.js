import express from "express";
import multer from "multer";
import cloudinary from "../utils/cloudinary.js";
import File from "../models/File.js";
import { authenticateUser } from "../middlewares/authentication.js";
// import { auth } from "../middleware/authMiddleware.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/upload", authenticateUser , upload.single("file"), async (req, res) => {
  const result = await cloudinary.uploader.upload(req.file.path);
  const file = await File.create({
    userId: req.user,
    originalName: req.file.originalname,
    cloudUrl: result.secure_url,
    mimeType: req.file.mimetype,
    reportDate: req.body.reportDate,
    type: req.body.type
  });
  res.json(file);
});

export default router;
