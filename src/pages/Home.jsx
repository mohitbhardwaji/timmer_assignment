import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Header from "../components/Header";
import CategorySection from "../components/CategorySection";
import { addTimer, updateTimer, completeTimer } from '../redux/timersSlice';
import { v4 as uuidv4 } from "uuid";

const Home = () => {
  const dispatch = useDispatch();
  const timers = useSelector((state) => state.timers.list);
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      timers.forEach(timer => {
        if (timer.status === "Running" && timer.remaining > 0) {
          const newRemaining = timer.remaining - 1;
          dispatch(updateTimer({
            id: timer.id,
            updates: { remaining: newRemaining }
          }));

          if (newRemaining === 0) {
            dispatch(completeTimer(timer.id));
          }
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timers, dispatch]);

  const handleAddTimer = () => {
    if (!name || !duration || !category) return;
    dispatch(
      addTimer({
        id: uuidv4(),
        name,
        duration: parseInt(duration),
        remaining: parseInt(duration),
        category,
        status: "Paused",
      })
    );
    setName("");
    setDuration("");
    setCategory("");
  };

  const groupedTimers = timers.reduce((acc, timer) => {
    if (!acc[timer.category]) acc[timer.category] = [];
    acc[timer.category].push(timer);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gray-200 text-gray-800 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Header />

      <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 mt-4 rounded-xl p-4 shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Add Timer</h2>
        <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
          <input
            type="text"
            placeholder="Timer Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full md:w-1/4 px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="number"
            placeholder="Duration (sec)"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-full md:w-1/4 px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full md:w-1/4 px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select Category</option>
            <option value="Workout">Workout</option>
            <option value="Study">Study</option>
            <option value="Break">Break</option>
          </select>
          <button
            onClick={handleAddTimer}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Add
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4">
        {Object.entries(groupedTimers).map(([cat, timers]) => (
          <CategorySection key={cat} category={cat} timers={timers} />
        ))}
      </div>
    </div>
  );
};

export default Home;
