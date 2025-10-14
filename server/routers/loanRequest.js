import express from 'express'
import { authenticateUser } from '../middlewares/authentication.js'
import Joi from 'joi';
import sendResponse from '../helpers/sendResponse.js';
import LoanRequest from '../models/LoanRequest.js';
import Guarantor from '../models/Guarantor.js';
const router = express.Router()

export const loanRequestSchema = Joi.object({
    category: Joi.string().required(),
    subcategory: Joi.string().required(),
    amount: Joi.number().positive().required(),
    period: Joi.number().integer().min(6).max(60).required()
});
export const guarantorSchema = Joi.object({
    name: Joi.string().min(3).required(),
    cnic: Joi.string().length(15).required(),
    email: Joi.string().email().required(),
    address: Joi.string(),
});


router.post("/", authenticateUser, async (req, res) => {
    try {
        const { error } = loanRequestSchema.validate(req.body)
        if (error) return sendResponse(res, 400, null, true, error.message)

        const userId = req.user._id

        const loan = new LoanRequest({
            ...req.body,
            user: userId
        });
        await loan.save()
        sendResponse(res, 201, loan, false, "Loan request submitted successfully!");

    } catch (error) {
        console.log("error from loan request.js", error)
        sendResponse(res, 500, null, true, "Something went wrong in load request form!")
    }
})

router.post("/guarantors", authenticateUser, async (req, res) => {
    try {
        const { error } = guarantorSchema.validate(req.body)
        if (error) return sendResponse(res, 400, null, true, error.message)
        const userId = req.user._id
        const guarantor = new Guarantor({
            ...req.body,
            user: userId
        })
        await guarantor.save()

        await LoanRequest.findOneAndUpdate(
            { user: userId },
            { $push: { guarantors: guarantor._id } },
            { new: true }
        )
        sendResponse(res, 201, guarantor, false, "Guarantor added successfully!")
    } catch (error) {
        console.log("error while adding guarantor! ", error)
        sendResponse(res, 500, null, true, "Something went wrong while adding guarantors")
    }
})

router.get("/user/:userId/loans", authenticateUser, async (req,res)=>{
   try{
     const {userId} = req.params

    if( req.user.role !== "admin" && req.user._id.toString() !== userId){
         return sendResponse(res, 403, null, true, "Not authorized to view these loan requests");
    }

    const loanRequests = await LoanRequest.find({user : userId}).populate("guarantors")
      if (!loanRequests || loanRequests.length === 0) {
            return sendResponse(res, 404, null, true, "No loan requests found for this user");
        }
         sendResponse(res, 200, loanRequests, false, "Loan requests fetched successfully!");
   }catch(error){
     console.error("Error while fetching user loans:", error);
        sendResponse(res, 500, null, true, "Something went wrong while fetching user loans");
   }
})

router.get("/:id", authenticateUser, async (req, res) => {
    try {
        const { id } = req.params
        const loanRequest = await LoanRequest.findById(id).populate('guarantors')
        if (!loanRequest) {
            sendResponse(res, 400, null, true, "Loan Request not found!")
        }
          if (req.user.role !== "admin" && loanRequest.user.toString() !== req.user._id.toString()) {
            return sendResponse(res, 403, null, true, "Not authorized to view this loan request");
        }
        sendResponse(res, 200, loanRequest, false, "Loan Request fetched successfully")
    } catch (error) {
         console.log("error while fetching loan Request! ", error)
        sendResponse(res, 500, null, true, "Something went wrong while fetching Loan Request")
    }
})


export default router