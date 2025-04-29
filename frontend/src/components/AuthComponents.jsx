import { useState, useContext } from "react";
import {
  Eye,
  EyeOff,
  CheckCircle,
  Mail,
  Lock,
  User,
  AlertCircle,
} from "lucide-react";
import { useApi } from "../utils/api";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContextProvider.jsx";

export default function AuthComponents() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const api = useApi();
  const navigate = useNavigate();
  const { userLogin } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      if (isLogin) {
        // Login API call
        const response = await api.post("/api/user/login", {
          email,
          password,
        });

        console.log(response);

        userLogin(
          response.data.token, 
          response.data.userId
        );

        setSubmitted(true);

        // Reset after showing success message
        setTimeout(() => {
          setSubmitted(false);
          navigate("/home"); // Redirect to home page after login
        }, 2000);
      } else {
        // Register API call
        const response = await api.post("/api/user/register", {
          name,
          email,
          password,
        });

        setSubmitted(true);

        // Reset after showing success message
        setTimeout(() => {
          setSubmitted(false);
          setIsLogin(true); // Switch to login view after registration
        }, 2000);
      }
    } catch (error) {
      setError(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleView = () => {
    setIsLogin(!isLogin);
    setSubmitted(false);
    setError("");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-100 to-blue-100 p-4">
      <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-xl transition-all duration-300">
        {submitted ? (
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <CheckCircle className="mb-4 h-16 w-16 text-green-500" />
            <h2 className="mb-2 text-2xl font-bold text-gray-800">
              {isLogin ? "Login Successful!" : "Registration Complete!"}
            </h2>
            <p className="text-gray-600">
              {isLogin
                ? "Welcome back to your task manager."
                : "Your account has been created successfully."}
            </p>
          </div>
        ) : (
          <div className="p-8">
            <div className="mb-8 text-center">
              <h1 className="mb-2 text-3xl font-bold text-gray-800">
                {isLogin ? "Welcome Back" : "Create Account"}
              </h1>
              <p className="text-gray-600">
                {isLogin
                  ? "Sign in to manage your tasks"
                  : "Sign up to get started"}
              </p>
            </div>

            {error && (
              <div className="mb-4 flex items-center rounded-lg bg-red-50 p-4 text-sm text-red-800">
                <AlertCircle className="mr-2 h-5 w-5" />
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {!isLogin && (
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 pl-10 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                </div>
              )}

              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Email Address
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 pl-10 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="name@company.com"
                    required
                  />
                </div>
              </div>

              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 pl-10 pr-10 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-600 hover:text-gray-900"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {isLogin && (
                <div className="mb-6 flex items-center justify-end">
                  <a
                    href="#"
                    className="text-sm font-medium text-blue-600 hover:underline"
                  >
                    Forgot password?
                  </a>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 px-5 py-4 text-center text-base font-medium text-white hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:opacity-70"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    {isLogin ? "Signing in..." : "Creating account..."}
                  </div>
                ) : isLogin ? (
                  "Sign In"
                ) : (
                  "Create Account"
                )}
              </button>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  {isLogin
                    ? "Don't have an account?"
                    : "Already have an account?"}
                  <button
                    type="button"
                    onClick={toggleView}
                    className="ml-1 font-medium text-blue-600 hover:underline"
                  >
                    {isLogin ? "Sign up" : "Sign in"}
                  </button>
                </p>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
