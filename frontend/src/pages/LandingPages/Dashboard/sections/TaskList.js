import React from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { MdKeyboardArrowDown, MdKeyboardArrowUp, MdKeyboardDoubleArrowUp } from "react-icons/md";

// Sample data
const tasks = [
  { id: 1, name: "Task 1", status: "To-Do", priority: "High" },
  { id: 2, name: "Task 2", status: "In Progress", priority: "Medium" },
  { id: 3, name: "Task 3", status: "Completed", priority: "Low" },
  { id: 4, name: "Task 4", status: "To-Do", priority: "High" },
  // Add more tasks as needed
];

const priorityIcons = {
  High: <MdKeyboardDoubleArrowUp />,
  Medium: <MdKeyboardArrowUp />,
  Low: <MdKeyboardArrowDown />,
};

const priorityStyles = {
  High: { color: "#dc2626" }, // Red
  Medium: { color: "#f59e0b" }, // Orange
  Low: { color: "#10b981" }, // Green
};

const TaskList = () => {
  return (
    <Box
      sx={{
        padding: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#f5f5f5", // Background color for the container
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          maxWidth: 1200,
          padding: 4,
          backgroundColor: "white",
          borderRadius: 2,
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom sx={{ textAlign: "center" }}>
          All Tasks
        </Typography>

        <TableContainer sx={{ maxHeight: 600 }}>
          <Table sx={{ tableLayout: "fixed" }}>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    textAlign: "left",
                    padding: "16px 8px", // Padding for header cells
                    // Add a border to separate header from rows
                  }}
                >
                  Name
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    textAlign: "left",
                    padding: "16px 8px 0 20rem", // Padding for header cells
                    // Add a border to separate header from rows
                  }}
                >
                  Status
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    textAlign: "right",
                    padding: "16px 8px 0 20rem", // Padding for header cells
                    // Add a border to separate header from rows
                  }}
                >
                  Priority
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {tasks.map((task) => (
                <TableRow key={task.id} sx={{ "&:hover": { backgroundColor: "#f3f3f3" } }}>
                  <TableCell sx={{ textAlign: "left" }}>{task.name}</TableCell>
                  <TableCell sx={{ textAlign: "left" }}>{task.status}</TableCell>
                  <TableCell sx={{ textAlign: "left" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span style={priorityStyles[task.priority]}>
                        {priorityIcons[task.priority]}
                      </span>
                      <span>{task.priority}</span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default TaskList;
