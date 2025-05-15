import {  Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../hooks/store";
//import { Unauthorized } from "./Unauthorized";

export const RequireAuth = ({ allowedRoles }: { allowedRoles: string[] } ) => {

    const user  = useAppSelector((state) => state.users);

    console.log("USUARIO ", JSON.stringify(user));
  
    const location = useLocation();

    if(!user){ 
        return <Navigate to="/login" />      
    }

    return (
        user?.roles?.find((role) => allowedRoles?.includes(role)) ? (
            <Outlet />
        ) : user?.roles ? (
            <Navigate to="/unauthorized" state={{ from: location }} replace />
        ) : (
            <Navigate to="/login" state={{ from: location }} replace />
        )   
    )
      
    

} 