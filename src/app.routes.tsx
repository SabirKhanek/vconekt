import { RouteObject } from "react-router-dom";
import { Home } from "./pages/home";
import { AboutUsPage } from "./pages/about_us_page";
import { Projects } from "./pages/projects";
import { ContactUsPage } from "./pages/contact_us_page";
import { BlogsPage } from "./pages/blogs";

export const routesConfig: RouteObject[] = [
  {
    path: "/",
    element: <Home></Home>,
  },
  {
    path: "projects",
    element: <Projects />,
  },
  { path: "about_us", element: <AboutUsPage /> },
  { path: "contact_us", element: <ContactUsPage /> },
  { path: "blogs", element: <BlogsPage /> },
];
