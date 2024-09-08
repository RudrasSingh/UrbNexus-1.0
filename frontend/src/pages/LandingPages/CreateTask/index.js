//react arrow function
import React from "react";
import CreateTaskComp from "./sections/CreateTaskComp";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import routes from "routes";
import MKBox from "components/MKBox";
import footerRoutes from "footer.routes";
import DefaultFooter from "examples/Footers/DefaultFooter";

import { useDispatch } from "react-redux";
import { logoutUser } from "../../../redux/action";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CreateTask = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const UserState = useSelector((state) => state.userData);
  const label = UserState == null ? "Sign In" : "Sign Out";

  const handleActionClick = () => {
    if (UserState == null) {
      navigate("/signin"); // Redirect to the SignIn page
    } else {
      dispatch(logoutUser());
      alert("Please sign out to continue");
    }
  };
  return (
    <>
      <MKBox position="fixed" top="0.5rem" width="100%">
        <DefaultNavbar
          routes={routes}
          action={{
            type: "internal",
            label: label,
            color: "info",
            functions: handleActionClick, // Use the function directly
          }}
          sticky
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
