import "./Layout.css";
import { Outlet } from "react-router-dom";
import { AppNavigation } from "../appNavigation/AppNavigation";

export function Layout() {
  return (
    <div className="container">
      <div className="panel">
        <div className="sub-panel">
          <Outlet />
        </div>
      </div>
      <AppNavigation />
    </div>
  );
}
