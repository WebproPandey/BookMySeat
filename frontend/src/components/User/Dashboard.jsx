import React from "react";
import {Outlet } from "react-router-dom";

export default function Dashboard() {
 

  return (
    <div className="user-dashboard w-full">
     <Outlet/>      
    </div>
  );
}