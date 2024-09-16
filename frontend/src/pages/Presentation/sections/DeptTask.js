// react-router-dom components
// import { Link } from "react-router-dom";

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKBadge from "components/MKBadge";
import MKTypography from "components/MKTypography";

// Presentation page components
// import ExampleCard from "pages/Presentation/components/ExampleCard";

// // Data
// import data from "pages/Presentation/sections/data/designBlocksData";
import Trial from "./Check";

function DeptTask() {
  return (
    <MKBox component="section" my={6} py={6}>
      <Container>
        <Grid
          container
          item
          xs={12}
          lg={6}
          flexDirection="column"
          alignItems="center"
          sx={{ textAlign: "center", my: 6, mx: "auto", px: 0.75 }}
        >
          <MKBadge
            variant="contained"
            color="info"
            badgeContent="Created Tasks"
            container
            sx={{ mb: 2 }}
          />
          <MKTypography variant="h2" fontWeight="bold">
            Department Tasks
          </MKTypography>
          <MKTypography variant="body1" color="text">
            Assign and manage tasks across departments to ensure smooth project execution and
            effective collaboration.
          </MKTypography>
        </Grid>
      </Container>
      <Trial></Trial>
    </MKBox>
  );
}

export default DeptTask;
