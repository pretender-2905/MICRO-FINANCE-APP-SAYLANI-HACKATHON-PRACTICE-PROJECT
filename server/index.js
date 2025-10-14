import mongoose from "mongoose";
import express from "express";
import cors from 'cors'
import morgan from 'morgan'
import 'dotenv/config'
import userRoutes from "./routers/user.js";
import loanRequestRoutes from './routers/loanRequest.js'
import newAppointmentRoutes from './routers/newAppointment.js'
import adminRoutes from './routers/admin.js'

const PORT = process.env.PORT || 4000;
const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://micro-finance-app-saylani-hackathon-practice-pro-production.up.railway.app"
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.options("*", cors());

app.options("*", cors({
  origin: "http://localhost:5173",
  credentials: true,
   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));


app.use(express.json())
app.use(morgan('tiny'))


mongoose.connect(process.env.MONGODBURI)
.then(()=>console.log("MONGO CONNECTED SUCCESSFULLY!"))
.catch((error)=> console.log("ERROR WHILE CONNECTING SERVER TO MONGO DB! ", error))

app.get("/", (req,res)=>{
    res.send("Server is runnin perfectly!")
})



app.use("/user", userRoutes)
app.use("/loanRequest", loanRequestRoutes)
app.use("/newAppointment", newAppointmentRoutes )
app.use("/admin", adminRoutes )

app.listen(PORT, ()=> console.log(`The server is running on ${PORT}`))