"use client";
import React from "react";
import CustomButton from "./atoms/CustomButton";
import Logo from "./Logo";

const SideMenu = () => {
  return (
    <div className="py-5 px-4">
      <Logo />
      <ul className="flex flex-col gap-3">
        <li>
          <CustomButton variant="primary" label="Dashboard" size="large" />
        </li>
        <li>
          <CustomButton variant="primary" label="Profile" size="large" />
        </li>
        <li>
          <CustomButton variant="primary" label="Settings" size="large" />
        </li>
      </ul>
    </div>
  );
};

export default SideMenu;
