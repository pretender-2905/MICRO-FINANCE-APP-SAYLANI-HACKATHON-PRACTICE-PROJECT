import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  CardActions,
  Grid,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  Chip,
  Avatar,
  Paper,
  CircularProgress,
  Fade,
  Zoom,
  useTheme,
  useMediaQuery
} from "@mui/material";
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Person as PersonIcon,
  FamilyRestroom as FamilyIcon,
  Close as CloseIcon
} from "@mui/icons-material";
import { AppRoutes, BASE_URL } from "../constants/constant";
import { useNavigate } from "react-router";

const Dashboard = () => {
  const [familyMembers, setFamilyMembers] = useState([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState({ open: false, member: null });
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [submitting, setSubmitting] = useState(false);
const navigate = useNavigate()
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const token = Cookies.get("token");

  // Fetch all members
  const getMembers = async () => {
    setLoading(true);
    try {
      const res = await axios.get(AppRoutes.getAllMember, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFamilyMembers(res.data);
    } catch (err) {
      console.error(err);
      showSnackbar("log in first with the provided cnic password", "error");
    } finally {
      setLoading(false);
    }
  };

  // Add new member
  const addMember = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      showSnackbar("Please enter a name!", "warning");
      return;
    }

    setSubmitting(true);
    try {
      await axios.post(
        AppRoutes.AddAMember,
        { name: name.trim() },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setName("");
      getMembers();
      showSnackbar("Family member added successfully!", "success");
    } catch (err) {
      console.error(err);
      showSnackbar("login first with the provided email password", "error");
    } finally {
      setSubmitting(false);
    }
  };

  // Delete member
  const deleteMember = async () => {
    if (!deleteDialog.member) return;

    try {
      await axios.delete(AppRoutes.DeleteAMember(deleteDialog.member._id), {
        headers: { Authorization: `Bearer ${token}` },
      });
      getMembers();
      showSnackbar("Family member removed successfully", "success");
    } catch (err) {
      console.error("Error deleting member:", err.response?.data || err.message);
      showSnackbar("Error deleting family member", "error");
    } finally {
      setDeleteDialog({ open: false, member: null });
    }
  };

  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const openDeleteDialog = (member) => {
    setDeleteDialog({ open: true, member });
  };

  const closeDeleteDialog = () => {
    setDeleteDialog({ open: false, member: null });
  };

  const getAvatarColor = (name) => {
    const colors = [
      theme.palette.primary.main,
      theme.palette.secondary.main,
      theme.palette.success.main,
      theme.palette.error.main,
      theme.palette.warning.main,
      theme.palette.info.main,
    ];
    return colors[name.length % colors.length];
  };

  useEffect(() => {
    getMembers();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ textAlign: "center", mb: 6 }}>
        <FamilyIcon sx={{ fontSize: 64, color: "primary.main", mb: 2 }} />
        <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
          Family Members
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Manage your family members and keep track of your loved ones
        </Typography>
      </Box>

      {/* Add Member Form */}
      <Paper elevation={3} sx={{ p: 4, mb: 6, borderRadius: 3 }}>
        <Typography variant="h5" component="h2" gutterBottom fontWeight="medium">
          Add New Family Member
        </Typography>
        <Box component="form" onSubmit={addMember} sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
          <TextField
            fullWidth
            variant="outlined"
            label="Family Member Name"
            placeholder="e.g., Ammi, Abbu, Sarah"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={submitting}
            sx={{ flex: 1 }}
            InputProps={{
              startAdornment: <PersonIcon sx={{ mr: 1, color: "action.active" }} />,
            }}
          />
          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={submitting || !name.trim()}
            startIcon={submitting ? <CircularProgress size={20} /> : <AddIcon />}
            sx={{ 
              minWidth: 140,
              height: 56,
              borderRadius: 2
            }}
          >
            {submitting ? "Adding..." : "Add Member"}
          </Button>
        </Box>
      </Paper>

      {/* Family Members Grid */}
      <Box>
        <Typography variant="h5" component="h2" gutterBottom fontWeight="medium" sx={{ mb: 3 }}>
          Your Family ({familyMembers.length})
        </Typography>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
            <CircularProgress size={60} />
          </Box>
        ) : familyMembers.length === 0 ? (
          <Paper sx={{ textAlign: "center", py: 8, borderRadius: 3 }}>
            <PersonIcon sx={{ fontSize: 64, color: "text.secondary", mb: 2 }} />
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No family members yet
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Add your first family member to get started
            </Typography>
          </Paper>
        ) : (
          <Grid container spacing={3}>
            {familyMembers.map((member, index) => (
              <Zoom in={true} timeout={500} key={member._id} style={{ transitionDelay: `${index * 100}ms` }}>
                <Grid item xs={12} sm={6} md={4}>
                  <Card 
                  onClick={() => navigate(`/member/${member._id}`)}

                    elevation={2}
                    sx={{ 
                      borderRadius: 3,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        elevation: 8,
                        transform: "translateY(-4px)",
                      }
                    }}
                  >
                    <CardContent sx={{ textAlign: "center", pt: 3 }}>
                      <Avatar
                        sx={{
                          width: 64,
                          height: 64,
                          mx: "auto",
                          mb: 2,
                          bgcolor: getAvatarColor(member.name),
                          fontSize: "1.5rem",
                          fontWeight: "bold"
                        }}
                      >
                        {member.name.charAt(0).toUpperCase()}
                      </Avatar>
                      <Typography variant="h6" component="h3" gutterBottom fontWeight="medium">
                        {member.name}
                      </Typography>
                      <Chip
                        label="Active Member"
                        size="small"
                        color="success"
                        variant="outlined"
                      />
                    </CardContent>
                    <CardActions sx={{ justifyContent: "center", pb: 2 }}>
                      <Button
                        variant="outlined"
                        color="error"
                        startIcon={<DeleteIcon />}
                        onClick={() => openDeleteDialog(member)}
                        size="small"
                      >
                        Remove
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              </Zoom>
            ))}
          </Grid>
        )}
      </Box>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialog.open}
        onClose={closeDeleteDialog}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Typography variant="h6" component="span">
            Confirm Removal
          </Typography>
          <IconButton onClick={closeDeleteDialog} size="small">
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to remove <strong>{deleteDialog.member?.name}</strong> from your family members?
            This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={closeDeleteDialog} variant="outlined">
            Cancel
          </Button>
          <Button 
            onClick={deleteMember} 
            variant="contained" 
            color="error"
            startIcon={<DeleteIcon />}
          >
            Remove Member
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Dashboard;