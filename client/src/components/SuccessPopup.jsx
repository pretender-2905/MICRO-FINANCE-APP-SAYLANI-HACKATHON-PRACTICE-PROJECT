import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Typography,
  Box
} from "@mui/material";
import { useNavigate } from "react-router";



const SuccessPopup = ({ open}) => {
  const navigate = useNavigate()
  return (
    <Dialog
      open={open}
      PaperProps={{
        sx: {
          borderRadius: "16px",
          padding: "24px",
          textAlign: "center",
          minWidth: "400px",
        },
      }}
    >
      <DialogTitle sx={{ fontWeight: "bold" }}>
        🎉 Success
      </DialogTitle>
      <DialogContent>
        <Typography variant="body1" gutterBottom>
          Your loan request and guarantors have been submitted successfully!
        </Typography>

        {/* ✅ Centered Button */}
        <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={()=> navigate("/Slip")}
            sx={{ borderRadius: "10px", px: 4 }}
          >
            Generate Token
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default SuccessPopup;
