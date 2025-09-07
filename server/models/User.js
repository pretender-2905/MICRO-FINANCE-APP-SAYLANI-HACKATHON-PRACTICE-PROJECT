import mongoose from "mongoose";

const {Schema} = mongoose;
const userSchema = new Schema(
{
    name: {type: String},
    cnic: {type: String, required:true, unique:true},
    email: {type: String,  unique:true},
    address: {type: String},
    phoneNumber: {type: String},
    password: {type: String}
    
    
},{timestamps: true} 

)

const User = mongoose.model("Users", userSchema)
export default User