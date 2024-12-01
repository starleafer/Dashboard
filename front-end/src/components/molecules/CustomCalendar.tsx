"use client";
import React from "react";
import {
  Button,
  Calendar,
  CalendarCell,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHeader,
  CalendarHeaderCell,
  Heading,
  Text,
} from "react-aria-components";
import CustomButton from "../atoms/CustomButton";

const CustomCalendar = () => {
  return (
    <Calendar className="border flex flex-col justify-center rounded-xl px-5 py-5 m-5 gap-3">
      <div className="flex justify-between px-4">
        <Button slot="previous" className="border w-7 h-7 rounded-md" />
        <Heading />
        <Button slot="next" className="border w-7 h-7 rounded-md" />
      </div>
      <CalendarGrid className="flex justify-center align-middle">
        <CalendarGridBody className="p-2 w-full">
          {(date) => (
            <CalendarCell
              date={date}
              className="flex items-center justify-center w-9 h-9 rounded-xl hover:bg-white hover:text-primary"
            />
          )}
        </CalendarGridBody>
      </CalendarGrid>
      <Text slot="errorMessage" />
    </Calendar>
  );
};

export default CustomCalendar;
