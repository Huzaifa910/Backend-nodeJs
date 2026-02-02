import { Navigate, Outlet } from "react-router-dom"
import LoginPage from "../pages/login"

export const PrivateRoute = ()=>{
    return localStorage.getItem("token") ? <Outlet/> :<Navigate to={<LoginPage/>} />
}