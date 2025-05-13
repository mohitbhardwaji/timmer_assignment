# ⏱️ Multi-Timer Web App

A customizable and responsive multi-timer web application built with **React**, **Redux Toolkit**, **Tailwind CSS**, and **Material UI**. This app allows users to manage multiple timers, view timer history, and switch between dark and light modes.

---

## 🌟 Features

- ✅ Start, pause, resume, and reset individual timers
- ✅ Timers display real-time countdown and progress bar
- ✅ Timer completion triggers a modal popup and toast notification
- ✅ Timer history with filtering by category
- ✅ Export timer history to file (JSON or CSV)
- ✅ Dark mode and light mode UI support (based on system preferences)
- ✅ Fully responsive layout (works on mobile, tablet, and desktop)
- ✅ Clean and reusable component structure

---

## 💻 Tech Stack

| Tech | Usage |
|------|-------|
| [React](https://reactjs.org/) | Frontend JavaScript library |
| [Redux Toolkit](https://redux-toolkit.js.org/) | State management |
| [Tailwind CSS](https://tailwindcss.com/) | Utility-first CSS framework |
| [Material UI](https://mui.com/) | UI Components (for icons, buttons, etc.) |
| [React Toastify](https://fkhadra.github.io/react-toastify/) | Notifications |
| [React Router DOM](https://reactrouter.com/) | Routing |
| [FileSaver.js](https://github.com/eligrey/FileSaver.js) | File export utility |

---

## 🔍 Assumptions Made

⏱️ Timers are managed in Redux and not persisted to a backend.

🕘 History is stored in memory for the session (not saved in localStorage or a database).

🌙 Dark/light mode uses Tailwind’s dark: class based on prefers-color-scheme.

📁 Export history outputs a downloadable JSON or CSV file on the client.

⌛ All time values are tracked in seconds.

🏷️ Each timer can optionally belong to a category used for filtering history.

---

## 📦 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/mohitbhardwaji/timmer_assignment.git
cd multi-timer-app


#### Install Dependencies
npm install


#### Run the Development Server

npm run dev
#or
npm run start
# or
npm start






