
import React, { useContext, useState } from "react";
import {
  Button,
  TextField,
  InputAdornment,
  Stack,
  FormControl,
  InputLabel,
  OutlinedInput,
  IconButton,
  Box,
} from "@mui/material";

import BadgeIcon from "@mui/icons-material/Badge";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import { AppRoutes } from "../constants/constant";
import { useNavigate } from "react-router";
import Cookies from "js-cookie";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const {user, setUser} = useContext(AuthContext)
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    cnic: "",
    password: "",
  });
  const [loading, setLoading] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(AppRoutes.signIn, formData);
      console.log("Success:", res.data);
      Cookies.set("token", res?.data?.data?.token)
      setUser(res?.data?.data?.user)
      console.log(user)
      console.log("token=>". token)
    } catch (err) {
      console.error("Error:", err.response?.data || err.message);
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
        minHeight: "100vh", // full screen height
        p: 2, // padding for small screens
        boxSizing: "border-box",
      }}
    >

      CNIC: 42201-3175572-7,
      PASSWORD: 1234567890
      <form
        onSubmit={handleSubmit}
        style={{
          maxWidth: 400,
          width: "100%", // responsive on mobile
        }}
      >
        <Stack spacing={2}>
          <TextField
            label="CNIC"
            name="cnic"
            value={formData.cnic}
            onChange={handleChange}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <BadgeIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          />

          <FormControl fullWidth variant="outlined">
            <InputLabel>Password</InputLabel>
            <OutlinedInput
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
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
              label="Password"
            />
          </FormControl>

          <Button
          // onClick={na}
            type="submit"
            variant="contained"
            disabled={loading}
            color="primary"
          >
            {loading ? "Signing In..." : "Sign In"}
          </Button>
          <Button
            onClick={() => navigate("/dashboard")}
            variant="contained"
            color="primary"
          >
            Sign Up
          </Button>
        </Stack>
      </form>
    </Box>
  );
}
