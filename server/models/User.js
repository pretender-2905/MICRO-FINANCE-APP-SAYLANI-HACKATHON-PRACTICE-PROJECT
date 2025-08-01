import mongoose from "mongoose";

const {Schema} = mongoose;
const userSchema = new Schema(
{
    name: {type: String, required:true},
    cnic: {type: String, required:true, unique:true},
    email: {type: String, required:true, unique:true},
    password: {type: String, required:true},
    address: {type: String},
    phoneNumber: {type: Number}
},{timestamps: true} 

)

const User = mongoose.model("Users", userSchema)
export default User