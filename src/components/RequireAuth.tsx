import {  Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../hooks/store";
//import { Unauthorized } from "./Unauthorized";

export const RequireAuth = ({ allowedRoles }: { allowedRoles: string[] } ) => {
   
   // {user, roles, isAuthenticated }
   
    const {user, roles, isAuthenticated }  = useAppSelector((state) => state.auth);

    console.log("USUARIO ", JSON.stringify(user));
  
    const location = useLocation();

    
    if(!isAuthenticated){ 
        return <Navigate to="/login"  state={{from: location}} replace/>      
    }

    return (
         roles?.find((role) => allowedRoles?.includes(role)) ? (
            <Outlet />
        ) : roles ? (
            <Navigate to="/unauthorized" state={{ from: location }} replace />
        ) : (
            <Navigate to="/login" state={{ from: location }} replace />
        )   
    )
      
    

} 