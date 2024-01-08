import { NavHashLink } from "react-router-hash-link";
import { getResponsiveClasses } from "../shared/constants/getResponsiveClasses";
import { Button } from "./button";
import { Link } from "react-router-dom";

export interface NavbarProps {
  className?: string;
}
export function Navbar({ className }: NavbarProps) {
  return (
    <nav
      className={`absolute top-5 left-0 right-0 w-full z-[11] flex justify-between items-center ${getResponsiveClasses()} ${className}`}
    >
      <Link to={"/"}>
        <img src="/logo.png" className="scale-75" alt="Logo" />
      </Link>
      <div className="flex items-center gap-6">
        {navlinks.map((link) => {
          return (
            <NavHashLink
              key={link.route}
              to={link.route}
              className={({ isActive }) =>
                `${
                  isActive ? "text-primary" : "text-white"
                } hover:text-primary/65 transition-all duration-150 font-sans cursor-pointer`
              }
            >
              {link.name}
            </NavHashLink>
          );
        })}
        <Button>Discover More!</Button>
      </div>
    </nav>
  );
}

const navlinks = [
  { name: "Home", route: "/" },
  { name: "About Us", route: "/about_us" },
  { name: "Services", route: "/services" },
  { name: "Projects", route: "/projects" },
  { name: "Blogs", route: "/blogs" },
  { name: "Contact Us", route: "/contact_us" },
];
