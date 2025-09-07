import * as React from "react";
import {
  Button,
  TextField,
  InputAdornment,
  Stack,
  FormControl,
  InputLabel,
  OutlinedInput,
  IconButton,
} from "@mui/material";

import Person from "@mui/icons-material/Person";
import BadgeIcon from "@mui/icons-material/Badge";
import EmailIcon from "@mui/icons-material/Email";
import HomeIcon from "@mui/icons-material/Home";
import PhoneIcon from "@mui/icons-material/Phone";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import axios from "axios";
import { AppRoutes } from "../constants/constant";
import { useNavigate } from "react-router";

export default function SignUp() {
  const navigate = useNavigate()
  const [formData, setFormData] = React.useState({
    name: "",
    cnic: "",
    email: "",
    address: "",
    phoneNumber: "",
    // password: "",
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
      
      const res = await axios.post(AppRoutes.signUp, formData);
      console.log("Success:", res.data);
    } catch (err) {
      console.error("Error:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

return (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh", // takes full height of screen
      padding: "16px", // prevents it from sticking to edges on small screens
      boxSizing: "border-box",
    }}
  >
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: 400,
        width: "100%", // make it responsive
      }}
    >
      <Stack spacing={2}>
        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Person fontSize="small" />
              </InputAdornment>
            ),
          }}
        />
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
        <TextField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon fontSize="small" />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label="Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <HomeIcon fontSize="small" />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label="Phone"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PhoneIcon fontSize="small" />
              </InputAdornment>
            ),
          }}
        />

        <Button
          type="submit"
          variant="contained"
          disabled={loading}
          color="primary"
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </Button>
        <Button
          onClick={() => navigate("/login")}
          variant="contained"
          color="primary"
        >
          Sign In
        </Button>
      </Stack>
    </form>
  </div>
);

}
