import { useState, useEffect } from "react";
import {
  Plus,
  Search,
  Calendar,
  Check,
  Trash2,
  Filter,
  Clock,
  CheckCircle,
  X,
} from "lucide-react";

export default function TaskDashboard() {
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [filter, setFilter] = useState("all");
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Sample initial tasks data
  useEffect(() => {
    const initialTasks = [
      {
        id: 1,
        title: "Complete project proposal",
        description: "Finalize the Q3 project proposal document",
        completed: false,
        createdAt: new Date(2025, 3, 25),
      },
      {
        id: 2,
        title: "Weekly team meeting",
        description: "Review sprint progress and discuss blockers",
        completed: true,
        createdAt: new Date(2025, 3, 24),
      },
      {
        id: 3,
        title: "Update portfolio website",
        description: "Add recent projects and refresh design",
        completed: false,
        createdAt: new Date(2025, 3, 23),
      },
      {
        id: 4,
        title: "Research new technologies",
        description: "Look into potential tools for next project",
        completed: false,
        createdAt: new Date(2025, 3, 22),
      },
    ];
    setTasks(initialTasks);
  }, []);

  const addTask = (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const newTask = {
      id: Date.now(),
      title: newTaskTitle,
      description: newTaskDescription,
      completed: false,
      createdAt: new Date(),
    };

    setTasks([newTask, ...tasks]);
    setNewTaskTitle("");
    setNewTaskDescription("");
    setIsAddingTask(false);
  };

  const toggleCompletion = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const filteredTasks = tasks.filter((task) => {
    // Apply status filter
    if (filter === "active" && task.completed) return false;
    if (filter === "completed" && !task.completed) return false;

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        task.title.toLowerCase().includes(query) ||
        task.description.toLowerCase().includes(query)
      );
    }

    return true;
  });

  const formatDate = (date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
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
        {/* Filters and Search */}
        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="col-span-1 md:col-span-2">
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full rounded-lg border border-gray-300 bg-white p-2.5 pl-10 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="col-span-1">
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Filter className="h-5 w-5 text-gray-400" />
              </div>
              <select
                className="block w-full rounded-lg border border-gray-300 bg-white p-2.5 pl-10 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="all">All Tasks</option>
                <option value="active">Active Tasks</option>
                <option value="completed">Completed Tasks</option>
              </select>
            </div>
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
                  htmlFor="taskTitle"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Task Title
                </label>
                <input
                  id="taskTitle"
                  type="text"
                  className="block w-full rounded-lg border border-gray-300 p-2.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="What needs to be done?"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="taskDescription"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Description (Optional)
                </label>
                <textarea
                  id="taskDescription"
                  rows="3"
                  className="block w-full rounded-lg border border-gray-300 p-2.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Add details about this task..."
                  value={newTaskDescription}
                  onChange={(e) => setNewTaskDescription(e.target.value)}
                ></textarea>
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
          {filteredTasks.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-white p-8 text-center">
              <div className="mb-4 rounded-full bg-blue-50 p-3">
                <CheckCircle className="h-8 w-8 text-blue-500" />
              </div>
              <h3 className="mb-1 text-lg font-medium text-gray-800">
                No tasks found
              </h3>
              <p className="text-gray-600">
                {searchQuery
                  ? "Try a different search term"
                  : filter !== "all"
                  ? `No ${filter} tasks available`
                  : "Add your first task to get started"}
              </p>
            </div>
          ) : (
            filteredTasks.map((task) => (
              <div
                key={task.id}
                className={`rounded-lg bg-white p-4 shadow-md transition-all ${
                  task.completed
                    ? "border-l-4 border-green-500"
                    : "border-l-4 border-blue-500"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex flex-1 items-start">
                    <button
                      onClick={() => toggleCompletion(task.id)}
                      className={`mr-3 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border ${
                        task.completed
                          ? "border-green-500 bg-green-500 text-white"
                          : "border-gray-300 bg-white text-transparent hover:border-blue-500"
                      }`}
                    >
                      {task.completed && <Check className="h-4 w-4" />}
                    </button>
                    <div className="flex-1">
                      <h3
                        className={`mb-1 text-lg font-medium ${
                          task.completed
                            ? "text-gray-500 line-through"
                            : "text-gray-800"
                        }`}
                      >
                        {task.title}
                      </h3>
                      {task.description && (
                        <p
                          className={`mb-2 text-sm ${
                            task.completed ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          {task.description}
                        </p>
                      )}
                      <div className="flex items-center text-xs text-gray-500">
                        <Calendar className="mr-1 h-3 w-3" />
                        <span>Created {formatDate(task.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => deleteTask(task.id)}
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
                {tasks.filter((t) => !t.completed).length} tasks remaining
              </span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
              <span className="text-sm text-gray-600">
                {tasks.filter((t) => t.completed).length} tasks completed
              </span>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
