import mongoose from "mongoose";

const { Schema } = mongoose;
const AppointmentSchema = new Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
        tokenNumber: { type: Number, required:true }, // reference to user
        appointmentDate: { type: String, required: true },
        appointmentTime: { type: String, required: true },
        officeLocation: { type: String },
        qrCodeData: { type: String }
    }, { timestamps: true }

)

const Appointment = mongoose.model("Appointments", AppointmentSchema)
export default Appointment