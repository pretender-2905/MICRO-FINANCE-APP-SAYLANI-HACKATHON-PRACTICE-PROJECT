import express from "express";
const router = express()
import Joi from "joi";
import jwt from 'jsonwebtoken'
import sendResponse from "../helpers/sendResponse";
import User from "../models/User";
import crypto from "crypto";
import bcrypt from 'bcrypt'

const registerSchema = Joi.object({
name: Joi.string().min().required(),
cnic: Joi.string().length(15).required(),
email: Joi.string().email().required(),
address: Joi.string(),
phoneNumber: Joi.number().length(11).required(),
// password: Joi.string().min(6).required(),

});

router.post('/', async (req,res)=>{
    const {value, error} = registerSchema.valid(req.body)
    if (error) return sendResponse(res, 500, null, true, error.message)
    const user = await User.findOne({email: value.email, cnic: value.cnic})
if(user) return sendResponse(res, 203, null, true, "User already registered!")

    //passwrd generation
    const password = crypto.randomBytes(6).toString("hex")

    const hashedPassword = await bcrypt.hash(password, 12)

})

