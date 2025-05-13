import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateTimer, resetTimer, completeTimer } from '../redux/timersSlice';
import { toast } from 'react-toastify';

const TimerCard = ({ timer }) => {
  const dispatch = useDispatch();
  const [seconds, setSeconds] = useState(timer.remaining);
  const [halfwayShown, setHalfwayShown] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (timer.status === 'Running') {
      startTimer();
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [timer.status]);

  useEffect(() => {
    setSeconds(timer.remaining);
    setHalfwayShown(false);
  }, [timer.remaining]);

  const startTimer = () => {
    intervalRef.current = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          dispatch(completeTimer(timer.id));
          setShowModal(true);
          return 0;
        }

        const updated = prev - 1;

        if (!halfwayShown && updated === Math.floor(timer.duration / 2)) {
          toast.info(`"${timer.name}" is halfway done!`, {
            position: 'top-right',
            autoClose: 3000,
          });
          setHalfwayShown(true);
        }

        dispatch(updateTimer({ id: timer.id, updates: { remaining: updated } }));
        return updated;
      });
    }, 1000);
  };

  const handleStart = () => dispatch(updateTimer({ id: timer.id, updates: { status: 'Running' } }));
  const handlePause = () => dispatch(updateTimer({ id: timer.id, updates: { status: 'Paused' } }));
  const handleReset = () => {
    dispatch(resetTimer(timer.id));
    setHalfwayShown(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const percentage = timer.status === 'Completed' ? 0 : (seconds / timer.duration) * 100;

  return (
    <div className="bg-gray-300 dark:bg-gray-600 rounded-2xl shadow-md p-4 w-full max-w-md mx-auto my-4 transition-colors duration-300">
      <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
        {timer.name}
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
        Status: {timer.status}
      </p>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
        Remaining: {timer.status === 'Completed' ? '0s' : `${seconds}s`}
      </p>

      {/* Progress Bar */}
      <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-4">
        <div
          className="h-full bg-blue-500 transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={handleStart}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded-md text-sm transition"
        >
          Start
        </button>
        <button
          onClick={handlePause}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1 rounded-md text-sm transition"
        >
          Pause
        </button>
        <button
          onClick={handleReset}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-md text-sm transition"
        >
          Reset
        </button>
      </div>

      {/* Completion Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg max-w-sm w-full text-center transition-colors duration-300">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Timer Completed!
            </h2>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
              Your timer "<strong>{timer.name}</strong>" has completed!
            </p>
            <button
              onClick={handleCloseModal}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimerCard;
