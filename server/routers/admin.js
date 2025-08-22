import express from 'express'
import { authenticateAdmin } from '../middlewares/authentication.js'
import sendResponse from '../helpers/sendResponse.js'
import LoanRequest from '../models/LoanRequest.js'
import Appointment from '../models/Appointment.js'
import QRCode from "qrcode";
const router = express.Router()

// getting all loans

router.get("/applications", authenticateAdmin, async (req, res) => {
    try {
        const applications = await LoanRequest.find()
        sendResponse(res, 200, applications, false, "Loan requests fetched successfully!")
    } catch (error) {
        console.log("Error while fetching loan applications", error)
        sendResponse(res, 500, null, true, "Something went wrong in fetching loan applications")
    }
})


// updating appointment details

router.put("/applications/:id", authenticateAdmin, async (req, res) => {
   try{
     const { id } = req.params
    const { officeLocation, appointmentDate, appointmentTime } = req.body
    const updated = await Appointment.findByIdAndUpdate(id,
        { officeLocation, appointmentDate, appointmentTime },
        { new: true })

        if(!updated) return sendResponse(res, 404, null, true, "Appointment not found!")

        sendResponse(res, 200, updated, false, "Appointment details updated!")
   }catch(error){
    console.log("Error while updating appointment details=> ", error)
    sendResponse(res, 500, null, false, "Somthing went wrong while updating appointment details!")
   }
})

//generating qr code and token number
router.post("/applications/:id/token", authenticateAdmin, async (req,res)=>{
  try{
  const lastAppointment = await Appointment.findOne().sort({tokenNumber: -1})
    const newToken = lastAppointment ? lastAppointment.tokenNumber + 1 : 1001

    const qrData = `${process.env.BASE_URL || "http://localhost:5000"}/verify/${newToken}`;
    const qrCodeData = await QRCode.toDataURL(qrData);

    const updated = await Appointment.findByIdAndUpdate(req.params, 
        {tokenNumber: newToken,
         qrCodeData: qrCodeData
        },
        {new: true}
       
    )

    if(!updated) return sendResponse(res, 404, null, true, "Appointment not found!")
        sendResponse(res, 200, updated, false, "Token number and QR data updated!")
  }catch(error){
     console.log("Error while generating new appoinment number and token => ", error)
    sendResponse(res, 500, null, false, "Somthing went wrong while generating new token number and QR code data!")
  }
})
export default router