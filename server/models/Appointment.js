



import mongoose from "mongoose";
import QRCode from "qrcode";

const { Schema } = mongoose;

const AppointmentSchema = new Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },

    // Auto-generated token number (incremental or random)
    tokenNumber: { type: Number, unique: true },

    appointmentDate: { type: String },
    appointmentTime: { type: String },
    officeLocation: { type: String, default: "Main Branch" },

    qrCodeData: { type: String },
  },
  { timestamps: true }
);

// Auto-generate token number, appointment date/time, QR code before saving
AppointmentSchema.pre("save", async function (next) {
  try {
    // Only generate when new
    if (this.isNew) {
      // 1. Generate token number (simple increment based on count)
      const lastAppointment = await mongoose
        .model("Appointments")
        .findOne({})
        .sort({ tokenNumber: -1 });

      this.tokenNumber = lastAppointment ? lastAppointment.tokenNumber + 1 : 1001;

      // 2. Default appointment date & time (e.g., next day at 10:00 AM)
      if (!this.appointmentDate) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        this.appointmentDate = tomorrow.toISOString().split("T")[0]; // YYYY-MM-DD
      }

      if (!this.appointmentTime) {
        this.appointmentTime = "10:00 AM";
      }

      // 3. Generate QR code (encode token or verification URL)
      if (!this.qrCodeData) {
        this.qrCodeData = await QRCode.toDataURL(
          `${process.env.BASE_URL}/verify/${this.tokenNumber}`
        );
      }
    }
    next();
  } catch (err) {
    next(err);
  }
});

const Appointment = mongoose.model("Appointments", AppointmentSchema);
export default Appointment;
