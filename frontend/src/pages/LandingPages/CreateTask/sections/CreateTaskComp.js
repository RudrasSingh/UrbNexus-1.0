import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
  Grid,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const priorityColors = {
  High: "#FF6F6F", // Red
  Medium: "#FFA07A", // Light Orange
  Low: "#90EE90", // Light Green
};

const CreateTaskComp = () => {
  const [currentStage, setCurrentStage] = useState(1);
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState(dayjs());
  const [inventories, setInventories] = useState("");
  const [images, setImages] = useState([]);
  const [tasks, setTasks] = useState([]);

  const handleTaskChange = (e) => setTask(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);
  const handlePriorityChange = (e) => setPriority(e.target.value);
  const handleDueDateChange = (newDate) => setDueDate(newDate);
  const handleInventoriesChange = (e) => setInventories(e.target.value);

  const handleImageUpload = (e) => {
    setImages(Array.from(e.target.files)); // Convert FileList to Array
  };

  const handleNext = () => {
    if (currentStage === 1) {
      if (task && description) {
        setCurrentStage(2);
      } else {
        alert("Please fill in all task details");
      }
    } else if (currentStage === 2) {
      if (inventories) {
        setCurrentStage(3);
      } else {
        alert("Please specify inventories");
      }
    }
  };

  const handleSubmit = () => {
    const newTask = {
      title: task,
      description,
      priority,
      dueDate: dueDate.format("YYYY-MM-DD"),
      inventories,
      images: images.length,
    };
    setTasks([...tasks, newTask]);
    // Clear form
    setTask("");
    setDescription("");
    setPriority("Medium");
    setDueDate(dayjs());
    setInventories("");
    setImages([]);
    setCurrentStage(1);
  };

  const handleClear = () => {
    setTask("");
    setDescription("");
    setPriority("Medium");
    setDueDate(dayjs());
    setInventories("");
    setImages([]);
    setCurrentStage(1);
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
                    height: 50, // Adjust as needed
                  },
                  "& .MuiSelect-select": {
                    height: 40, // Match the height of the root to make it look consistent
                    display: "flex",
                    alignItems: "center",
                  },
                  "& .MuiInputLabel-root": {
                    top: -8, // Adjust if needed
                  },
                  "& .MuiSelect-icon": {
                    top: 16, // Center the dropdown icon vertically
                  },
                }}
              >
                <MenuItem
                  value="High"
                  sx={{ backgroundColor: priorityColors.High, marginBottom: 1 }}
                >
                  High
                </MenuItem>
                <MenuItem
                  value="Medium"
                  sx={{ backgroundColor: priorityColors.Medium, marginBottom: 1 }}
                >
                  Medium
                </MenuItem>
                <MenuItem value="Low" sx={{ backgroundColor: priorityColors.Low, marginBottom: 1 }}>
                  Low
                </MenuItem>
              </TextField>
            </Grid>

            <Grid container item xs={12} spacing={2} alignItems="center">
              <Grid item xs={6}>
                <DatePicker
                  label="Due Date"
                  value={dueDate}
                  onChange={handleDueDateChange}
                  renderInput={(params) => (
                    <TextField fullWidth {...params} sx={{ borderRadius: 1 }} />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <Button
                  variant="contained"
                  component="label"
                  color="primary"
                  fullWidth
                  sx={{
                    borderRadius: 1,
                    color: "#fff",
                    backgroundColor: "#007BFF",
                    "&:hover": { backgroundColor: "#0056b3" },
                    boxShadow: 3,
                  }}
                >
                  Upload Images
                  <input type="file" hidden multiple onChange={handleImageUpload} />
                </Button>
              </Grid>
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
          <Box>
            <Typography variant="h6" gutterBottom>
              Task Review
            </Typography>
            <Typography variant="body1">
              <strong>Title:</strong> {task}
            </Typography>
            <Typography variant="body1">
              <strong>Description:</strong> {description}
            </Typography>
            <Typography variant="body1">
              <strong>Priority:</strong> {priority}
            </Typography>
            <Typography variant="body1">
              <strong>Due Date:</strong> {dueDate.format("YYYY-MM-DD")}
            </Typography>
            <Typography variant="body1">
              <strong>Inventories:</strong> {inventories}
            </Typography>
            <Typography variant="body1">
              <strong>Uploaded Images:</strong> {images.length}
            </Typography>
          </Box>
        )}

        <Grid container spacing={2} sx={{ mt: 3 }}>
          <Grid item xs={6}>
            {currentStage < 3 ? (
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                fullWidth
                sx={{
                  borderRadius: 1,
                  color: "#fff",
                  backgroundColor: "#007BFF",
                  "&:hover": { backgroundColor: "#0056b3" },
                  boxShadow: 3,
                }}
              >
                {currentStage === 1 ? "Next" : "Next"}
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                fullWidth
                sx={{
                  borderRadius: 1,
                  backgroundColor: "#007BFF",
                  color: "#fff",
                  "&:hover": { backgroundColor: "#0056b3" },
                  boxShadow: 3,
                }}
              >
                Submit
              </Button>
            )}
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleClear}
              fullWidth
              sx={{
                borderRadius: 1,
                borderColor: "#007BFF",
                color: "#007BFF",
                "&:hover": { borderColor: "#0056b3", color: "#0056b3" },
                boxShadow: 3,
              }}
            >
              Clear Form
            </Button>
          </Grid>
        </Grid>

        {tasks.length > 0 && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h5" gutterBottom>
              Task List
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <List>
              {tasks.map((task, index) => (
                <ListItem
                  key={index}
                  sx={{ boxShadow: 1, mb: 2, borderRadius: 2, bgcolor: "background.paper" }}
                >
                  <ListItemText
                    primary={`${task.title} - (${task.priority} Priority)`}
                    secondary={
                      <Box>
                        <Typography variant="body2">Description: {task.description}</Typography>
                        <Typography variant="body2">Due Date: {task.dueDate}</Typography>
                        <Typography variant="body2">Inventories: {task.inventories}</Typography>
                        <Typography variant="body2">Uploaded Images: {task.images}</Typography>
                      </Box>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        )}
      </Box>
    </LocalizationProvider>
  );
};

export default CreateTaskComp;
