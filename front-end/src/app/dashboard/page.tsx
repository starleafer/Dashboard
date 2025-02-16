"use client";
import Header from "@/components/Header";
import CustomCalendar from "@/components/molecules/CustomCalendar";
import Stocks from "@/components/Stocks";
import Todo from "@/components/Todo";
import Weather from "@/components/WeatherModule";
import React from "react";

const Dashboard = () => {
  return (
    <div className="w-full min-h-screen px-4">
      <div className="flex gap-4 max-w-[1920px] mx-auto">
        <div className="flex-1 flex flex-col gap-4">
          <Weather />
          <Stocks shadow={true} />
        </div>
        <div className="w-[400px] flex flex-col gap-4">
          <CustomCalendar />
          <Todo />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
