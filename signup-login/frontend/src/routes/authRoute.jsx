import { Navigate, Outlet } from "react-router-dom";
import Dashboard from "../pages/dashboard";

export const AuthRoute = () => {
  return !localStorage.getItem("token") ? (
    <Outlet />
  ) : (
    <Navigate to={<Dashboard />} />
  );
};
