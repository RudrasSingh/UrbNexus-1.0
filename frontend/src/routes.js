// @mui material components
import Icon from "@mui/material/Icon";

// Pages
import AboutUs from "layouts/pages/landing-pages/about-us";
import CreateTask from "pages/LandingPages/CreateTask";

// import CreateTask from "pages/LandingPages/CreateTask";
import Task from "pages/LandingPages/Task";
// import SignIn from "pages/LandingPages/SignIn";
import Dashboard from "pages/LandingPages/Dashboard";
import DepartmentTask from "pages/LandingPages/DepartmentTask";

//import forumpage
import ForumPage from "pages/LandingPages/ForumPage";

const routes = [
  {
    name: "Home",
    icon: <Icon>dashboard</Icon>,
    route: " /",
    columns: 1,
    rowsPerColumn: 2,
  },

  {
    name: "AboutUs",
    icon: <Icon>dashboard</Icon>,
    route: "/pages/landing-pages/about-us",
    component: <AboutUs />,
  },
  {
    name: "Task",
    icon: <Icon>dashboard</Icon>,
    route: "/pages/landing-pages/Task",
    component: <Task />,
  },
  {
    name: "Inventory",
    icon: <Icon>dashboard</Icon>,
    route: " /",
    component: <CreateTask />,
  },
  {
    name: "Dept.",
    icon: <Icon>view_day</Icon>,
    collapse: [
      {
        name: "Dept. Work",
        description: "See all sections",
        dropdown: true,
        collapse: [
          {
            name: "Dept. Task",
            route: "/pages/landing-pages/DepartmentTask",
            component: <DepartmentTask />,
          },
          {
            name: "Dept. Inventory",
            route: " /",
            component: <CreateTask />,
          },
          {
            name: "Create Task",
            route: "/pages/landing-pages/CreateTask",
            component: <CreateTask />,
          },
          {
            name: "Add Inventory",
            route: " /",
            component: <CreateTask />,
          },
        ],
      },
      {
        name: "Dept. Team",
        description: "See all navigations",
        dropdown: true,
        collapse: [
          {
            name: "Admin",
            route: " /",
            component: <CreateTask />,
          },
          {
            name: "Officer",
            route: " /",
            component: <CreateTask />,
          },
          {
            name: "Tech Expart",
            route: " /",
            component: <CreateTask />,
          },
          {
            name: "Employee",
            route: " /",
            component: <CreateTask />,
          },
        ],
      },
      {
        name: "Dept. Chat",
        route: "/pages/landing-pages/ForumPage",
        component: <ForumPage />,
        description: "See all input areas",
        dropdown: true,
      },
    ],
  },
  {
    name: "Dashboard",
    icon: <Icon>dashboard</Icon>,
    route: "/pages/landing-pages/Dashboard",
    component: <Dashboard />,
  },
];

export default routes;
