import sendResponse from "../helpers/sendResponse.js"
import jwt, { decode } from 'jsonwebtoken'
import User from "../models/User.js"



export async function authenticateUser(req, res, next) {
   try{
     console.log("req.headers.authorization", req.headers.authorization)
    const bearerToken = req.headers.authorization
    if(!bearerToken) return sendResponse(res, 404, null,true, "Token not provided!")
    const token = bearerToken.split(" ")[1]
console.log("token", token)
    const decoded = jwt.verify(token, process.env.AUTH_SECRET)
    if(decoded){
        console.log("decoded=> ", decoded)
        const user = await User.findById(decoded._id)
       if(!user) return sendResponse(res, 404, null, false, "User not found")
    req.user = decoded
    next()
    }else{
        return sendResponse(res, 403, null, false, "Token not verfied")
    }
   }catch(error){
     return sendResponse(res, 500, null, false, "Something went wrong while authenticating user / admin ")
   }
}

export async function authenticateAdmin(req,res,next){
  const bearerToken = req.headers.authorization
  if(!bearerToken) return sendResponse(res, 404, null, true, "Token not found")
  const token = bearerToken.split(" ")[1]

const decoded = jwt.verify(token, process.env.AUTH_SECRET)
req.user = decoded
if(decoded.role == "admin"){
  next()
}else{
   return sendResponse(res, 403, null, true, "ONLY ADMINS ARE ALLOWED TO ACCESS!" )
}
}