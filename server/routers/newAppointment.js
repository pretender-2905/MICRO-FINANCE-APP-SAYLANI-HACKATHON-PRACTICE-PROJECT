import express from 'express'
import { authenticateUser } from '../middlewares/authentication.js'
import Appointment from '../models/Appointment.js'
import sendResponse from '../helpers/sendResponse.js'
const router = express.Router()

// Make sure this is a POST route, not GET
router.post("/", authenticateUser, async (req, res) => {
    try {
        const userId = req.user._id
        const newAppointment = new Appointment({ user: userId })
        await newAppointment.save()
        sendResponse(res, 201, newAppointment, false, "New Appointment created successfully!")
    } catch (error) {
        console.log("Error while generating appointment slip=> ", error)
        sendResponse(res, 500, null, true, "Something went wrong while generating appointment slip")
    }
})

export default router