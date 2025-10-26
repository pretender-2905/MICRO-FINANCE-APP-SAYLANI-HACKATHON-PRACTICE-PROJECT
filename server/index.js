import mongoose from "mongoose";
import express from "express";
import cors from 'cors'
import morgan from 'morgan'
import 'dotenv/config'
import userRoutes from "./routers/user.js";
import loanRequestRoutes from './routers/loanRequest.js'
import newAppointmentRoutes from './routers/newAppointment.js'
import adminRoutes from './routers/admin.js'
import dotenv from 'dotenv'
import familyRoutes from './routers/familyRoutes.js'
import fileRoutes from './routers/fileRoutes.js'

dotenv.config();

const PORT =  4000;
const app = express();

// Add error handlers at the top
process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

const allowedOrigins = [
  
  "http://localhost:5174",
  "https://micro-finance-app-saylani-hackathon-practice-pro-production.up.railway.app",
  "http://localhost:5173", // Add again for safety
  "http://localhost:5174",  // Add again for safety
  "https://stellular-douhua-d29e87.netlify.app"
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log('CORS blocked for origin:', origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
}));

// Handle preflight requests for all routes
app.options('*', cors());

app.use(express.json())
app.use(morgan('tiny'))

// IMPROVED MONGOOSE CONNECTION WITH RETRY LOGIC
const connectWithRetry = () => {
  console.log('Attempting MongoDB connection...');
  
  mongoose.connect(process.env.MONGODBURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000, // 30 seconds
    socketTimeoutMS: 45000, // 45 seconds
    maxPoolSize: 10,
    retryWrites: true,
    w: 'majority'
  })
  .then(() => console.log("✅ MONGO CONNECTED SUCCESSFULLY!"))
  .catch(err => {
    console.error('❌ Failed to connect to MongoDB:', err.message);
    console.log('🔄 Retrying connection in 5 seconds...');
    setTimeout(connectWithRetry, 5000);
  });
};

// Start the connection
connectWithRetry();

// Enhanced connection event handlers
mongoose.connection.on('error', err => {
  console.log('❌ MongoDB connection error:', err.message);
});

mongoose.connection.on('disconnected', () => {
  console.log('⚠️ MongoDB disconnected');
});

mongoose.connection.on('connected', () => {
  console.log('✅ MongoDB connected successfully');
});

mongoose.connection.on('reconnected', () => {
  console.log('🔄 MongoDB reconnected');
});

// Routes
app.get("/", (req,res) => {
    res.send("Server is running perfectly!")
})

app.use("/user", userRoutes)
app.use("/loanRequest", loanRequestRoutes)
app.use("/newAppointment", newAppointmentRoutes)
app.use("/admin", adminRoutes)
app.use("/familyRoutes", familyRoutes);
app.use("/fileRoutes", fileRoutes);


// Handle undefined routes
app.all('*', (req, res) => {
  res.status(404).json({
    status: 'fail',
    message: `Can't find ${req.originalUrl} on this server!`
  });
});

// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`))

app.listen(PORT, '0.0.0.0', () => console.log(`🚀 Server running on port ${PORT}`))