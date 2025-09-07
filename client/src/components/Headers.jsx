import React, { useState, useContext } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";

export default function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("token");
    setUser(null);
    navigate("/login");
  };

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const navItems = ["Home", "About", "Services", "Pricing", "Contact"];

  return (
    <>
      <AppBar position="fixed" sx={{ backgroundColor: "#6b6ed3" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* Logo */}
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            Aasaan Zar Finance App
          </Typography>

          {/* Desktop Menu */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
            {navItems.map((item) => (
              <Button key={item} sx={{ color: "white" }}>
                {item}
              </Button>
            ))}
            {user ? (
              <Button
                variant="contained"
                sx={{ backgroundColor: "white", color: "#6b6ed3" }}
                onClick={handleLogout}
              >
                Logout
              </Button>
            ) : (
              <Button
                variant="contained"
                sx={{ backgroundColor: "white", color: "#6b6ed3" }}
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
            )}
          </Box>

          {/* Mobile Menu Button */}
          <IconButton
            sx={{ display: { xs: "flex", md: "none" }, color: "white" }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Drawer for Mobile */}
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 250 }} role="presentation">
          <List>
            {navItems.map((text) => (
              <ListItem button key={text}>
                <ListItemText primary={text} />
              </ListItem>
            ))}
            <ListItem button>
              {user ? (
                <Button
                  fullWidth
                  variant="contained"
                  sx={{ backgroundColor: "#6b6ed3" }}
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              ) : (
                <Button
                  fullWidth
                  variant="contained"
                  sx={{ backgroundColor: "#6b6ed3" }}
                  onClick={() => navigate("/login")}
                >
                  Login
                </Button>
              )}
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
}
