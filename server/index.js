import mongoose from "mongoose";
import express from "express";
import cors from 'cors'
import morgan from 'morgan'
import 'dotenv/config'
import usersRoutes from '../server/routers/user.js'
const PORT = 4000
const app = express()
app.use(express.json())
app.use(cors())
app.use(morgan('tiny'))


mongoose.connect(process.env.MONGODBURI)
.then(()=>console.log("MONGO CONNECTED SUCCESSFULLY!"))
.catch((error)=> console.log("ERROR WHILE CONNECTING SERVER TO MONGO DB! ", error))

app.get("/", (req,res)=>{
    res.send("Server is runnin perfectly!")
})

app.use("/user", usersRoutes)

app.listen(PORT, ()=> console.log(`The server is running on ${PORT}`))