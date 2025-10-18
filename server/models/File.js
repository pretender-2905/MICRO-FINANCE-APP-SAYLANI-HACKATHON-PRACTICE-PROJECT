import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  originalName: String,
  cloudUrl: String,
  mimeType: String,
  uploadedAt: { type: Date, default: Date.now },
  reportDate: Date,
  type: String,
  aiInsightId: { type: mongoose.Schema.Types.ObjectId, ref: "AiInsight" },
  familyMemberId: { type: mongoose.Schema.Types.ObjectId, ref: "FamilyMember", default: null }

});

export default mongoose.model("File", fileSchema);
