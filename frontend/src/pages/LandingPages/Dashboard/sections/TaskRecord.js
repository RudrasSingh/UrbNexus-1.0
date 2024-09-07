// DashboardStats.js
import React from "react";
import { Typography, Paper } from "@mui/material";
import { Grid } from "@mui/material";
import { CheckCircle as CheckCircleIcon } from "@mui/icons-material";

const DashboardStats = () => {
  return (
    <Grid container spacing={3} sx={{ padding: 2 }}>
      <Grid item xs={12} sm={6} md={3}>
        <Paper elevation={3} sx={{ padding: 2, position: "relative", textAlign: "center" }}>
          <Typography variant="h6" component="h2" sx={{ fontSize: "1.2rem" }}>
            Total Tasks
          </Typography>
          <Typography variant="h4" component="p" sx={{ fontSize: "2rem" }}>
            45
          </Typography>
          <CheckCircleIcon
            sx={{ position: "absolute", top: 16, right: 16, color: "green", fontSize: "2rem" }}
          />
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Paper elevation={3} sx={{ padding: 2, position: "relative", textAlign: "center" }}>
          <Typography variant="h6" component="h2" sx={{ fontSize: "1.2rem" }}>
            Completed Tasks
          </Typography>
          <Typography variant="h4" component="p" sx={{ fontSize: "2rem" }}>
            30
          </Typography>
          <CheckCircleIcon
            sx={{ position: "absolute", top: 16, right: 16, color: "green", fontSize: "2rem" }}
          />
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Paper elevation={3} sx={{ padding: 2, position: "relative", textAlign: "center" }}>
          <Typography variant="h6" component="h2" sx={{ fontSize: "1.2rem" }}>
            Tasks in Progress
          </Typography>
          <Typography variant="h4" component="p" sx={{ fontSize: "2rem" }}>
            10
          </Typography>
          <CheckCircleIcon
            sx={{ position: "absolute", top: 16, right: 16, color: "green", fontSize: "2rem" }}
          />
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Paper elevation={3} sx={{ padding: 2, position: "relative", textAlign: "center" }}>
          <Typography variant="h6" component="h2" sx={{ fontSize: "1.2rem" }}>
            To-Do
          </Typography>
          <Typography variant="h4" component="p" sx={{ fontSize: "2rem" }}>
            5
          </Typography>
          <CheckCircleIcon
            sx={{ position: "absolute", top: 16, right: 16, color: "green", fontSize: "2rem" }}
          />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default DashboardStats;
