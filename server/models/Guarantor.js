import mongoose from "mongoose";

const {Schema} = mongoose;
const guarantorSchema = new Schema(
{
    name: {type: String, required:true},
    id: {type: mongoose.Schema.Types.ObjectId , ref: "Users" }, // reference to user
    cnic: {type: String, required:true, unique:true},
    email: {type: String, required:true, unique:true},
    address: {type: String} 
},{timestamps: true} 

)

const Guarantor = mongoose.model("Guarantors", guarantorSchema)
export default Guarantor