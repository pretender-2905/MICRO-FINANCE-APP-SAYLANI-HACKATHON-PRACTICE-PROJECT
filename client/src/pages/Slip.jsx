// import { Box, Button } from "@mui/material"
// import axios from "axios"
// import { AppRoutes } from "../constants/constant"
// import Cookies from "js-cookie";
// import { useState } from "react";
// function Slip(){
//     const [response, setResponse] = useState([])
//     const [haveResponse, setHaveResponse] = useState(false)
//     const handleClickToGenerateToken = async ()=>{
//         const token = Cookies.get("token")
//         const res = await axios.get(AppRoutes.newAppointment, {
//             headers: {Authorization: `Bearer ${token}`}
            
//         }) 
//         console.log("token of user , response from slip page:---", res.data)
//         setResponse(res?.data?.data)
//         setHaveResponse(true)
        
//     }
//     return(
//         <div>
//            <div>
//             <Box sx={{ mt: 10 , display: "flex", justifyContent: "center" }}>
//           <Button
//             disabled={haveResponse}
//             variant="contained"
//             color="primary"
//             onClick={handleClickToGenerateToken}
//             sx={{ borderRadius: "10px", bgcolor: '#6b6ed3', px: 4 }}
//           >
//             {haveResponse? "Your Token Has Been Generated!": "Click To Generete Token"}
//           </Button>
//         </Box>
//            </div>

//            {
//             haveResponse? 
//             <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
//   <a className="block relative h-48 rounded overflow-hidden">
//     <img
//       alt="QR CODE"
//       className="object-contain w-48 h-48 mx-auto"
//        src={response.qrCodeData} 
//     />
//   </a>
//   <div className="mt-4">
    
//     <h2 className="text-gray-900 title-font text-lg font-medium">
//       Name: {}
//     </h2>
//     <h2 className="text-gray-900 title-font text-lg font-medium">
//       Token Number: {response?.tokenNumber}
//     </h2>
//     <h2 className="text-gray-900 title-font text-lg font-medium">
//       Appointment Date: {response?.appointmentDate}
//     </h2>
//     <h2 className="text-gray-900 title-font text-lg font-medium">
//       AppointmentTime: {response?.appointmentTime}
//     </h2>
//     <h2 className="text-gray-900 title-font text-lg font-medium">
//       Office Location: {response?.officeLocation}
//     </h2>
   
//   </div>
// </div>
// :
// <div></div>
//            }

//         </div>
//     )
// }

// export default Slip











import { Box, Button, Paper, Typography, Divider } from "@mui/material"
import axios from "axios"
import { AppRoutes } from "../constants/constant"
import Cookies from "js-cookie";
import { useState } from "react";

