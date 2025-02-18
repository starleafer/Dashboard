"use client";
import React, { useState, useEffect } from "react";
import Module from "./Module";
import { taskEvents } from './molecules/CustomCalendar';
import { useSession } from "next-auth/react";
import { calendarService } from "@/services/calendarService";

interface TodoTask {
  _id: string;
  title: string;
  date: string;
  completed: boolean;
}

const Todo = () => {
  const [tasks, setTasks] = useState<TodoTask[]>([]);
  const [today] = useState(new Date());
  const { data: session } = useSession();
  const userId = session?.user?.email;

  useEffect(() => {
    const fetchTasks = async () => {
      if (!userId) return;
      const tasks = await calendarService.fetchTasks(userId);
      setTasks(tasks.filter(task => !task.completed));
    };
    
    fetchTasks();

    const handleTasksUpdated = (event: CustomEvent<TodoTask[]>) => {
      const unfinishedTasks = event.detail
        .filter(task => !task.completed)
        .sort((a, b) => {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          return dateA.getTime() - dateB.getTime();
        });
      setTasks(unfinishedTasks);
    };

    taskEvents.target.addEventListener(
      taskEvents.TASKS_UPDATED, 
      handleTasksUpdated as EventListener
    );

    return () => {
      taskEvents.target.removeEventListener(
        taskEvents.TASKS_UPDATED, 
        handleTasksUpdated as EventListener
      );
    };
  }, [userId]);

  return (
    <Module>
      <div className="p-4  overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Tasks</h2>
        <div className="space-y-4">
          {tasks.map((task) => {
            const taskDate = new Date(task.date);
            taskDate.setHours(0, 0, 0, 0);
            const isPassed = taskDate < today;

            return (
              task.completed === false && (
                <div
                  key={task._id}
                  className={`flex items-center justify-between p-3 rounded-md ${
                    isPassed
                      ? "border-danger border-2 text-danger"
                      : "border-primary border-2 text-primary"
                  }`}
                >
                  <div className="flex w-full items-center justify-between">
                    <span className={isPassed ? "text-danger" : ""}>
                      {task.title}
                    </span>
                    <span
                      className={`text-sm ${
                        isPassed ? "text-danger" : "text-primary"
                      }`}
                    >
                      {new Date(task.date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex gap-2"></div>
                </div>
              )
            );
          })}
          {tasks.length === 0 && (
            <p className="text-gray-500 text-center">No pending tasks</p>
          )}
        </div>
      </div>
    </Module>
  );
};

export default Todo;
