import mongoose from "mongoose";

const {Schema} = mongoose;
const userSchema = new Schema(
{
    name: {type: String},
    cnic: {type: String, required:true, unique:true},
    email: {type: String,  unique:true},
    password: {type: String},
    address: {type: String},
    phoneNumber: {type: String}
},{timestamps: true} 

)

const User = mongoose.model("Users", userSchema)
export default User