function Slip(){
    const [response, setResponse] = useState([])
    const [haveResponse, setHaveResponse] = useState(false)
    
    const handleClickToGenerateToken = async ()=>{
    const token = Cookies.get("token")
    console.log("Token from cookies:", token); // Debug line
    
    try {
        const res = await axios.post(AppRoutes.newAppointment, 
            {}, // Empty object for POST data
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        ) 
        console.log("Response from slip page:---", res.data)
        setResponse(res?.data?.data)
        setHaveResponse(true)
    } catch (error) {
        console.error("Error generating token:", error)
        // You might want to show an error message to the user here
    }
}

    return(
        <Box sx={{ 
            display: "flex", 
            flexDirection: "column", 
            alignItems: "center", 
            minHeight: "100vh",
            background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
            py: 4,
            px: 2
        }}>
            {/* Generate Token Button */}
            <Box sx={{ mt: 10, display: "flex", justifyContent: "center" }}>
                <Button
                    disabled={haveResponse}
                    variant="contained"
                    color="primary"
                    onClick={handleClickToGenerateToken}
                    sx={{ 
                        borderRadius: "10px", 
                        bgcolor: '#6b6ed3', 
                        px: 4,
                        fontSize: "16px",
                        fontWeight: "600",
                        boxShadow: "0 4px 10px rgba(107, 110, 211, 0.3)",
                        "&:hover": {
                            bgcolor: '#5a5dc2',
                            transform: "translateY(-2px)",
                            boxShadow: "0 6px 15px rgba(107, 110, 211, 0.4)"
                        }
                    }}
                >
                    {haveResponse ? "Your Token Has Been Generated" : "Click To Generate Token"}
                </Button>
            </Box>

            {/* Slip Display */}
            {haveResponse && (
                <Paper 
                    elevation={8}
                    sx={{
                        width: "100%",
                        maxWidth: 400,
                        mt: 4,
                        background: "white",
                        borderRadius: 2,
                        overflow: "hidden",
                        border: "1px solid #e0e0e0"
                    }}
                >
                    {/* Slip Header */}
                    <Box sx={{
                        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        color: "white",
                        textAlign: "center",
                        py: 3,
                        px: 2
                    }}>
                        <Typography variant="h5" sx={{ fontWeight: "bold", letterSpacing: 1 }}>
                            APPOINTMENT SLIP
                        </Typography>
                        <Typography variant="body2" sx={{ opacity: 0.9, mt: 1 }}>
                            Official Token Receipt
                        </Typography>
                    </Box>

                    {/* Perforation Effect */}
                    <Box sx={{
                        height: 8,
                        background: `repeating-linear-gradient(
                            45deg,
                            transparent,
                            transparent 5px,
                            #e0e0e0 5px,
                            #e0e0e0 10px
                        )`
                    }} />

                    {/* QR Code Section */}
                    <Box sx={{ display: "flex", justifyContent: "center", py: 3 }}>
                        <Box sx={{
                            border: "2px dashed #c3cfe2",
                            borderRadius: 2,
                            p: 2,
                            background: "#f8f9fa"
                        }}>
                            <img
                                alt="QR CODE"
                                className="object-contain w-48 h-48 mx-auto"
                                src={response.qrCodeData} 
                            />
                        </Box>
                    </Box>

                    {/* Token Number - Highlighted */}
                    <Box sx={{
                        background: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
                        textAlign: "center",
                        py: 2,
                        mx: 2,
                        borderRadius: 1,
                        mb: 2
                    }}>
                        <Typography variant="body2" sx={{ fontWeight: "bold", color: "#666" }}>
                            TOKEN NUMBER
                        </Typography>
                        <Typography variant="h4" sx={{ 
                            fontWeight: "bold", 
                            color: "#d35400",
                            letterSpacing: 2
                        }}>
                            {response?.tokenNumber}
                        </Typography>
                    </Box>

                    {/* Appointment Details */}
                    <Box sx={{ p: 3 }}>
                        <Typography variant="h6" sx={{ 
                            fontWeight: "bold", 
                            color: "#333",
                            mb: 2,
                            textAlign: "center"
                        }}>
                            Appointment Details
                        </Typography>

                        {/* Details Grid */}
                        <Box sx={{ 
                            display: "flex", 
                            flexDirection: "column",
                            gap: 2
                        }}>
                            {/* Appointment Date */}
                            <Box sx={{ 
                                display: "flex", 
                                justifyContent: "space-between",
                                alignItems: "center",
                                pb: 1,
                                borderBottom: "1px dashed #e0e0e0"
                            }}>
                                <Typography variant="body2" sx={{ fontWeight: "bold", color: "#666" }}>
                                    Date:
                                </Typography>
                                <Typography variant="body1" sx={{ fontWeight: "medium" }}>
                                    {response?.appointmentDate}
                                </Typography>
                            </Box>

                            {/* Appointment Time */}
                            <Box sx={{ 
                                display: "flex", 
                                justifyContent: "space-between",
                                alignItems: "center",
                                pb: 1,
                                borderBottom: "1px dashed #e0e0e0"
                            }}>
                                <Typography variant="body2" sx={{ fontWeight: "bold", color: "#666" }}>
                                    Time:
                                </Typography>
                                <Typography variant="body1" sx={{ fontWeight: "medium" }}>
                                    {response?.appointmentTime}
                                </Typography>
                            </Box>

                            {/* Office Location */}
                            <Box sx={{ 
                                display: "flex", 
                                justifyContent: "space-between",
                                alignItems: "flex-start",
                                pb: 1,
                                borderBottom: "1px dashed #e0e0e0"
                            }}>
                                <Typography variant="body2" sx={{ fontWeight: "bold", color: "#666" }}>
                                    Location:
                                </Typography>
                                <Typography variant="body1" sx={{ 
                                    fontWeight: "medium", 
                                    textAlign: "right",
                                    maxWidth: "60%"
                                }}>
                                    {response?.officeLocation}
                                </Typography>
                            </Box>

                            {/* Status */}
                            <Box sx={{ 
                                display: "flex", 
                                justifyContent: "space-between",
                                alignItems: "center"
                            }}>
                                <Typography variant="body2" sx={{ fontWeight: "bold", color: "#666" }}>
                                    Status:
                                </Typography>
                                <Typography variant="body1" sx={{ 
                                    fontWeight: "bold", 
                                    color: "#27ae60"
                                }}>
                                    Confirmed
                                </Typography>
                            </Box>
                        </Box>
                    </Box>

                    {/* Perforation Effect */}
                    <Box sx={{
                        height: 8,
                        background: `repeating-linear-gradient(
                            45deg,
                            transparent,
                            transparent 5px,
                            #e0e0e0 5px,
                            #e0e0e0 10px
                        )`
                    }} />

                    {/* Footer */}
                    <Box sx={{ 
                        textAlign: "center", 
                        py: 2,
                        background: "#f8f9fa"
                    }}>
                        <Typography variant="caption" sx={{ color: "#666", fontStyle: "italic" }}>
                            Please present this slip at the reception
                        </Typography>
                        <Typography variant="caption" sx={{ 
                            color: "#999", 
                            display: "block",
                            mt: 0.5
                        }}>
                            Valid for appointment use only
                        </Typography>
                    </Box>
                </Paper>
            )}
        </Box>
    )
}

export default Slip