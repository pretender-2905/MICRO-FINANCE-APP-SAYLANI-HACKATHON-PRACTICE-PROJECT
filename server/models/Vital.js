import mongoose from "mongoose";

const vitalSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  type: String,
  value: String,
  unit: String,
  notes: String,
  recordedAt: Date,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Vital", vitalSchema);
