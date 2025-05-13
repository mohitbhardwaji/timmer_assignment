import React, { useState } from "react";
import { useDispatch } from "react-redux";
import TimerCard from "./TimerCard";
import { updateTimer } from "../redux/timersSlice";

const CategorySection = ({ category, timers }) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(true);

  const handleStartAll = () => {
    timers.forEach((timer) => {
      if (timer.status !== "Running") {
        dispatch(updateTimer({ id: timer.id, updates: { status: "Running" } }));
      }
    });
  };

  const handlePauseAll = () => {
    timers.forEach((timer) => {
      if (timer.status === "Running") {
        dispatch(updateTimer({ id: timer.id, updates: { status: "Paused" } }));
      }
    });
  };

  const handleResetAll = () => {
    timers.forEach((timer) => {
      dispatch(updateTimer({
        id: timer.id,
        updates: { remaining: timer.duration, status: "Paused" },
      }));
    });
  };

  return (
    <div className="mb-6 border border-gray-300 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-800 shadow-sm transition-colors duration-300">
      {/* Header */}
      <div
        className="flex justify-between items-center cursor-pointer mb-3"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
          {category}
        </h3>
        <span className="text-xl text-gray-700 dark:text-gray-300">
          {isOpen ? "▲" : "▼"}
        </span>
      </div>

      {/* Controls and Timers */}
      {isOpen && (
        <>
          <div className="flex flex-wrap gap-2 mb-4">
            <button
              onClick={handleStartAll}
              className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600 transition"
            >
              Start All
            </button>
            <button
              onClick={handlePauseAll}
              className="bg-yellow-500 text-white px-4 py-1 rounded hover:bg-yellow-600 transition"
            >
              Pause All
            </button>
            <button
              onClick={handleResetAll}
              className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition"
            >
              Reset All
            </button>
          </div>

          <hr className="mb-4 border-t border-gray-300 dark:border-gray-600" />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {timers.map((timer) => (
              <TimerCard key={timer.id} timer={timer} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CategorySection;
