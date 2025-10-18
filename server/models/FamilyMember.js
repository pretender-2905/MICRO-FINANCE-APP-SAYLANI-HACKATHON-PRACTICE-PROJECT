import mongoose from "mongoose";

const familyMemberSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // owner
  name: { type: String, required: true },
  
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("FamilyMember", familyMemberSchema);
