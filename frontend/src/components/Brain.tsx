import React from "react";
import { SideBar } from "./SideBar";
import { ContentScreen } from "./ContentScreen";

export function Brain() {
  return (
    <div className="flex bg-[#F9FBFC] h-screen">
      
      <SideBar></SideBar>
      <div className="flex-1 overflow-y-auto">
        <ContentScreen></ContentScreen>
      </div>

    </div>
  );
}
