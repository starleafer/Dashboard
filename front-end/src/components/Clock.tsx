"use client";
import React, { useState, useEffect } from "react";

const Clock = () => {
  const [time, setTime] = useState<Date | null>(null);
  const [is24Hour, setIs24Hour] = useState(false);

  useEffect(() => {
    setTime(new Date());
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!time) return null;

  const formatTime = (date: Date) => {
    if (is24Hour) {
      return date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
    } else {
      return date
        .toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })
        .toLowerCase();
    }
  };

  return (
    <div className="flex items-center justify-center w-32">
      <button
        onClick={() => setIs24Hour(!is24Hour)}
        className="text-3xl font-medium whitespace-nowrap hover:text-primary transition-colors text-shade dark:text-dark-text"
      >
        {formatTime(time)}
      </button>
    </div>
  );
};

export default Clock;
