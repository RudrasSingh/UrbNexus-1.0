import Sidebar from "../Sidebar";
import MKBox from "components/MKBox";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import routes from "routes";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../../../redux/action";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DefaultFooter from "examples/Footers/DefaultFooter";
import footerRoutes from "footer.routes";
//react arrow function
const ToDo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const UserState = useSelector((state) => state.user.userData);
  const label = UserState == null ? "Sign In" : "Sign Out";

  const handleActionClick = () => {
    if (UserState == null) {
      navigate("/signin"); // Redirect to the SignIn page
    } else {
      dispatch(logoutUser());
      alert("Logged out successfully");
    }
  };
  const filterRoutes = (routes) => {
    return routes
      .filter(
        (route) =>
          route.name !== "Dashboard" &&
          route.name !== "Dept." &&
          route.name !== "Create Task" &&
          route.name !== "Add Inventory"
      )
      .map((route) => {
        // If a route has a `collapse` property, we need to filter it recursively
        if (route.collapse) {
          return {
            ...route,
            collapse: filterRoutes(route.collapse), // Recursively filter the collapse array
          };
        }
        return route;
      });
  };
  const filteredRoutes = UserState ? routes : filterRoutes(routes);
  return (
    <>
      <MKBox
        position="fixed"
        top="0.5rem"
        width="100%"
        display="flex"
        justifyContent="center"
        zIndex="200"
      >
        <DefaultNavbar
          routes={filteredRoutes}
          action={{
            type: "internal",
            label: label,
            color: "info",
            functions: handleActionClick, // Use the function directly
          }}
          sticky
        />
      </MKBox>
      <Sidebar></Sidebar>
      <div>
        <h1 style={{ margintop: "10rem", marginleft: "10rem" }}>ToDo</h1>
      </div>
      <MKBox pt={6} px={1} mt={6} mb={0}>
        <DefaultFooter content={footerRoutes} />
      </MKBox>
    </>
  );
};
export default ToDo;
