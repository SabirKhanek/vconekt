import { useNavigate } from "react-router-dom";
import { RESOURCE_STATUS, usePreloader } from "../contexts/preloader";

export function useRouteChange() {
  const navigate = useNavigate();
  const preloader = usePreloader();
  const navigateTo = (to: string) => {
    preloader.registerResource("routeChange");
    preloader.updateStatus("routeChange", RESOURCE_STATUS.LOADING);
    window.scrollTo(0, 0);

    setTimeout(() => {
      navigate(to);

      preloader.updateStatus("routeChange", RESOURCE_STATUS.LOADED);
    }, 1000);
  };
  return navigateTo;
}
