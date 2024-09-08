import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Box, Typography, Container, Paper } from "@mui/material";

const dataPriority = [
  { name: "High", value: 400 },
  { name: "Medium", value: 300 },
  { name: "Low", value: 300 },
];

const dataBar = [
  { name: "To-Do", count: 5 },
  { name: "In Progress", count: 10 },
  { name: "Completed", count: 30 },
  { name: "Total", count: 45 },
];

const COLORS = ["#FF6347", "#4CAF50", "#1E90FF"];

const PriorityChart = () => {
  return (
    <Container
      sx={{
        padding: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        "@media (min-width:600px)": {
          padding: 4,
        },
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          maxWidth: 1200,
          padding: 2,
          backgroundColor: "white",
          borderRadius: 2,
          overflowX: "auto",
          "@media (min-width:600px)": {
            padding: 4,
          },
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ marginBottom: 4, textAlign: "center", fontSize: { xs: "1.5rem", sm: "2rem" } }}
        >
          Task Overview
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            width: "100%",
            gap: 2,
          }}
        >
          <Box
            sx={{
              flex: 1,
              padding: 1,
              textAlign: "center",
              "@media (min-width:600px)": {
                padding: 2,
              },
            }}
          >
            <Typography variant="h6" component="h2" gutterBottom sx={{ color: "#1976d2" }}>
              Priority Distribution
            </Typography>
            <PieChart
              width={window.innerWidth < 600 ? 250 : 300}
              height={window.innerWidth < 600 ? 250 : 300}
            >
              <Pie
                data={dataPriority}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius="80%"
                label
              >
                {dataPriority.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </Box>

          <Box
            sx={{
              flex: 1,
              padding: 1,
              textAlign: "center",
              "@media (min-width:600px)": {
                padding: 2,
                marginRight: 15,
              },
            }}
          >
            <Typography variant="h6" component="h2" gutterBottom sx={{ color: "#388e3c" }}>
              Tasks by Type
            </Typography>
            <ResponsiveContainer width="100%" height={window.innerWidth < 600 ? 300 : 400}>
              <BarChart data={dataBar}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default PriorityChart;
