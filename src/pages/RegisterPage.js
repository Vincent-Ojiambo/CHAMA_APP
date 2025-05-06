import React, { useState, useEffect, useMemo } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";

const RegisterPage = ({ onBackToLogin }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [csrfToken, setCsrfToken] = useState("");
  const [isEmailAvailable, setIsEmailAvailable] = useState(true);
  const { register } = useAuth();
  const navigate = useNavigate();

  // Fetch CSRF token on mount
  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const response = await fetch("/api/csrf-token");
        const data = await response.json();
        setCsrfToken(data.token);
      } catch (error) {
        console.error("Failed to fetch CSRF token:", error);
      }
    };
    fetchCsrfToken();
  }, []);

  // Debounced email availability check
  useEffect(() => {
    const checkEmailAvailability = async (email) => {
      try {
        const response = await fetch(
          `/api/auth/check-email?email=${encodeURIComponent(email)}`
        );
        const data = await response.json();
        setIsEmailAvailable(data.available);
        if (!data.available) {
          setErrors((prev) => [
            ...prev.filter((e) => e.field !== "email"),
            {
              message: "Email is already registered",
              field: "email",
            },
          ]);
        }
      } catch (error) {
        console.error("Email check failed:", error);
      }
    };

    const timer = setTimeout(() => {
      if (
        formData.email &&
        !getError("email") &&
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
      ) {
        checkEmailAvailability(formData.email);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [formData.email]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value.trim(),
    }));
    // Clear error when user types
    setErrors(errors.filter((error) => error.field !== name));
    if (name === "email") setIsEmailAvailable(true);
  };

  const validateForm = () => {
    const newErrors = [];
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!formData.name.trim()) {
      newErrors.push({ message: "Full name is required", field: "name" });
    }

    if (!formData.email.trim()) {
      newErrors.push({ message: "Email is required", field: "email" });
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.push({ message: "Invalid email format", field: "email" });
    } else if (!isEmailAvailable) {
      newErrors.push({
        message: "Email is already registered",
        field: "email",
      });
    }

    if (formData.phone) {
      const phoneNumber = parsePhoneNumberFromString(formData.phone);
      if (!phoneNumber?.isValid()) {
        newErrors.push({ message: "Invalid phone number", field: "phone" });
      }
    }

    if (!formData.password) {
      newErrors.push({ message: "Password is required", field: "password" });
    } else if (!passwordRegex.test(formData.password)) {
      newErrors.push({
        message:
          "Password must contain 8+ chars with uppercase, lowercase, number, and special character",
        field: "password",
      });
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.push({
        message: "Passwords do not match",
        field: "confirmPassword",
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
      const response = await fetch("https://chamaplus-backend.onrender.com/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrfToken,
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email.toLowerCase(),
          phone: formData.phone || undefined,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw data;
      }

      if (data.success) {
        setShowSuccess(true);
        setTimeout(() => {
          register(data.token, data.user);
          navigate("/dashboard");
        }, 1500);
      }
    } catch (error) {
      let errorMessage = "Registration failed. Please try again.";

      if (error.error) {
        errorMessage = error.error;
      } else if (error.errors) {
        setErrors(
          error.errors.map((err) => ({
            message: err.msg,
            field: err.param,
          }))
        );
        return;
      } else if (error.message) {
        errorMessage = error.message;
      }

      setErrors([{ message: errorMessage }]);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getError = (field) => {
    return errors.find((e) => e.field === field)?.message;
  };

  // Memoized errors for better performance
  const nameError = useMemo(() => getError("name"), [errors]);
  const emailError = useMemo(() => getError("email"), [errors]);
  const phoneError = useMemo(() => getError("phone"), [errors]);
  const passwordError = useMemo(() => getError("password"), [errors]);
  const confirmPasswordError = useMemo(
    () => getError("confirmPassword"),
    [errors]
  );

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md flex items-center justify-center">
        <div className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 w-full">
          <div className="flex flex-col items-center mb-6">
            <img
              src="/logo512.png"
              alt="ChamaPlus Logo"
              className="rounded-full h-16 w-16 mb-4 object-cover"
            />
            <h2 className="text-2xl font-bold text-gray-800">Create Account</h2>
            <p className="text-gray-600 mt-1 text-center">
              Join our community today
            </p>
          </div>

          {showSuccess && (
            <div className="mb-4 p-3 bg-green-50 border-l-4 border-green-500 text-green-700 rounded">
              <p className="font-medium">
                Registration successful! Redirecting...
              </p>
            </div>
          )}

          {errors.some((e) => !e.field) && (
            <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 rounded">
              <p className="font-medium">
                {errors.find((e) => !e.field)?.message}
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                className="block text-gray-700 text-sm font-medium mb-2"
                htmlFor="name"
              >
                Full Name
              </label>
              <input
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                  nameError
                    ? "border-red-500 focus:ring-red-200"
                    : "border-gray-300 focus:ring-blue-200"
                }`}
                id="name"
                type="text"
                placeholder="Your full name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={isSubmitting}
                autoComplete="name"
                aria-invalid={!!nameError}
                aria-describedby={nameError ? "name-error" : undefined}
              />
              {nameError && (
                <p id="name-error" className="mt-1 text-sm text-red-600">
                  {nameError}
                </p>
              )}
            </div>

            <div>
              <label
                className="block text-gray-700 text-sm font-medium mb-2"
                htmlFor="email"
              >
                Email Address
              </label>
              <input
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                  emailError
                    ? "border-red-500 focus:ring-red-200"
                    : "border-gray-300 focus:ring-blue-200"
                }`}
                id="email"
                type="email"
                placeholder="your@email.com"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={isSubmitting}
                autoComplete="email"
                aria-invalid={!!emailError}
                aria-describedby={emailError ? "email-error" : undefined}
              />
              {emailError && (
                <p id="email-error" className="mt-1 text-sm text-red-600">
                  {emailError}
                </p>
              )}
            </div>

            <div>
              <label
                className="block text-gray-700 text-sm font-medium mb-2"
                htmlFor="phone"
              >
                Phone Number (Optional)
              </label>
              <input
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                  phoneError
                    ? "border-red-500 focus:ring-red-200"
                    : "border-gray-300 focus:ring-blue-200"
                }`}
                id="phone"
                type="tel"
                placeholder="0712345678"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                disabled={isSubmitting}
                autoComplete="tel"
                aria-invalid={!!phoneError}
                aria-describedby={phoneError ? "phone-error" : undefined}
              />
              {phoneError && (
                <p id="phone-error" className="mt-1 text-sm text-red-600">
                  {phoneError}
                </p>
              )}
            </div>

            <div>
              <label
                className="block text-gray-700 text-sm font-medium mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative">
                <input
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                    passwordError
                      ? "border-red-500 focus:ring-red-200"
                      : "border-gray-300 focus:ring-blue-200"
                  }`}
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  autoComplete="new-password"
                  aria-invalid={!!passwordError}
                  aria-describedby={
                    passwordError ? "password-error" : undefined
                  }
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOffIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
              {passwordError && (
                <p id="password-error" className="mt-1 text-sm text-red-600">
                  {passwordError}
                </p>
              )}
              <p className="mt-1 text-xs text-gray-500">
                Must be 8+ characters with uppercase, lowercase, number, and
                special character
              </p>
            </div>

            <div>
              <label
                className="block text-gray-700 text-sm font-medium mb-2"
                htmlFor="confirmPassword"
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                    confirmPasswordError
                      ? "border-red-500 focus:ring-red-200"
                      : "border-gray-300 focus:ring-blue-200"
                  }`}
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  autoComplete="new-password"
                  aria-invalid={!!confirmPasswordError}
                  aria-describedby={
                    confirmPasswordError ? "confirm-password-error" : undefined
                  }
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={
                    showConfirmPassword ? "Hide password" : "Show password"
                  }
                >
                  {showConfirmPassword ? (
                    <EyeOffIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
              {confirmPasswordError && (
                <p
                  id="confirm-password-error"
                  className="mt-1 text-sm text-red-600"
                >
                  {confirmPasswordError}
                </p>
              )}
            </div>

            <button
              type="submit"
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                isSubmitting ? "opacity-70 cursor-not-allowed" : ""
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? <LoadingSpinner button /> : "Register"}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <button
              type="button"
              onClick={onBackToLogin}
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;