"use client";
import Header from "@/components/Header";
import CustomCalendar from "@/components/molecules/CustomCalendar";
import Stocks from "@/components/Stocks";
import Todo from "@/components/Todo";
import Weather from "@/components/WeatherModule";
import React from "react";

const Dashboard = () => {
  return (
    <div className="w-full min-h-screen grid-cols-5 overflow-y-auto flex flex-col">
      {/* <Header /> */}
      <Weather />
      <div className="col-span-3 grid grid-cols-5">
        <Stocks />
        <div className="">
          <CustomCalendar />
          <Todo />
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
