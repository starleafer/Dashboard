"use client";
import React from "react";
import Logo from "./Logo";
import Clock from "./Clock";
import CustomToggleButton from "./atoms/CustomToggleButton";

const Header = () => {
  return (
    <header className="flex justify-between items-center px-3 pt-5 h-24 w-full">
      <Logo />
      <div className="flex items-center gap-5 pr-3">
        <Clock />
        <CustomToggleButton />
      </div>
    </header>
  );
};

export default Header;
