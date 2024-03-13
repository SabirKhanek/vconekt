import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { PreloaderProvider } from "./shared/contexts/preloader.tsx";
import NavSwitchProvider from "./shared/contexts/navSwitch.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <PreloaderProvider>
      <NavSwitchProvider>
        <App />
      </NavSwitchProvider>
    </PreloaderProvider>
  </BrowserRouter>
);
