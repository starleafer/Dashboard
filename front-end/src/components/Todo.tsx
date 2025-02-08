"use client";
import React, { useState, useEffect } from "react";
import Module from "./Module";

interface TodoTask {
  _id: string;
  title: string;
  date: string;
  completed: boolean;
}

const Todo = () => {
  const [tasks, setTasks] = useState<TodoTask[]>([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch("http://localhost:5000/calendar-tasks");
      const data = await response.json();

      const unfinishedTasks = data
        .filter((task: TodoTask) => !task.completed)
        .sort((a: TodoTask, b: TodoTask) => {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          return dateA.getTime() - dateB.getTime();
        });

      setTasks(unfinishedTasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  return (
    <Module>
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4">Todo Tasks</h2>
        <div className="space-y-4">
          {tasks.map(
            (task) =>
              task.completed === false && (
                <div
                  key={task._id}
                  className="flex items-center justify-between p-3 rounded-lg border"
                >
                  <div className="flex flex-col">
                    <span>{task.title}</span>
                    <span className="text-sm text-gray-500">
                      {new Date(task.date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex gap-2"></div>
                </div>
              )
          )}
          {tasks.length === 0 && (
            <p className="text-gray-500 text-center">No pending tasks</p>
          )}
        </div>
      </div>
    </Module>
  );
};

export default Todo;
