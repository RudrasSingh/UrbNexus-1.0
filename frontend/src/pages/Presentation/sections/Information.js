// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// Material Kit 2 React components
import MKBox from "components/MKBox";

// Material Kit 2 React examples
import RotatingCard from "examples/Cards/RotatingCard";
import RotatingCardFront from "examples/Cards/RotatingCard/RotatingCardFront";
import RotatingCardBack from "examples/Cards/RotatingCard/RotatingCardBack";
import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";

// Images
import bgFront from "assets/images/rotating-card-bg-front.jpeg";
import bgBack from "assets/images/rotating-card-bg-back.jpeg";

function Information() {
  return (
    <MKBox component="section" py={6} my={6}>
      <Container>
        <Grid container item xs={11} spacing={3} alignItems="center" sx={{ mx: "auto" }}>
          <Grid item xs={12} lg={4} sx={{ mx: "auto" }}>
            <RotatingCard>
              <RotatingCardFront
                image={bgFront}
                icon="touch_app"
                title={
                  <>
                    Touch the
                    <br />
                    UrbNexus.
                  </>
                }
                description="UrbNexus to simplify coordination, streamline project management, and enhance collaboration across departments, ensuring efficient urban governance."
              />
              <RotatingCardBack
                image={bgBack}
                title="Discover More"
                description="You will save a lot of time going from prototyping to full-functional code because all elements are implemented."
                action={{
                  type: "internal",
                  route: " /",
                  label: "start with task",
                }}
              />
            </RotatingCard>
          </Grid>
          <Grid item xs={12} lg={7} sx={{ ml: "auto" }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <DefaultInfoCard
                  icon="content_copy"
                  title="Centralized Data Exchange"
                  description="Built by developers for developers. Check the foundation and you will find everything inside our documentation."
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <DefaultInfoCard
                  icon="flip_to_front"
                  title="Collaborative Project Management"
                  description="Tools for scheduling, task distribution, and reporting to streamline inter-departmental projects."
                />
              </Grid>
            </Grid>
            <Grid container spacing={3} sx={{ mt: { xs: 0, md: 6 } }}>
              <Grid item xs={12} md={6}>
                <DefaultInfoCard
                  icon="price_change"
                  title="Save environment & Earn Credits"
                  description="Finish the work with less Carbon Emissions and more credits."
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <DefaultInfoCard
                  icon="devices"
                  title="Cross Department Collaboration"
                  description="Collaborate with your team in different departments."
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </MKBox>
  );
}

export default Information;
