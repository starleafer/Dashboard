"use client";
import Header from "@/components/Header";
import CustomCalendar from "@/components/molecules/CustomCalendar";
import Stocks from "@/components/Stocks";
import Todo from "@/components/Todo";
import Weather from "@/components/WeatherModule";
import React from "react";
import styles from "@/styles/customScrollbar.module.css";

const Dashboard = () => {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <Weather />
      <div className="col-span-3 grid grid-cols-5 gap-4 flex-1">
        <Stocks />
        <div className={`space-y-4 h-[calc(100vh-80px)] overflow-y-auto`}>
        <CustomCalendar />
          <Todo />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
