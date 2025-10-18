import express from "express";
const router = express.Router()
import Joi from "joi";
import jwt from 'jsonwebtoken'
import sendResponse from "../helpers/sendResponse.js";
import User from "../models/User.js";
import crypto from "crypto";
import bcrypt from 'bcrypt'
import nodemailer from 'nodemailer';
import { authenticateUser } from "../middlewares/authentication.js";





const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use TLS
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    connectionTimeout: 30000, // 30 seconds
    greetingTimeout: 30000,   // 30 seconds
    socketTimeout: 30000      // 30 seconds
});

// Test the connection
transporter.verify(function (error, success) {
    if (error) {
        console.log("Email transporter error:", error);
    } else {
        console.log("Email server is ready to send messages");
    }
});
const registerSchema = Joi.object({
    name: Joi.string().min(3).required(),
    cnic: Joi.string().length(15).required(),
    email: Joi.string().email().required(),
    address: Joi.string(),
    phoneNumber: Joi.string(),
});


const loginSchema = Joi.object({
    cnic: Joi.string().length(15).required(),
    password: Joi.string().min(6).required()
});
const passwordSchema = Joi.object({
    oldPassword: Joi.string().min(6).required(),
    newPassword: Joi.string().min(6).required()
});

router.post('/register', async (req, res) => {
    try {
        const { value, error } = registerSchema.validate(req.body)
        if (error) return sendResponse(res, 400, null, true, error.message)
        
        const checkUser = await User.findOne({ email: value.email, cnic: value.cnic })
        if (checkUser) return sendResponse(res, 400, null, true, "User already registered!")

        // Password generation
        const password = crypto.randomBytes(6).toString("hex")

        const name = value.name
        const email = value.email
        const hashedPassword = await bcrypt.hash(password, 12)
        const cnic = value.cnic
        const address = value.address
        const phoneNumber = value.phoneNumber
        
        let user = new User({
            name,
            cnic,
            email,
            password: hashedPassword,
            address,
            phoneNumber
        });
        
        await user.save()
        
        console.log("📧 Attempting to send email to:", email);
        
        // Try to send email with timeout
        const emailPromise = transporter.sendMail({
            from: `"Microfinance Loan App" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Your Loan App Account Password",
            html: `
        <h2>Welcome, ${name}!</h2>
        <p>Your account has been created successfully.</p>
        <p><strong>CNIC:</strong> ${cnic}</p>
        <p><strong>Password:</strong> ${password}</p>
        <p>You can change your password after logging in.</p>
      `
        });

        // Set a timeout for email sending
        const timeoutPromise = new Promise((_, reject) => {
            setTimeout(() => reject(new Error('Email timeout')), 15000);
        });

        await Promise.race([emailPromise, timeoutPromise]);
        
        console.log("✅ Email sent successfully to:", email);
        sendResponse(res, 201, null, false, "User registered successfully and password has been sent to your G-mail")

    } catch (error) {
        console.log("❌ Error from register:", error.message);
        
        // If user was created but email failed, we still want to respond successfully
        // but log the email error
        if (error.message.includes('Email timeout') || error.message.includes('ETIMEDOUT')) {
            console.log("⚠️ Email failed to send, but user was created. Password:", password);
            sendResponse(res, 201, null, false, "User registered successfully! Check your email for password (if not received, contact support)")
        } else {
            sendResponse(res, 500, null, true, "Something went wrong while registering user!")
        }
    }
})

router.post('/login', async (req, res) => {
    try {
        const { value, error } = loginSchema.validate(req.body)
        if (error) return sendResponse(res, 500, null, true, error.message)
        const user = await User.findOne({ cnic: value.cnic }).lean()
        if (!user) return sendResponse(res, 404, null, true, "User Not Found with this CNIC!")
        const isPasswordValid = await bcrypt.compare(value.password, user.password)
        if (!isPasswordValid) return sendResponse(res, 401, null, true, "Invalid Password, check your password and enter again!")

        const token = jwt.sign(user, process.env.AUTH_SECRET)
       

        console.log("token=> ", token)
        console.log("user=> ", user)
        sendResponse(res, 200, { user, token }, false, "User Logged in Successfully!")
    } catch (error) {
        console.log("error=> from login", error.message)
       return sendResponse(res, 500, null, true, error.message)
    }

})

router.put("/password", authenticateUser, async (req,res)=>{
   try{
     const {value, error} = passwordSchema.validate(req.body)
    if (error) return sendResponse(res, 500, null, true, error.message)
    const user = await User.findById(req.user._id)
if (!user) return sendResponse(res, 404, null, true, "Login in account first to change the password!")
console.log("user from post password=> ", user)

const isPasswordValid = await bcrypt.compare(value.oldPassword,user.password )
// const isPasswordValid = await bcrypt.compare(value.oldPassword, req.user.password);

if(!isPasswordValid) return sendResponse(res, 403, null, true, "Old password is incoreect!")
const hashedPassword = await bcrypt.hash(value.newPassword, 12)
user.password = hashedPassword
// req.user.password = await bcrypt.hash(value.newPassword, 12);
 await user.save();
res.send("Password changed successfully!")
   }catch(error){
    console.log("error=> from login", error)
    return sendResponse(res, 500, null, true, "Something went wrong while changing password!")
   }

})

// getmyInfo

router.get("/myInfo", authenticateUser, async (req,res)=>{
    try{
        const user = await User.findOne({_id: req.user._id})
    sendResponse(res, 200, user, false, "User data fetched successfully")
    }catch(error){
        console.log("error from myInfo api in user file=> ", error)
        sendResponse(res, 500, null, true, "Something went wrong while getting user info!")
    }

})


export default router



