//react arrow function
import React from "react";
import CreateTaskComp from "./sections/CreateTaskComp";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import routes from "routes";
import MKBox from "components/MKBox";
import footerRoutes from "footer.routes";
import DefaultFooter from "examples/Footers/DefaultFooter";

const CreateTask = () => {
  return (
    <>
      <MKBox position="fixed" top="0.5rem" width="100%">
        <DefaultNavbar
          routes={routes}
          action={{
            type: "external",
            route: "/*route dashboard*/",
            label: "Dashboard",
            color: "info",
          }}
        />
      </MKBox>
      <MKBox pt={6} px={1} mt={6}>
        <CreateTaskComp></CreateTaskComp>
      </MKBox>
      <MKBox pt={6} px={1} mt={6} mb={0}>
        <DefaultFooter content={footerRoutes} />
      </MKBox>
    </>
  );
};

//export
export default CreateTask;
