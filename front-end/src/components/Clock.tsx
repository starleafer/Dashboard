"use client";
import React, { useState, useEffect } from "react";
import Module from "./Module";

const Clock = () => {
  const [time, setTime] = useState(new Date());
  const [is24Hour, setIs24Hour] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    if (is24Hour) {
      return date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
    } else {
      return date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }).toLowerCase();
    }
  };

  return (
    <div className="flex items-center justify-center w-32">
      <button
        onClick={() => setIs24Hour(!is24Hour)}
        className="text-3xl font-medium hover:text-primary transition-colors"
      >
        {formatTime(time)}
      </button>
    </div>
  );
};

export default Clock; 