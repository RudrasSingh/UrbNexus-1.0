const imagesPrefix =
  "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/material-design-system/presentation/sections";

export default [
  {
    title: "Electrical Dept.",
    description: "A selection of 45 page sections that fit perfectly in any combination",
    items: [
      {
        image: `${imagesPrefix}/headers.jpg`,
        name: "Page Headers",
        count: 10,
        route: "/sections/page-sections/page-headers",
      },
      {
        image: `${imagesPrefix}/features.jpg`,
        name: "Features",
        count: 14,
        route: "/sections/page-sections/features",
      },
      {
        image: `${imagesPrefix}/pricing.jpg`,
        name: "Pricing",
        count: 8,
        pro: true,
      },
    ],
  },
  {
    title: "Jal Vibagh",
    description: "30+ components that will help go through the pages",
    items: [
      {
        image: `${imagesPrefix}/navbars.jpg`,
        name: "Navbars",
        count: 4,
        route: "/sections/navigation/navbars",
      },
      {
        image: `${imagesPrefix}/nav-tabs.jpg`,
        name: "Nav Tabs",
        count: 2,
        route: "/sections/navigation/nav-tabs",
      },
      {
        image: `${imagesPrefix}/pagination.jpg`,
        name: "Pagination",
        count: 3,
        route: "/sections/navigation/pagination",
      },
    ],
  },
  {
    title: "Ministry of Coal",
    description: "50+ elements that you need for text manipulation and insertion",
    items: [
      {
        image: `${imagesPrefix}/newsletters.jpg`,
        name: "Newsletters",
        count: 6,
        pro: true,
      },
      {
        image: `${imagesPrefix}/contact-sections.jpg`,
        name: "Contact Sections",
        count: 8,
        pro: true,
      },
      {
        image: `${imagesPrefix}/forms.jpg`,
        name: "Forms",
        count: 3,
        route: "/sections/input-areas/forms",
      },
      {
        image: `${imagesPrefix}/inputs.jpg`,
        name: "Inputs",
        count: 6,
        route: "/sections/input-areas/inputs",
      },
    ],
  },
  {
    title: "Ministry of Coal",
    description: "20+ Fully coded components that popup from different places of the screen",
    items: [
      {
        image: `${imagesPrefix}/alerts.jpg`,
        name: "Alerts",
        count: 4,
        route: "/sections/attention-catchers/alerts",
      },
      {
        image: `${imagesPrefix}/toasts.jpg`,
        name: "Notifications",
        count: 3,
        pro: true,
      },
      {
        image: `${imagesPrefix}/popovers.jpg`,
        name: "Tooltips & Popovers",
        count: 2,
        route: "/sections/attention-catchers/tooltips-popovers",
      },
      {
        image: `${imagesPrefix}/modals.jpg`,
        name: "Modals",
        count: 5,
        route: "/sections/attention-catchers/modals",
      },
    ],
  },
  {
    title: "Ministry of Coal",
    description: "80+ carefully crafted small elements that come with multiple colors and shapes",
    items: [
      {
        image: `${imagesPrefix}/buttons.jpg`,
        name: "Buttons",
        count: 6,
        route: "/sections/elements/buttons",
      },
      {
        image: `${imagesPrefix}/avatars.jpg`,
        name: "Avatars",
        count: 2,
        route: "/sections/elements/avatars",
      },
      {
        image: `${imagesPrefix}/typography.jpg`,
        name: "Typography",
        count: 2,
        route: "/sections/elements/typography",
      },
    ],
  },
];
