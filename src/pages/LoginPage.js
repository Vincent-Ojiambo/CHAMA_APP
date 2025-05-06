

import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";

const LoginPage = ({ onGoToRegister, logoUrl = "/logo512.png" }) => {
  const [formData, setFormData] = useState({
    emailOrPhone: "",
    password: "",
  });
  const [errors, setErrors] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value.trim(),
    }));
    setErrors(errors.filter((error) => error.field !== name));
  };

  const validateForm = () => {
    const newErrors = [];

    if (!formData.emailOrPhone.trim()) {
      newErrors.push({
        message: "Email or phone is required",
        field: "emailOrPhone",
      });
    } else if (
      !formData.emailOrPhone.includes("@") &&
      !/^[0-9]{10,15}$/.test(formData.emailOrPhone)
    ) {
      newErrors.push({
        message: "Please enter a valid email or 10-15 digit phone number",
        field: "emailOrPhone",
      });
    }

    if (!formData.password.trim()) {
      newErrors.push({
        message: "Password is required",
        field: "password",
      });
    } else if (formData.password.length < 8) {
      newErrors.push({
        message: "Password must be at least 8 characters",
        field: "password",
      });
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setErrors([]);

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          emailOrPhone: formData.emailOrPhone,
          password: formData.password,
        }),
      });

      // First check if response is JSON
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const errorText = await response.text();
        console.error("Non-JSON response:", errorText);
        throw new Error(
          errorText.includes("<!DOCTYPE html>")
            ? "Server is currently unavailable. Please try again later."
            : `Server responded with: ${errorText.substring(0, 100)}`
        );
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error?.message ||
            data?.message ||
            `Login failed with status ${response.status}`
        );
      }

      if (!data.success) {
        throw new Error(data.message || "Login unsuccessful");
      }

      login(data.token, data.user);
      navigate("/dashboard", { replace: true });
    } catch (error) {
      console.error("Login error:", error);
      setErrors([
        {
          message:
            error.message ||
            "Could not connect to the server. Please check your network and try again.",
        },
      ]);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getError = (field) => {
    return errors.find((e) => e.field === field)?.message;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-xl rounded-lg px-8 pt-10 pb-8 mb-4">
          <div className="flex flex-col items-center mb-8">
            <img
              src={logoUrl}
              alt="App Logo"
              className="rounded-full h-20 w-20 mb-4 object-cover shadow-sm"
            />
            <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
            <p className="text-gray-500 mt-2">Sign in to access your account</p>
          </div>

          {errors.some((e) => !e.field) && (
            <div className="mb-6 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 rounded">
              <p className="font-medium">
                {errors.find((e) => !e.field)?.message}
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                className="block text-gray-700 text-sm font-medium mb-1"
                htmlFor="emailOrPhone"
              >
                Email or Phone
              </label>
              <input
                className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 ${
                  getError("emailOrPhone")
                    ? "border-red-500 focus:ring-red-200"
                    : "border-gray-300 focus:ring-blue-200"
                }`}
                id="emailOrPhone"
                type="text"
                placeholder="you@example.com or 0712345678"
                name="emailOrPhone"
                value={formData.emailOrPhone}
                onChange={handleChange}
                disabled={isSubmitting}
                autoComplete="username"
              />
              {getError("emailOrPhone") && (
                <p className="mt-1 text-sm text-red-600">
                  {getError("emailOrPhone")}
                </p>
              )}
            </div>

            <div>
              <label
                className="block text-gray-700 text-sm font-medium mb-1"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 ${
                  getError("password")
                    ? "border-red-500 focus:ring-red-200"
                    : "border-gray-300 focus:ring-blue-200"
                }`}
                id="password"
                type="password"
                placeholder="••••••••"
                name="password"
                value={formData.password}
                onChange={handleChange}
                disabled={isSubmitting}
                autoComplete="current-password"
              />
              {getError("password") && (
                <p className="mt-1 text-sm text-red-600">
                  {getError("password")}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Remember me
                </label>
              </div>

              <a
                href="/forgot-password"
                className="text-sm text-blue-600 hover:text-blue-500"
              >
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className={`w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors ${
                isSubmitting ? "opacity-75 cursor-not-allowed" : ""
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <LoadingSpinner button className="mr-2" />
                  Signing in...
                </span>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={onGoToRegister}
              className="text-blue-600 hover:text-blue-500 font-medium"
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
