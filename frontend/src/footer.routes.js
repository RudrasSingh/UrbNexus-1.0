// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import GitHubIcon from "@mui/icons-material/GitHub";
import YouTubeIcon from "@mui/icons-material/YouTube";

// Material Kit 2 React components
import MKTypography from "components/MKTypography";

// Images
import logoCT from "assets/images/logo-ct-dark.png";

const date = new Date().getFullYear();

export default {
  brand: {
    name: "UrbNexus",
    image: logoCT,
    route: "/",
  },
  socials: [
    {
      icon: <FacebookIcon />,
      link: "https://www.facebook.com/CreativeTim/",
    },
    {
      icon: <TwitterIcon />,
      link: "https://twitter.com/creativetim",
    },
    {
      icon: <GitHubIcon />,
      link: "https://github.com/creativetimofficial",
    },
    {
      icon: <YouTubeIcon />,
      link: "https://www.youtube.com/channel/UCVyTG4sCw-rOvB9oHkzZD1w",
    },
  ],
  menus: [
    {
      name: "company",
      items: [
        { name: "Home", href: " /" },
        {
          name: "About Us",
          href: " /",
        },
        {
          name: "Tasks",
          href: " /",
        },
        { name: "Investors", href: " /" },
        {
          name: "Departments",
          href: " /",
        },
      ],
    },
    {
      name: "Department",
      items: [
        { name: "Dept. Work", href: " /" },
        { name: "Dept. Team", href: " /" },
        {
          name: "Dept. Chat",
          href: " /",
        },
      ],
    },
    {
      name: "Dept. Work",
      items: [
        { name: "Dept. Task", href: " /" },
        {
          name: "Dept. Inventory",
          href: " /",
        },
        {
          name: "Create Task",
          href: " /",
        },
        {
          name: "Add Inventory",
          href: " /",
        },
      ],
    },
    {
      name: "Dept. Team",
      items: [
        {
          name: "Admin",
          href: " /",
        },
        {
          name: "Officer",
          href: " /",
        },
        {
          name: "Tech Expert",
          href: " /",
        },
        {
          name: "Employee",
          href: " /",
        },
      ],
    },
  ],
  copyright: (
    <MKTypography variant="button" fontWeight="regular">
      All rights reserved. Copyright &copy; {date} UrbNexus by{" "}
      <MKTypography
        component="a"
        href="https://www.creative-tim.com"
        target="_blank"
        rel="noreferrer"
        variant="button"
        fontWeight="regular"
      >
        Invokators
      </MKTypography>
      .
    </MKTypography>
  ),
};
