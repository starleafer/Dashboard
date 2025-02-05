"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
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
  CalendarDate,
} from "react-aria-components";
import CustomButton from "../atoms/CustomButton";
import CustomInput from "../atoms/CustomInput";

interface CalendarTask {
  _id: string;
  title: string;
  date: string;
  completed: boolean;
}

const CustomCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [tasks, setTasks] = useState<CalendarTask[]>([]);
  const [newTask, setNewTask] = useState("");
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:5000/calendar-tasks");
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const addTask = async () => {
    if (!selectedDate || !newTask.trim()) return;

    try {
      await axios.post("http://localhost:5000/calendar-tasks", {
        title: newTask,
        date: selectedDate.toISOString(),
      });
      setNewTask("");
      fetchTasks();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const hasTaskOnDate = (date: CalendarDate) => {
    const jsDate = date.toDate("UTC");
    return tasks.some(
      (task) => new Date(task.date).toDateString() === jsDate.toDateString()
    );
  };

  const getTasksForDate = (date: CalendarDate) => {
    const jsDate = date.toDate("UTC");
    return tasks.filter(
      (task) => new Date(task.date).toDateString() === jsDate.toDateString()
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <Calendar className="border flex flex-col justify-center rounded-xl px-5 py-5 m-5 gap-3">
        <div className="flex justify-between px-4">
          <Button slot="previous" className="border w-7 h-7 rounded-md" />
          <Heading />
          <Button slot="next" className="border w-7 h-7 rounded-md" />
        </div>
        <CalendarGrid className="flex flex-col gap-0">
          <CalendarGridHeader className="flex border">
            {(day) => (
              <CalendarHeaderCell className="h-9 w-9 text-gray-500 text-center border">
                {day}
              </CalendarHeaderCell>
            )}
          </CalendarGridHeader>
          <CalendarGridBody className="border">
            {(date) => (
              <CalendarCell
                date={date}
                className={`
                  flex items-center justify-center w-9 h-9 rounded-xl 
                  ${hasTaskOnDate(date) ? "bg-green-500/20" : ""}
                  hover:bg-white hover:text-primary
                  cursor-pointer
                  relative
                `}
                onPress={() => setSelectedDate(date.toDate("UTC"))}
                onMouseEnter={() => setHoveredDate(date.toDate("UTC"))}
                onMouseLeave={() => setHoveredDate(null)}
              >
                {date.day}
                {hoveredDate?.toDateString() ===
                  date.toDate("UTC").toDateString() &&
                  hasTaskOnDate(date) && (
                    <div className="absolute bottom-full mb-2 bg-gray-800 text-white p-2 rounded-md text-sm whitespace-nowrap">
                      {getTasksForDate(date).map((task) => (
                        <div key={task._id}>{task.title}</div>
                      ))}
                    </div>
                  )}
              </CalendarCell>
            )}
          </CalendarGridBody>
        </CalendarGrid>
      </Calendar>

      {selectedDate && (
        <div className="flex flex-col gap-2 px-5">
          <h3 className="text-lg font-medium">
            Add Task for {selectedDate.toLocaleDateString()}
          </h3>
          <div className="flex gap-2">
            <CustomInput
              value={newTask}
              onChange={(value) => setNewTask(value)}
              placeholder="Enter task"
            />
            <CustomButton
              onPress={addTask}
              variant="primary"
              label="Add Task"
            />
          </div>
          {getTasksForDate(selectedDate).length > 0 && (
            <div className="mt-2">
              <h4 className="font-medium mb-1">Tasks:</h4>
              <ul className="space-y-1">
                {getTasksForDate(selectedDate).map((task) => (
                  <li key={task._id} className="flex items-center gap-2">
                    <span>{task.title}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CustomCalendar;
