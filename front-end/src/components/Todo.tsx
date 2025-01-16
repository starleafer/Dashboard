"use client";
import React, { useEffect, useState } from "react";
import Module from "./Module";
import CustomButton from "./atoms/CustomButton";
import CustomInput from "./atoms/CustomInput";

const Todo = () => {
  const [task, setTask] = useState<string>("");
  const [tasks, setTasks] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [editText, setEditText] = useState<string>("");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("http://localhost:5000/tasks");
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setTasks([]);
      }
    };
    fetchTasks();
  }, []);

  const addTask = async () => {
    if (task.trim()) {
      try {
        const response = await fetch("http://localhost:5000/tasks", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title: task }),
        });
        const newTask = await response.json();
        if (newTask) {
          setTasks((prevTasks) => [...prevTasks, newTask]);
          setTask("");
        }
      } catch (error) {
        console.error("Error creating task:", error);
      }
    }
  };

  const finishTask = (index: number) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].isFinished = !updatedTasks[index].isFinished;
    setTasks(updatedTasks);
  };

  const editTask = (index: number) => {
    setIsEditing(index);
    setEditText(tasks[index].title);
  };

  const saveTask = async (index: number) => {
    try {
      const response = await fetch(
        `http://localhost:5000/tasks/${tasks[index]._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title: editText }),
        }
      );

      const result = await response.json();
      const updatedTask = result.task;

      if (updatedTask) {
        setTasks((prevTasks) => {
          const updatedTasks = [...prevTasks];
          updatedTasks[index] = updatedTask;
          return updatedTasks;
        });

        setIsEditing(null);
        setEditText("");
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const deleteTask = async (index: number) => {
    try {
      const deletedTask = await fetch(
        `http://localhost:5000/tasks/${tasks[index]._id}`,
        {
          method: "DELETE",
        }
      ).then((res) => res.json());
      if (deletedTask) {
        setTasks(tasks.filter((_, i) => i !== index));
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const renderTasks = () => {
    return tasks.map((task, index) => (
      <div
        key={task._id || `temp-${index}`}
        className="flex flex-col justify-between items-start gap-2 mb-4"
      >
        <div className="flex items-center gap-2 w-full">
          <span className="text-md">{index + 1}.</span>
          <span
            className={`text-md break-words text-xl flex-1 ${
              task.isFinished ? "line-through text-primary text-opacity-40" : ""
            }`}
          >
            {task.title}
          </span>
          {/* <span className="ml-3 text-gray-700 text-xs">
            {task.date.slice(0, 10)}
          </span> */}
        </div>
        <div className="flex flex-wrap gap-2 md:gap-3">
          <CustomButton
            icon="done"
            className="primary"
            variant="secondary"
            size="small"
            onPress={() => finishTask(index)}
          />
          {isEditing === index ? (
            <CustomButton
              icon="save"
              className="warning"
              variant="secondary"
              size="small"
              onPress={() => saveTask(index)}
            />
          ) : (
            <CustomButton
              icon="edit"
              className="warning"
              variant="secondary"
              size="small"
              onPress={() => editTask(index)}
            />
          )}
          <CustomButton
            icon="close"
            className="danger"
            variant="secondary"
            size="small"
            onPress={() => deleteTask(index)}
          />
        </div>
      </div>
    ));
  };

  return (
    <Module>
      <div className="w-full p-4">
        <h1 className="text-xl md:text-2xl mb-3 font-bold">Todo</h1>
        <div className="flex flex-wrap items-center gap-3 mb-6 w-full">
          <CustomInput
            value={task}
            hasWidth={true}
            onChange={(value: string) => setTask(value)}
          />
          <CustomButton
            icon="plus"
            variant="secondary"
            size="small"
            onPress={addTask}
          />
        </div>

        <div className="flex flex-col gap-4">{renderTasks()}</div>
      </div>
    </Module>
  );
};

export default Todo;
