import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const LoginRoute = () => {
  const storedItem = JSON.parse(localStorage.getItem('login'));

  return (
    storedItem ? <Outlet /> : (<Navigate to='/' replace={true}/>)
  )
}

export default LoginRoute;