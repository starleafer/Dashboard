"use client";
import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import Module from "@/components/Module";
import CustomButton from "@/components/atoms/CustomButton";
import CustomInput from "@/components/atoms/CustomInput";
import { calendarService, TodoTask } from "@/services/calendarService";

const CalendarPage = () => {
  const [tasks, setTasks] = useState<TodoTask[]>([]);
  const [isEditing, setIsEditing] = useState<string | false>(false);
  const [editText, setEditText] = useState("");
  const [today, setToday] = useState<Date>(new Date());
  const [editingTask, setEditingTask] = useState<TodoTask | null>(null);

  useEffect(() => {
    const normalizedToday = new Date(today);
    normalizedToday.setHours(0, 0, 0, 0);
    setToday(normalizedToday);
  }, []);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const data = await calendarService.fetchTasks();
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

  const handleDateClick = async (selected: any) => {
    const title = prompt("Enter a title for your event");
    if (!title) return;
    try {
      await calendarService.createTask(title, selected.dateStr);
      fetchTasks();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const deleteTask = async (taskId: string) => {
    if (!taskId) {
      console.error("No task ID provided");
      return;
    }

    try {
      await calendarService.deleteTask(taskId);
      fetchTasks();
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  const handleEventClick = (info: any) => {
    if (
      confirm(`Are you sure you want to delete the event ${info.event.title}?`)
    ) {
      deleteTask(info.event.id);
    }
  };

  const handleEventDrop = async (info: any) => {
    try {
      await calendarService.updateTask(info.event.id, {
        title: info.event.title,
        date: info.event.start.toISOString(),
        completed: false,
      });
      fetchTasks();
    } catch (error) {
      info.revert();
      console.error("Update error:", error);
    }
  };

  const editTask = (taskId: string) => {
    const task = tasks.find((t) => t._id === taskId);
    if (task) {
      setIsEditing(taskId);
      setEditingTask(task);
      setEditText(task.title || "");
    }
  };

  const saveTask = async (taskId: string) => {
    if (!editText.trim()) return;
    try {
      const currentTask = tasks.find((task) => task._id === taskId);
      if (!currentTask) return;

      await calendarService.updateTask(taskId, {
        title: editText,
        date: currentTask.date,
        completed: currentTask.completed,
      });
      fetchTasks();
      setIsEditing(false);
      setEditText("");
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const finishTask = async (taskId: string) => {
    try {
      const currentTask = tasks.find((task) => task._id === taskId);
      if (!currentTask) return;

      await calendarService.updateTask(taskId, {
        ...currentTask,
        completed: !currentTask.completed,
      });
      fetchTasks();
    } catch (error) {
      console.error("Error completing task:", error);
    }
  };

  const isDatePassed = (dateStr: string): boolean => {
    const date = new Date(dateStr);
    date.setHours(0, 0, 0, 0);
    return date < today;
  };

  const getOverdueTasks = () => {
    return tasks.filter((task) => !task.completed && isDatePassed(task.date));
  };

  const getUpcomingTasks = () => {
    return tasks.filter((task) => !task.completed && !isDatePassed(task.date));
  };

  const getCompletedTasks = () => {
    return tasks.filter((task) => task.completed);
  };

  const TaskItem = ({ task }: { task: TodoTask }) => (
    <li className="flex items-center flex-col gap-2">
      <div
        className={`flex items-center gap-2 w-full p-2 rounded-md mb-3 ${
          task.completed
            ? "bg-completed text-white"
            : isDatePassed(task.date)
            ? "bg-danger text-white"
            : "bg-primary text-dark-bg"
        }`}
      >
        <h3>
          {" "}
          {isEditing === task._id ? (
            <CustomInput
              key={task._id}
              value={editText}
              onChange={(value) => setEditText(value)}
              placeholder="Edit task"
            />
          ) : (
            <span
              className={`transition-all duration-200 ${
                task.completed ? "text-white" : ""
              }`}
            >
              <div className="flex flex-col  gap-2">
                <span className="text-md text-white">
                  <h3>{task.title}</h3>
                </span>
                <span className="text-xs w-full text-white ">
                  {new Date(task.date).toLocaleDateString()}
                </span>
              </div>
            </span>
          )}
        </h3>
        {!isEditing && (
          <div className="flex items-center gap-2 ml-auto">
            <CustomButton
              icon="done"
              variant="primary"
              size="small"
              onPress={() => finishTask(task._id)}
            />
            <CustomButton
              icon="delete"
              variant="primary"
              size="small"
              onPress={() => deleteTask(task._id)}
            />
          </div>
        )}
        {isEditing === task._id ? (
          <div className="flex items-center gap-2 ">
            <CustomButton
              icon="save"
              variant="primary"
              size="small"
              onPress={() => saveTask(task._id)}
            />
            <CustomButton
              icon="close"
              variant="primary"
              size="small"
              onPress={() => setIsEditing(false)}
            />
          </div>
        ) : (
          <CustomButton
            icon="edit"
            variant="primary"
            size="small"
            onPress={() => editTask(task._id)}
          />
        )}
      </div>
    </li>
  );

  return (
    <div className="flex w-full max-w-[1500px] h-[600px] md:h-[700px] lg:h-[800px] mt-4 mx-auto px-4 ">
      <div className="w-full">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          dateClick={handleDateClick}
          eventClick={handleEventClick}
          eventDrop={handleEventDrop}
          events={tasks.map((task) => ({
            id: task._id,
            title: task.title,
            start: new Date(task.date).toISOString(),
            allDay: true,
            extendedProps: { completed: task.completed },
            className: task.completed
              ? "bg-completed text-white border-none"
              : isDatePassed(task.date)
              ? "bg-danger text-white border-none"
              : "bg-primary text-dark-bg border-none",
          }))}
          height="100%"
        />
      </div>
      <Module noSpace className="ml-10 mt-16 p-5 h-[600px]">
        <div className="w-[250px] h-[500px] overflow-y-auto">
          {getOverdueTasks().length > 0 && (
            <>
              <h3 className="font-medium text-danger mb-4">Overdue Tasks</h3>
              <ul className="mb-6">
                {getOverdueTasks().map((task) => (
                  <TaskItem key={task._id} task={task} />
                ))}
              </ul>
            </>
          )}

          <h3 className="font-medium text-primary mb-4">Upcoming Tasks</h3>
          <ul className="mb-6">
            {getUpcomingTasks().map((task) => (
              <TaskItem key={task._id} task={task} />
            ))}
          </ul>

          {getCompletedTasks().length > 0 && (
            <>
              <h3 className="font-medium text-completed mb-4">
                Completed Tasks
              </h3>
              <ul>
                {getCompletedTasks().map((task) => (
                  <TaskItem key={task._id} task={task} />
                ))}
              </ul>
            </>
          )}
        </div>
      </Module>
    </div>
  );
};

export default CalendarPage;
