import express from "express";
import File from "../models/File.js";
import AiInsight from "../models/AiInsight.js";
import { analyzeReport } from "../utils/geminiClient.js";
import { authenticateUser } from "../middlewares/authentication.js";
// import { auth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/process/:fileId", authenticateUser, async (req, res) => {
  const file = await File.findById(req.params.fileId);
  const aiData = await analyzeReport(file.cloudUrl);
  const insight = await AiInsight.create({
    userId: req.user,
    fileId: file._id,
    ...aiData
  });
  file.aiInsightId = insight._id;
  await file.save();
  res.json(insight);
});

export default router;
