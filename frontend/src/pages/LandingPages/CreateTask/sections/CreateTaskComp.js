import React, { useState } from "react";
import { Box, Button, TextField, Typography, MenuItem, Grid } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const CreateTaskComp = () => {
  const [currentStage, setCurrentStage] = useState(1);
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState(dayjs());
  const [inventories, setInventories] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [status, setStatus] = useState("Pending");
  const [location, setLocation] = useState("");
  const [requestor, setRequestor] = useState("");
  const [tasks, setTasks] = useState([]);
  const [submittedTask, setSubmittedTask] = useState(null); // State to hold the submitted task

  // Handlers
  const handleTaskChange = (e) => setTask(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);
  const handlePriorityChange = (e) => setPriority(e.target.value);
  const handleInventoriesChange = (e) => setInventories(e.target.value);
  const handleAssignedToChange = (e) => setAssignedTo(e.target.value);
  const handleStatusChange = (e) => setStatus(e.target.value);
  const handleLocationChange = (e) => setLocation(e.target.value);
  const handleRequestorChange = (e) => setRequestor(e.target.value);

  // Location Selection
  const handleLocationSelect = () => {
    // Dummy function to show the location selection
    // Replace with actual location selection logic
    const selectedLocation = "New Location"; // Example value
    setLocation(selectedLocation);
  };

  // Stage Handlers
  const handleNext = () => {
    if (currentStage === 1) {
      if (task && description && assignedTo) {
        setCurrentStage(2);
      } else {
        alert("Please fill in all required fields");
      }
    } else if (currentStage === 2) {
      if (inventories) {
        setCurrentStage(3);
      } else {
        alert("Please specify inventories");
      }
    } else if (currentStage === 3) {
      setCurrentStage(4);
    }
  };

  const handleSubmit = () => {
    const newTask = {
      title: task,
      description,
      priority,
      dueDate: dueDate.format("YYYY-MM-DD"),
      inventories,
      assignedTo,
      status,
      location,
      requestor,
    };
    setTasks([...tasks, newTask]);
    setSubmittedTask(newTask); // Set the submitted task to display
    // Clear form
    setTask("");
    setDescription("");
    setPriority("Medium");
    setDueDate(dayjs());
    setInventories("");
    setAssignedTo("");
    setStatus("Pending");
    setLocation("");
    setRequestor("");
    setCurrentStage(1);
  };

  const handleClear = () => {
    setTask("");
    setDescription("");
    setPriority("Medium");
    setDueDate(dayjs());
    setInventories("");
    setAssignedTo("");
    setStatus("Pending");
    setLocation("");
    setRequestor("");
    setCurrentStage(1);
    setSubmittedTask(null); // Clear the submitted task
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        sx={{
          maxWidth: 600,
          margin: "0 auto",
          padding: "20px",
          boxShadow: 3,
          borderRadius: 2,
          textAlign: "center",
          bgcolor: "background.paper",
        }}
      >
        <Typography variant="h4" gutterBottom>
          {currentStage === 1
            ? "Create Task"
            : currentStage === 2
              ? "Specify Inventories"
              : currentStage === 3
                ? "Select Location and Details"
                : "Review Task"}
        </Typography>

        {currentStage === 1 && (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Task Title"
                value={task}
                onChange={handleTaskChange}
                variant="outlined"
                fullWidth
                margin="normal"
                sx={{ borderRadius: 1 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Task Description"
                value={description}
                onChange={handleDescriptionChange}
                variant="outlined"
                fullWidth
                multiline
                rows={3}
                margin="normal"
                sx={{ borderRadius: 1 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                select
                label="Priority"
                value={priority}
                onChange={handlePriorityChange}
                fullWidth
                margin="normal"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 1,
                    height: 50,
                  },
                  "& .MuiSelect-select": {
                    height: 40,
                    display: "flex",
                    alignItems: "center",
                  },
                  "& .MuiInputLabel-root": {
                    top: -8,
                  },
                  "& .MuiSelect-icon": {
                    top: 16,
                  },
                }}
              >
                <MenuItem value="High" sx={{ backgroundColor: "#FF6F6F", marginBottom: 1 }}>
                  High
                </MenuItem>
                <MenuItem value="Medium" sx={{ backgroundColor: "#FFA07A", marginBottom: 1 }}>
                  Medium
                </MenuItem>
                <MenuItem value="Low" sx={{ backgroundColor: "#90EE90", marginBottom: 1 }}>
                  Low
                </MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Assigned To"
                value={assignedTo}
                onChange={handleAssignedToChange}
                variant="outlined"
                fullWidth
                margin="normal"
                sx={{ borderRadius: 1 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                select
                label="Status"
                value={status}
                onChange={handleStatusChange}
                fullWidth
                margin="normal"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 1,
                    height: 50,
                  },
                  "& .MuiSelect-select": {
                    height: 40,
                    display: "flex",
                    alignItems: "center",
                  },
                  "& .MuiInputLabel-root": {
                    top: -8,
                  },
                  "& .MuiSelect-icon": {
                    top: 16,
                  },
                }}
              >
                <MenuItem value="Pending" sx={{ backgroundColor: "#FFA07A", marginBottom: 1 }}>
                  Pending
                </MenuItem>
                <MenuItem value="In Progress" sx={{ backgroundColor: "#FFFF00", marginBottom: 1 }}>
                  In Progress
                </MenuItem>
                <MenuItem value="Completed" sx={{ backgroundColor: "#90EE90", marginBottom: 1 }}>
                  Completed
                </MenuItem>
              </TextField>
            </Grid>
          </Grid>
        )}

        {currentStage === 2 && (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Inventories Required"
                value={inventories}
                onChange={handleInventoriesChange}
                variant="outlined"
                fullWidth
                multiline
                rows={3}
                margin="normal"
                sx={{ borderRadius: 1 }}
              />
            </Grid>
          </Grid>
        )}

        {currentStage === 3 && (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Location"
                value={location}
                onChange={handleLocationChange}
                variant="outlined"
                fullWidth
                margin="normal"
                sx={{ borderRadius: 1 }}
                InputProps={{
                  endAdornment: (
                    <Button
                      onClick={handleLocationSelect}
                      variant="contained"
                      color="primary"
                      sx={{ borderRadius: 1, ml: 1, color: "#fff" }}
                    >
                      Choose Location
                    </Button>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Requestor"
                value={requestor}
                onChange={handleRequestorChange}
                variant="outlined"
                fullWidth
                margin="normal"
                sx={{ borderRadius: 1 }}
              />
            </Grid>
          </Grid>
        )}

        {currentStage === 4 && (
          <Box>
            <Typography variant="h6">Task Summary:</Typography>
            <Typography>Title: {task}</Typography>
            <Typography>Description: {description}</Typography>
            <Typography>Priority: {priority}</Typography>
            <Typography>Due Date: {dueDate.format("YYYY-MM-DD")}</Typography>
            <Typography>Inventories: {inventories}</Typography>
            <Typography>Assigned To: {assignedTo}</Typography>
            <Typography>Status: {status}</Typography>
            <Typography>Location: {location}</Typography>
            <Typography>Requestor: {requestor}</Typography>
          </Box>
        )}

        <Box mt={2}>
          {currentStage > 1 && (
            <Button
              variant="contained"
              color="secondary"
              onClick={() => setCurrentStage(currentStage - 1)}
              sx={{ borderRadius: 1, marginRight: 1, color: "#fff" }}
            >
              Back
            </Button>
          )}
          {currentStage < 4 ? (
            <Button
              variant="contained"
              color="primary"
              onClick={handleNext}
              sx={{ borderRadius: 1, color: "#fff" }}
            >
              Next
            </Button>
          ) : (
            <Button
              variant="contained"
              color="success"
              onClick={handleSubmit}
              sx={{ borderRadius: 1, marginRight: 1, color: "#000000" }}
            >
              Submit
            </Button>
          )}
          <Button
            variant="outlined"
            color="error"
            onClick={handleClear}
            sx={{ borderRadius: 1, color: "#000000" }}
          >
            Clear
          </Button>
        </Box>

        {submittedTask && (
          <Box
            mt={2}
            sx={{
              textAlign: "left",
              padding: 2,
              boxShadow: 3,
              borderRadius: 2,
              bgcolor: "background.paper",
            }}
          >
            <Typography variant="h6">Submitted Task:</Typography>
            <Typography>Title: {submittedTask.title}</Typography>
            <Typography>Description: {submittedTask.description}</Typography>
            <Typography>Priority: {submittedTask.priority}</Typography>
            <Typography>Due Date: {submittedTask.dueDate}</Typography>
            <Typography>Inventories: {submittedTask.inventories}</Typography>
            <Typography>Assigned To: {submittedTask.assignedTo}</Typography>
            <Typography>Status: {submittedTask.status}</Typography>
            <Typography>Location: {submittedTask.location}</Typography>
            <Typography>Requestor: {submittedTask.requestor}</Typography>
          </Box>
        )}
      </Box>
    </LocalizationProvider>
  );
};

export default CreateTaskComp;
