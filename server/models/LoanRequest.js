import mongoose from "mongoose";

const {Schema} = mongoose;
const LoanRequestSchema = new Schema(
{
    id: {type: mongoose.Schema.Types.ObjectId , ref: "Users" }, // reference to user
    category: {type: String, required:true},
    subcategory : {type: String},
    amount : {type: Number, required:true},
    period: {type: Number, required:true},
    guarantors: [{type: mongoose.Schema.Types.ObjectId, ref: "Guarantors"}],
    status : {type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending'},
    tokenNumber: {type: String},
    appointmentDetails: {type: String},
},{timestamps: true} 

)

const LoanRequest = mongoose.model("LoanRequests", LoanRequestSchema)
export default LoanRequest