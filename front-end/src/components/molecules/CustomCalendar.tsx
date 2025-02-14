"use client";
import React, { useState, useEffect, useRef } from "react";
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

interface TodoTask {
  _id: string;
  title: string;
  date: string;
  completed: boolean;
}

const taskUpdateEvent = new EventTarget();

export const taskEvents = {
  target: taskUpdateEvent,
  TASKS_UPDATED: 'tasksUpdated'
};

const CustomCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [tasks, setTasks] = useState<TodoTask[]>([]);
  const [newTask, setNewTask] = useState("");
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isEditing, setIsEditing] = useState<string | false>(false);
  const [editText, setEditText] = useState("");
  const [today, setToday] = useState<Date>(new Date());
  const [isOpen, setIsOpen] = useState(true);
  const [isInputOpen, setIsInputOpen] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const normalizedToday = new Date(today);
    normalizedToday.setHours(0, 0, 0, 0);
    setToday(normalizedToday);
  }, []);

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsInputOpen(false);
        setSelectedDate(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch("http://localhost:5000/calendar-tasks");
      const data = await response.json();

      const sortedTasks = data.sort((a: TodoTask, b: TodoTask) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateA.getTime() - dateB.getTime();
      });

      setTasks(sortedTasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const updateTasksAndNotify = (newTasks: TodoTask[]) => {
    setTasks(newTasks);
    taskUpdateEvent.dispatchEvent(new CustomEvent('tasksUpdated', { detail: newTasks }));
  };

  const addTask = async () => {
    if (!selectedDate || !newTask.trim()) return;

    try {
      const dateToSave = new Date(selectedDate);
      dateToSave.setHours(0, 0, 0, 0);

      const response = await fetch("http://localhost:5000/calendar-tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: newTask,
          date: dateToSave.toISOString(),
          completed: false,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create task");
      }

      const newTaskData = await response.json();
      updateTasksAndNotify([...tasks, newTaskData]);
      setNewTask("");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const deleteTask = async (taskId: string) => {
    try {
      const response = await fetch(
        `http://localhost:5000/calendar-tasks/${taskId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        updateTasksAndNotify(tasks.filter(task => task._id !== taskId));
      } else {
        throw new Error("Failed to delete task");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const editTask = (taskId: string) => {
    setIsEditing(taskId);
    setEditText(tasks.find((task) => task._id === taskId)?.title || "");
  };

  const saveTask = async (taskId: string) => {
    if (!editText.trim()) return;
    try {
      const currentTask = tasks.find(t => t._id === taskId);
      if (!currentTask) return;

      const response = await fetch(
        `http://localhost:5000/calendar-tasks/${taskId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            title: editText,
            completed: currentTask.completed 
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update task");
      }

      const tasksResponse = await fetch("http://localhost:5000/calendar-tasks");
      const newTasks = await tasksResponse.json();
      updateTasksAndNotify(newTasks);
      
      setIsEditing(false);
      setEditText("");
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  const finishTask = async (taskId: string) => {
    try {
      const currentTask = tasks.find((t) => t._id === taskId);
      if (!currentTask) return;
  
      const response = await fetch(
        `http://localhost:5000/calendar-tasks/${taskId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            completed: !currentTask.completed,
            title: currentTask.title,
          }),
        }
      );
  
      if (response.ok) {
        const tasksResponse = await fetch("http://localhost:5000/calendar-tasks");
        const newTasks = await tasksResponse.json();
        updateTasksAndNotify(newTasks);
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const isToday = (date: CalendarDate): boolean => {
    const jsDate = new Date(date.year, date.month - 1, date.day);
    return jsDate.toDateString() === today.toDateString();
  };

  const hasTaskOnDate = (date: CalendarDate) => {
    const jsDate = new Date(date.year, date.month - 1, date.day);
    jsDate.setHours(0, 0, 0, 0);

    const tasksOnDate = tasks.filter((task) => {
      const taskDate = new Date(task.date);
      taskDate.setHours(0, 0, 0, 0);
      return taskDate.getTime() === jsDate.getTime();
    });

    if (tasksOnDate.length === 0) return false;

    return tasksOnDate.every((task) => task.completed)
      ? "completed"
      : "pending";
  };

  const getTasksForDate = (date: Date | CalendarDate) => {
    let jsDate: Date;
    if (date instanceof Date) {
      jsDate = date;
    } else {
      jsDate = new Date(date.year, date.month - 1, date.day);
    }

    return tasks.filter((task) => {
      const taskDate = new Date(task.date);
      return taskDate.toDateString() === jsDate.toDateString();
    });
  };

  const isDateInDisplayedMonth = (date: CalendarDate): boolean => {
    const jsDate = new Date(date.year, date.month - 1, date.day);
    return (
      jsDate.getMonth() === currentMonth.getMonth() &&
      jsDate.getFullYear() === currentMonth.getFullYear()
    );
  };

  const isDatePassed = (date: CalendarDate): boolean => {
    const jsDate = new Date(date.year, date.month - 1, date.day);
    jsDate.setHours(0, 0, 0, 0);
    return jsDate < today;
  };

  if (!isOpen) return null;

  return (
    <div ref={calendarRef} className="flex flex-col border rounded-3xl m-5 relative">
      <Calendar
        className="flex flex-col justify-center rounded-xl px-1 py-1 m-5 gap-3"
        onChange={(date) => {
          setSelectedDate(date.toDate("UTC"));
          setCurrentMonth(date.toDate("UTC"));
          setIsInputOpen(true);
        }}
      >
        <div className="flex justify-between px-4">
          <CustomButton
            icon="prev"
            variant="secondary"
            size="small"
            slot="previous"
            onPress={() => {
              const newDate = new Date(currentMonth);
              newDate.setMonth(currentMonth.getMonth() - 1);
              setCurrentMonth(newDate);
            }}
          />
          <Heading />
          <CustomButton
            icon="next"
            variant="secondary"
            size="small"
            slot="next"
            onPress={() => {
              const newDate = new Date(currentMonth);
              newDate.setMonth(currentMonth.getMonth() + 1);
              setCurrentMonth(newDate);
            }}
          />
        </div>
        <CalendarGrid className="flex flex-col gap-0 ">
          <CalendarGridHeader className="flex  justify-evenly">
            {(day) => (
              <CalendarHeaderCell className="h-10 w-10 text-gray-500 text-center ">
                {day}
              </CalendarHeaderCell>
            )}
          </CalendarGridHeader>
          <CalendarGridBody className="">
            {(date) => (
              <CalendarCell
                date={date}
                className={`
                flex items-center justify-center w-9 h-9 rounded-xl 
                ${hasTaskOnDate(date) === "completed" ? "" : ""}
                ${
                  hasTaskOnDate(date) === "pending" && isDatePassed(date)
                    ? "text-danger"
                    : ""
                }
                ${
                  hasTaskOnDate(date) === "pending" && !isDatePassed(date)
                    ? "text-primary"
                    : ""
                }
                ${!isDateInDisplayedMonth(date) ? "text-gray-200 dark:text-gray-600" : ""}
                ${isToday(date) ? "bg-primary text-white" : ""}
                hover:bg-white hover:text-primary
                active:outline outline-1 outline-primary
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
        {}
      </Calendar>
      {selectedDate && isInputOpen && (
        <div ref={inputRef} className="flex flex-col gap-2 m-5">
          <div className="flex gap-2 justify-center items-center">
            <CustomInput
              value={newTask}
              onChange={(value) => setNewTask(value)}
              placeholder={`Add task`}
            />
            <CustomButton
              icon="plus"
              variant="secondary"
              className="primary"
              size="small"
              onPress={addTask}
            />
          </div>
          {getTasksForDate(selectedDate).length > 0 && (
            <div className="mt-2 max-h-60 overflow-y-auto">
              <h4 className="font-medium mb-2 text-primary">
                Tasks for {selectedDate.toLocaleDateString()}:
              </h4>
              <ul className="space-y-1">
                {getTasksForDate(selectedDate).map((task, index) => (
                  <li key={task._id} className="flex items-center gap-2">
                    <span>{index + 1}.</span>
                    {isEditing === task._id ? (
                      <CustomInput
                        value={editText}
                        onChange={(value) => setEditText(value)}
                        placeholder={`Edit task`}
                      />
                    ) : (
                      <span
                        className={`transition-all duration-200 ${
                          task.completed
                            ? "text-gray-400 line-through opacity-50"
                            : ""
                        }`}
                      >
                        {task.title}
                      </span>
                    )}
                    {!isEditing && (
                      <>
                        <CustomButton
                          icon="done"
                          className="primary"
                          variant="secondary"
                          size="small"
                          onPress={() => finishTask(task._id)}
                        />
                        <CustomButton
                          icon="delete"
                          className="danger"
                          variant="secondary"
                          size="small"
                          onPress={() => deleteTask(task._id)}
                        />
                      </>
                    )}
                    {isEditing === task._id ? (
                      <CustomButton
                        icon="save"
                        className="warning"
                        variant="secondary"
                        size="small"
                        onPress={() => saveTask(task._id)}
                      />
                    ) : (
                      <CustomButton
                        icon="edit"
                        className="warning"
                        variant="secondary"
                        size="small"
                        onPress={() => editTask(task._id)}
                      />
                    )}
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
