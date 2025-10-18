import mongoose from "mongoose";

const aiInsightSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  fileId: { type: mongoose.Schema.Types.ObjectId, ref: "File" },
  familyMemberId: { type: mongoose.Schema.Types.ObjectId, ref: "FamilyMember", default: null },
  summary_en: String,
  summary_roman_urdu: String,
  highlights: [String],
  abnormalities: [
    { name: String, value: String, normalRange: String, severity: String }
  ],
  suggestions: {
    questionsForDoctor: [String],
    diet: { avoid: [String], recommend: [String] },
    homeRemedies: [String]
  },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("AiInsight", aiInsightSchema);
