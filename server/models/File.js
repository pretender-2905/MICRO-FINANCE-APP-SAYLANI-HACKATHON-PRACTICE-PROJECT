import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  familyMemberId: { type: mongoose.Schema.Types.ObjectId, ref: "FamilyMember" },
  originalName: String,
  cloudUrl: String,
  mimeType: String,
  reportDate: Date,
  testName: String,
  doctor: String,
  price: Number,
  note: String,
}, { timestamps: true });

export default mongoose.model("File", fileSchema);
