import { useState, useEffect } from "react";
import {
  Plus,
  Calendar,
  Check,
  Trash2,
  Filter,
  Clock,
  CheckCircle,
  X,
  AlertCircle,
  Flag,
} from "lucide-react";
import { useApi } from "../utils/api";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContextProvider.jsx";

export default function TaskDashboard() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    status: "incomplete",
    priority: "Medium",
  });
  const [filter, setFilter] = useState("all");
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const api = useApi();
  //   const { userId } = useContext(AuthContext);
  const userId = localStorage.getItem("userId");
  // Fetch tasks from API
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setIsLoading(true);
        setError("");
        const response = await api.get("/api/task/get_tasks");
        setTasks(response.data?.tasks || []);
      } catch (err) {
        console.error("Error fetching tasks:", err);
        setError("Failed to load tasks. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, [api]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prev) => ({ ...prev, [name]: value }));
  };

  const addTask = async (e) => {
    e.preventDefault();

    try {
      // Log the payload for debugging
      console.log("Sending task data:", newTask);
      const taskToAdd = {
        ...newTask,
        userId: userId, // Ensure userId is included if required by your API
      };
      const response = await api.post("/api/task/create_task", taskToAdd);
      console.log("API response:", response);

      if (response.data && response.data.task) {
        // Add the new task to the state
        setTasks((prevTasks) => [response.data.task, ...prevTasks]);

        // Reset form
        setNewTask({
          title: "",
          description: "",
          priority: "medium",
          status: "incomplete",
        });
        setIsAddingTask(false);
      } else {
        // Handle case where response is successful but doesn't contain expected data
        console.error("Invalid response format:", response.data);
        alert("Unexpected API response. Please try again.");
      }
    } catch (err) {
      console.error("Error creating task:", err);
      // More detailed error message
      const errorMessage =
        err.response?.data?.message ||
        "Failed to create task. Please try again.";
      alert(errorMessage);
    }
  };

  const toggleTaskStatus = async (taskId) => {
    try {
      const task = tasks.find((t) => t._id === taskId);
      if (!task) return;

      const newStatus = task.status === "complete" ? "incomplete" : "complete";

      const response = await api.put(`/api/task/${taskId}/update_task`, {
        status: newStatus,
      });

      if (response.data && response.data.task) {
        setTasks(
          tasks.map((t) => (t._id === taskId ? { ...t, status: newStatus } : t))
        );
      }
    } catch (err) {
      console.error("Error updating task:", err);
      alert("Failed to update task status. Please try again.");
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await api.delete(`/api/task/${taskId}/delete_task`);
      setTasks(tasks.filter((task) => task._id !== taskId));
    } catch (err) {
      console.error("Error deleting task:", err);
      alert("Failed to delete task. Please try again.");
    }
  };

  const filteredTasks = tasks.filter((task) => {
    // Apply status filter only
    if (filter === "incomplete" && task.status === "complete") return false;
    if (filter === "complete" && task.status === "incomplete") return false;
    return true;
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case "High":
        return "text-red-500";
      case "Medium":
        return "text-amber-500";
      case "Low":
        return "text-green-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <h1 className="text-2xl font-bold text-gray-800">My Tasks</h1>
              <p className="text-gray-600">Manage your daily activities</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setIsAddingTask(true)}
                className="flex items-center rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-2 text-white hover:from-blue-600 hover:to-purple-700"
              >
                <Plus className="mr-2 h-5 w-5" />
                <span>Add Task</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Filter Only */}
        <div className="mb-6">
          <div className="relative max-w-xs">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Filter className="h-5 w-5 text-gray-400" />
            </div>
            <select
              className="block w-full rounded-lg border border-gray-300 bg-white p-2.5 pl-10 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All Tasks</option>
              <option value="incomplete">Active Tasks</option>
              <option value="complete">Completed Tasks</option>
            </select>
          </div>
        </div>

        {/* Add Task Form */}
        {isAddingTask && (
          <div className="mb-6 rounded-lg border border-gray-200 bg-white p-6 shadow-md">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-800">
                Add New Task
              </h2>
              <button
                onClick={() => setIsAddingTask(false)}
                className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={addTask}>
              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Task Title
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  className="block w-full rounded-lg border border-gray-300 p-2.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="What needs to be done?"
                  value={newTask.title}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows="3"
                  className="block w-full rounded-lg border border-gray-300 p-2.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Add details about this task..."
                  value={newTask.description}
                  onChange={handleInputChange}
                ></textarea>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label
                    htmlFor="priority"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Priority
                  </label>
                  <select
                    id="priority"
                    name="priority"
                    className="block w-full rounded-lg border border-gray-300 p-2.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                    value={newTask.priority}
                    onChange={handleInputChange}
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="status"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Status
                  </label>
                  <select
                    id="status"
                    name="status"
                    className="block w-full rounded-lg border border-gray-300 p-2.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                    value={newTask.status}
                    onChange={handleInputChange}
                  >
                    <option value="incomplete">Incomplete</option>
                    <option value="complete">Complete</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddingTask(false)}
                  className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-2 text-white hover:from-blue-600 hover:to-purple-700"
                >
                  Add Task
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Tasks List */}
        <div className="space-y-4">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center rounded-lg border border-gray-300 bg-white p-8 text-center">
              <div className="mb-4 animate-pulse rounded-full bg-blue-50 p-3">
                <Clock className="h-8 w-8 text-blue-500" />
              </div>
              <h3 className="mb-1 text-lg font-medium text-gray-800">
                Loading tasks...
              </h3>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center rounded-lg border border-red-200 bg-red-50 p-8 text-center">
              <div className="mb-4 rounded-full bg-red-100 p-3">
                <AlertCircle className="h-8 w-8 text-red-500" />
              </div>
              <h3 className="mb-1 text-lg font-medium text-gray-800">Error</h3>
              <p className="text-gray-600">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 rounded-lg bg-red-100 px-4 py-2 text-red-700 hover:bg-red-200"
              >
                Try Again
              </button>
            </div>
          ) : filteredTasks.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-white p-8 text-center">
              <div className="mb-4 rounded-full bg-blue-50 p-3">
                <CheckCircle className="h-8 w-8 text-blue-500" />
              </div>
              <h3 className="mb-1 text-lg font-medium text-gray-800">
                No tasks found
              </h3>
              <p className="text-gray-600">
                {filter !== "all"
                  ? `No ${filter} tasks available`
                  : "Add your first task to get started"}
              </p>
            </div>
          ) : (
            filteredTasks.map((task) => (
              <div
                key={task._id}
                className={`rounded-lg bg-white p-4 shadow-md transition-all ${
                  task.status === "complete"
                    ? "border-l-4 border-green-500"
                    : "border-l-4 border-blue-500"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex flex-1 items-start">
                    <button
                      onClick={() => toggleTaskStatus(task._id)}
                      className={`mr-3 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border ${
                        task.status === "complete"
                          ? "border-green-500 bg-green-500 text-white"
                          : "border-gray-300 bg-white text-transparent hover:border-blue-500"
                      }`}
                    >
                      {task.status === "complete" && (
                        <Check className="h-4 w-4" />
                      )}
                    </button>
                    <div className="flex-1">
                      <div className="flex items-center mb-1">
                        <h3
                          className={`text-lg font-medium ${
                            task.status === "complete"
                              ? "text-gray-500 line-through"
                              : "text-gray-800"
                          }`}
                        >
                          {task.title}
                        </h3>
                        <div className="ml-2 flex items-center">
                          <Flag
                            className={`h-4 w-4 ${getPriorityColor(
                              task.priority
                            )}`}
                          />
                          <span
                            className={`ml-1 text-xs ${getPriorityColor(
                              task.priority
                            )}`}
                          >
                            {task.priority.charAt(0).toUpperCase() +
                              task.priority.slice(1)}
                          </span>
                        </div>
                      </div>
                      {task.description && (
                        <p
                          className={`mb-2 text-sm ${
                            task.status === "complete"
                              ? "text-gray-400"
                              : "text-gray-600"
                          }`}
                        >
                          {task.description}
                        </p>
                      )}
                      <div className="flex items-center text-xs text-gray-500">
                        <Calendar className="mr-1 h-3 w-3" />
                        <span>
                          Created{" "}
                          {formatDate(task.creationDate || task.creataionDate)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => deleteTask(task._id)}
                    className="ml-2 rounded-full p-1 text-gray-400 hover:bg-red-50 hover:text-red-500"
                    aria-label="Delete task"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Task Stats */}
        {tasks.length > 0 && (
          <div className="mt-6 flex flex-col justify-between rounded-lg bg-white p-4 shadow-sm sm:flex-row">
            <div className="mb-2 flex items-center sm:mb-0">
              <Clock className="mr-2 h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-600">
                {tasks.filter((t) => t.status !== "complete").length} tasks
                remaining
              </span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
              <span className="text-sm text-gray-600">
                {tasks.filter((t) => t.status === "complete").length} tasks
                completed
              </span>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
