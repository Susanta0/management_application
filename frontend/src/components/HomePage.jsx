import React from "react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    // Clear the token from localStorage
    localStorage.removeItem("canva_token");
    // Redirect to login page
    navigate("/");
  };

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-purple-100 to-blue-100 p-6">
      <header className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Task Manager</h1>
        <button
          onClick={handleLogout}
          className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          Logout
        </button>
      </header>
      
      <main className="flex-1 rounded-xl bg-white p-6 shadow-lg">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-semibold text-gray-800">Welcome to Your Dashboard</h2>
          <p className="mt-2 text-gray-600">You've successfully logged in to the application.</p>
        </div>
        
        <div className="mt-8 rounded-lg bg-blue-50 p-4 text-center">
          <p className="text-gray-700">Your tasks and projects will appear here.</p>
        </div>
      </main>
    </div>
  );
}