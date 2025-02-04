import CustomCalendar from "@/components/molecules/CustomCalendar";
import Stocks from "@/components/Stocks";
import Todo from "@/components/Todo";
import Weather from "@/components/WeatherModule";
import React from "react";

const Dashboard = () => {
  return (
    <div className="h-full w-screen border grid-cols-5 overflow-hidden">
      <Weather />
      <div className="col-span-3 grid grid-cols-5">
        <Stocks />
        <div>
          <CustomCalendar />
          <Todo />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
