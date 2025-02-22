// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

// Material Kit 2 React examples
import HorizontalTeamCard from "examples/Cards/TeamCards/HorizontalTeamCard";

// Images
import team1 from "assets/images/atul.jpg";
import team2 from "assets/images/subhradeep.PNG";
import team3 from "assets/images/utsav.jpg";
import team4 from "assets/images/rishav.jpeg";
import team5 from "assets/images/kritii.jpeg";
import team6 from "assets/images/srijita.jpg";

function Team() {
  return (
    <MKBox
      component="section"
      variant="gradient"
      bgColor="dark"
      position="relative"
      py={6}
      px={{ xs: 2, lg: 0 }}
      mx={-2}
    >
      <Container>
        <Grid container>
          <Grid item xs={12} md={8} sx={{ mb: 6 }}>
            <MKTypography variant="h3" color="white">
              The Executive Team
            </MKTypography>
            <MKTypography variant="body2" color="white" opacity={0.8}>
              There&apos;s nothing we really wanted to do in life that we weren&apos;t able to get
              good at. That&apos;s my skill.
            </MKTypography>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={6}>
            <MKBox mb={1}>
              <HorizontalTeamCard
                image={team1}
                name="Atul Kumar Singh"
                position={{ color: "info", label: "Lead and Backend Developer" }}
                description="Crafting seamless connections between data and functionality, empowering the digital world."
              />
            </MKBox>
          </Grid>
          <Grid item xs={12} lg={6}>
            <MKBox mb={1}>
              <HorizontalTeamCard
                image={team2}
                name="Subhradeep Bhattacharya"
                position={{ color: "info", label: "Frontend Developer" }}
                description="Turning designs into dynamic, user-friendly interfaces with precision and creativity."
              />
            </MKBox>
          </Grid>
          <Grid item xs={12} lg={6}>
            <MKBox mb={{ xs: 1, lg: 0 }}>
              <HorizontalTeamCard
                image={team3}
                name="Utsav Tiwari"
                position={{ color: "info", label: "Frontend Developer" }}
                description="Turning designs into interactive, pixel-perfect, and responsive experiences."
              />
            </MKBox>
          </Grid>
          <Grid item xs={12} lg={6}>
            <MKBox mb={{ xs: 1, lg: 0 }}>
              <HorizontalTeamCard
                image={team4}
                name="Rishav Gupta"
                position={{ color: "info", label: "Backend Developer" }}
                description="Designing algorithms that transform data into action, powering the core of every digital experience."
              />
            </MKBox>
          </Grid>
          <Grid item xs={12} lg={6}>
            <MKBox mb={{ xs: 1, lg: 0 }}>
              <HorizontalTeamCard
                image={team5}
                name="Kriti Raj"
                position={{ color: "info", label: "Database Administrator" }}
                description="Optimizing data storage and retrieval to ensure efficient, secure, and reliable database management."
              />
            </MKBox>
          </Grid>
          <Grid item xs={12} lg={6}>
            <MKBox mb={{ xs: 1, lg: 0 }}>
              <HorizontalTeamCard
                image={team6}
                name="Srijita Jana"
                position={{ color: "info", label: "business analyzer" }}
                description="Analyzing data to uncover trends and inform strategic decisions for business growth and efficiency."
              />
            </MKBox>
          </Grid>
        </Grid>
      </Container>
    </MKBox>
  );
}

export default Team;
