// function UserDashboard(){
//     return(
//                 <div className="text-center text-9xl text-green-600">

//             UserDashboard
//         </div>
//     )
// }

// export default UserDashboard


import * as React from "react";
import { Button, Stack, Box } from "@mui/material";
import { useNavigate } from "react-router";

export default function UserDashboard() {
    const navigate = useNavigate()
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",   // full screen height
        p: 2,                 // padding for small screens
        boxSizing: "border-box",
      }}
    >
      <Stack spacing={2} sx={{ width: "100%", maxWidth: 300 }}>
        <Button
        onClick={()=> navigate("/ChangePassword")}
          fullWidth
          variant="contained"
          sx={{ backgroundColor: "#6b6ed3" }}
        >
          Change Your Password
        </Button>
        <Button
        onClick={()=> navigate("/loanRequestForm")}
          fullWidth
          variant="contained"
          sx={{ backgroundColor: "#6b6ed3" }}
        >
          Apply For Loan
        </Button>
        <Button
          fullWidth
          variant="contained"
          sx={{ backgroundColor: "#6b6ed3" }}
        >
          Facebook
        </Button>
        <Button
          fullWidth
          variant="contained"
          sx={{ backgroundColor: "#6b6ed3" }}
        >
          Twitter
        </Button>
        <Button
          fullWidth
          variant="contained"
          sx={{ backgroundColor: "#6b6ed3" }}
        >
          LinkedIn
        </Button>
      </Stack>
    </Box>
  );
}

