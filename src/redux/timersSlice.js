import { createSlice } from '@reduxjs/toolkit';

// Load timers and history from localStorage
const loadTimers = () => {
  const saved = localStorage.getItem('timers');
  return saved ? JSON.parse(saved) : [];
};

const loadHistory = () => {
  const saved = localStorage.getItem('history');
  return saved ? JSON.parse(saved) : [];
};

const saveTimers = (timers) => {
  localStorage.setItem('timers', JSON.stringify(timers));
};

const saveHistory = (history) => {
  localStorage.setItem('history', JSON.stringify(history));
};

const timersSlice = createSlice({
  name: 'timers',
  initialState: {
    list: loadTimers(),
    history: loadHistory(),
  },
  reducers: {
    addTimer: (state, action) => {
      const newTimer = {
        ...action.payload,
        status: 'Paused',
        remaining: action.payload.duration,
        halfwayAlertTriggered: false,
      };
      state.list.push(newTimer);

      saveTimers(state.list);
    },

    updateTimer: (state, action) => {
      const { id, updates } = action.payload;
      const timer = state.list.find(t => t.id === id);
      if (timer) {
        const updatedTimer = {
          ...timer,
          ...updates,
        };

        // Only log status change to 'Completed'
        if (updates.status && updates.status === 'Completed' && updates.status !== timer.status) {
          const completedLog = {
            id: updatedTimer.id,
            name: updatedTimer.name,
            status: 'Completed',
            category: updatedTimer.category,
            completedAt: new Date().toISOString(),
          };
          state.history.push(completedLog);
        }

        state.list = state.list.map(t => (t.id === id ? updatedTimer : t));

        saveTimers(state.list);
        saveHistory(state.history);
      }
    },

    completeTimer: (state, action) => {
      const timer = state.list.find(t => t.id === action.payload);
      if (timer) {
        timer.status = 'Completed';
        const completedLog = {
          id: timer.id,
          name: timer.name,
          status: 'Completed',
          category: timer.category,
          completedAt: new Date().toISOString(),
        };
        state.history.push(completedLog);
        saveTimers(state.list);
        saveHistory(state.history);
      }
    },

    removeTimer: (state, action) => {
      const timerId = action.payload;
      state.list = state.list.filter(t => t.id !== timerId);

      saveTimers(state.list);
    },

    resetTimer: (state, action) => {
      const timer = state.list.find(t => t.id === action.payload);
      if (timer) {
        timer.remaining = timer.duration;
        timer.status = 'Paused';
        timer.halfwayAlertTriggered = false;

        saveTimers(state.list);
      }
    },

    triggerHalfwayAlert: (state, action) => {
      const timer = state.list.find(t => t.id === action.payload);
      if (timer && !timer.halfwayAlertTriggered && timer.remaining <= timer.duration / 2) {
        timer.halfwayAlertTriggered = true;

        saveTimers(state.list);
      }
    },

    clearHistory: (state) => {
      state.history = [];
      saveHistory(state.history);
    },
  },
});

export const {
  addTimer,
  updateTimer,
  completeTimer,
  removeTimer,
  resetTimer,
  triggerHalfwayAlert,
  clearHistory,
} = timersSlice.actions;

export default timersSlice.reducer;
