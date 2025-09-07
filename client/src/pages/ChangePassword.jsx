import React, { useContext, useState } from "react";
import {
  Button,
  Stack,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Box,
} from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import { AppRoutes } from "../constants/constant";
import { useNavigate } from "react-router";
import Cookies from "js-cookie";
import { AuthContext } from "../context/AuthContext";

export default function ChangePassword() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = Cookies.get("token"); // get token from cookie
      const res = await axios.put(
        AppRoutes.changePassword,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // send token for auth
          },
        }
      );

      console.log("Password changed successfully:", res.data);
      alert("Password updated!");
      navigate("/UserDashboard");
    } catch (err) {
      console.error("Error:", err.response?.data || err.message);
      alert("Failed to change password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        p: 2,
        boxSizing: "border-box",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          maxWidth: 400,
          width: "100%",
        }}
      >
        <Stack spacing={2}>
          {/* Old Password */}
          <FormControl fullWidth variant="outlined">
            <InputLabel>Old Password</InputLabel>
            <OutlinedInput
              name="oldPassword"
              type={showPassword ? "text" : "password"}
              value={formData.oldPassword}
              onChange={handleChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword((s) => !s)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Old Password"
            />
          </FormControl>

          {/* New Password */}
          <FormControl fullWidth variant="outlined">
            <InputLabel>New Password</InputLabel>
            <OutlinedInput
              name="newPassword"
              type={showPassword ? "text" : "password"}
              value={formData.newPassword}
              onChange={handleChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword((s) => !s)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="New Password"
            />
          </FormControl>

          {/* Buttons */}
          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            sx={{ backgroundColor: "#6b6ed3" }}
          >
            {loading ? "Changing Password..." : "Change Password"}
          </Button>

          <Button
            onClick={() => navigate("/UserDashboard")}
            variant="outlined"
            sx={{ borderColor: "#6b6ed3", color: "#6b6ed3" }}
          >
            Back to User Dashboard
          </Button>
        </Stack>
      </form>
    </Box>
  );
}
