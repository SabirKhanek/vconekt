import { NavHashLink } from "react-router-hash-link";
import { getResponsiveClasses } from "../shared/constants/getResponsiveClasses";
import { Button } from "./button";
import { Link, useLocation } from "react-router-dom";
import { RESOURCE_STATUS, usePreloader } from "../shared/contexts/preloader";
import { MenuButton } from "./MenuButton";
import { useNavSwitch } from "../shared/contexts/navSwitch";
import { MobileNav } from "./mobileNav";

export interface NavbarProps {
  className?: string;
}
export function Navbar({ className }: NavbarProps) {
  const location = useLocation();
  const preloader = usePreloader();
  const nav = useNavSwitch();

  return (
    <nav
      className={`absolute top-5 left-0 right-0 w-full z-[11] flex justify-between items-center ${getResponsiveClasses()} ${className}`}
    >
      <Link to={"/"}>
        <img src="/logo.png" className="scale-75" alt="Logo" />
      </Link>
      <div className="hidden 843:flex items-center gap-4 text-sm 939:text-base 939:gap-6 ">
        {navlinks.map((link) => {
          return (
            <NavHashLink
              key={link.route}
              to={link.route}
              onClick={() => {
                preloader.registerResource("routeChange");
                preloader.updateStatus("routeChange", RESOURCE_STATUS.LOADING);
                setTimeout(() => {
                  preloader.updateStatus("routeChange", RESOURCE_STATUS.LOADED);
                }, 1000);
              }}
              className={({ isActive }) =>
                `${
                  isActive ? "text-primary" : "text-white"
                } hover:text-primary/65 transition-all relative duration-150 font-sans cursor-pointer`
              }
            >
              {link.name}
              {location.pathname === link.route && ( // render this only when the route is active
                <svg
                  width="8"
                  height="42"
                  className="absolute left-1/2 -translate-x-1/2 -top-[50px]"
                  viewBox="0 0 8 42"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.75 3.27835e-08C4.75 -0.414214 4.41421 -0.75 4 -0.75C3.58579 -0.75 3.25 -0.414214 3.25 -3.27835e-08L4.75 3.27835e-08ZM4 34C1.79086 34 -1.56447e-06 35.7909 -1.66103e-06 38C-1.7576e-06 40.2091 1.79086 42 4 42C6.20914 42 8 40.2091 8 38C8 35.7909 6.20914 34 4 34ZM3.25 -3.27835e-08L3.25 38L4.75 38L4.75 3.27835e-08L3.25 -3.27835e-08Z"
                    fill="#B2E161"
                  />
                </svg>
              )}
            </NavHashLink>
          );
        })}
        <Button className="font-orbit text-sm">Discover More!</Button>
      </div>

      <button
        onClick={() => nav.switchNav(!nav.isNavOpened)}
        className="!rounded-full bg-white 843:hidden flex justify-center items-center p-3"
      >
        <span className="inline-flex w-4 h-4 justify-center items-center">
          <MenuButton
            isOpen={nav.isNavOpened}
            strokeWidth="1.5"
            color="#000000"
            transition={{ ease: "easeOut", duration: 0.2 }}
            width="16"
            height="12"
          />
        </span>
        <MobileNav></MobileNav>
      </button>
    </nav>
  );
}

export const navlinks = [
  { name: "Home", route: "/" },
  { name: "About Us", route: "/about_us" },
  { name: "Services", route: "/services" },
  { name: "Projects", route: "/projects" },
  { name: "Blogs", route: "/blogs" },
  { name: "Contact Us", route: "/contact_us" },
];
