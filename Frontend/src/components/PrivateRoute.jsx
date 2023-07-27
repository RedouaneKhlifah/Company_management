import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import React from 'react'

const PrivateRoute = () => {
    const { userInfo } = useSelector((state) => state.auth);

    return userInfo ? <Outlet /> : <Navigate to="/signin" replace />;
}

export default PrivateRoute;
