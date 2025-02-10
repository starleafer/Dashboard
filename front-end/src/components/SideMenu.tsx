"use client";
import React from "react";
import CustomButton from "./atoms/CustomButton";

const SideMenu = () => {
  return (
    <div className="p-5">
      <ul className="flex flex-col gap-3">
        <li>
          <CustomButton variant="secondary" label="Dashboard"/>
        </li>
        <li>
          <CustomButton variant="secondary" label="Profile"/>
        </li>
        <li>
          <CustomButton variant="secondary" label="Settings"/>
        </li>
      </ul>
    </div>
  );
};

export default SideMenu;
