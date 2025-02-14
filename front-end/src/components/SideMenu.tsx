"use client";
import React from "react";
import CustomButton from "./atoms/CustomButton";

const SideMenu = () => {
  return (
    <div className="py-5 px-4">
      <ul className="flex flex-col gap-3">
        <li>
          <CustomButton variant="secondary" label="Dashboard" size="large" />
        </li>
        <li>
          <CustomButton variant="secondary" label="Profile" size="large" />
        </li>
        <li>
          <CustomButton variant="secondary" label="Settings" size="large" />
        </li>
      </ul>
    </div>
  );
};

export default SideMenu;
