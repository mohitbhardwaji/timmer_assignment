import React, { useState } from "react";
import { useSelector } from "react-redux";
import ExportHistoryButton from "../components/ExportHistory";
import Header from "../components/Header";

const History = () => {
  const history = useSelector((state) => state.timers.history);
  const [selectedCategory, setSelectedCategory] = useState("");

  // Get unique categories from history
  const categories = [...new Set(history.map((timer) => timer.category))];

  // Filter history by selected category
  const filteredHistory = selectedCategory
    ? history.filter((timer) => timer.category === selectedCategory)
    : history;

  return (
    <div className="min-h-screen bg-gray-200 dark:bg-gray-900 transition-colors duration-300">
      <Header />

      <main className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Timer History</h1>

        {/* Category Filter */}
        <div className="mb-6">
          <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
            Filter by Category:
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">All Categories</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Export History Button */}
        <div className="mb-6">
          <ExportHistoryButton />
        </div>

        {/* Render Filtered Timer History */}
        {filteredHistory.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-lg">No timer history available</p>
        ) : (
          <div className="space-y-6">
            {filteredHistory.map((timer, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-5 border border-gray-200 dark:border-gray-700 transition-colors duration-300"
              >
                <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-2">
                  {timer.name}
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-1">
                  <strong>Status:</strong> {timer.status}
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-1">
                  <strong>Category:</strong> {timer.category}
                </p>
                {timer.timestamp && (
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    <strong>Status changed at:</strong>{" "}
                    {new Date(timer.timestamp).toLocaleString()}
                  </p>
                )}
                {timer.completedAt && (
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    <strong>Completed At:</strong>{" "}
                    {new Date(timer.completedAt).toLocaleString()}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default History;
