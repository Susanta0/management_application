import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import TaskDashboard from "../components/TaskDashboard";
import { AuthContext } from "../context/AuthContextProvider";

export default function HomePage() {
  const navigate = useNavigate();
  const { userLogout } = useContext(AuthContext);

  const handleLogout = () => {
    // Clear the token from localStorage
    userLogout();
    // Redirect to login page
    navigate("/");
  };

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-purple-100 to-blue-100 p-6 pt-24">
      <header className="fixed top-0 left-0 right-0 z-10 flex items-center justify-between p-6 backdrop-blur-md bg-white/70">
        <h1 className="text-3xl font-bold text-gray-800">Task Manager</h1>
        <button
          onClick={handleLogout}
          className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          Logout
        </button>
      </header>

      <main className="flex-1 rounded-xl bg-white p-6 shadow-lg">
        <TaskDashboard />
      </main>
    </div>
  );
}
