import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import axios from "../../utils/axios";
import axiosinstance from "../utils/axios";
const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    personalInfo: {
      name: "",
      rollNumber: "",
      department: "",
      batch: "",
    },
    academics: {
      cgpa: "",
      tenthMarks: "",
      twelfthMarks: "",
    },
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axiosinstance.post("/api/v1/student/register", {
        email: formData.email,
        password: formData.password,
        personalInfo: formData.personalInfo,
        academics: formData.academics,
      });

      if (response.data.statusCode === 201) {

        navigate(`/profile/${response.data.data.student._id}`);
      }
    } catch (err) {
      console.error("Registration error:", err);
      if (err.response?.status === 409) {
        // Handle specific conflict errors
        if (err.response.data.message.includes("email")) {
          setError("Email already registered. Please use a different email.");
        } else if (err.response.data.message.includes("rollNumber")) {
          setError(
            "Roll number already registered. Please check your details."
          );
        } else {
          setError("A user with these details already exists.");
        }
      } else {
        setError(
          err.response?.data?.message ||
            "Registration failed. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full mx-auto space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Student Registration
          </h2>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            {error}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Personal Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <input
                  name="personalInfo.name"
                  type="text"
                  required
                  placeholder="Full Name"
                  value={formData.personalInfo.name}
                  onChange={handleChange}
                  className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <input
                  name="personalInfo.rollNumber"
                  type="text"
                  required
                  placeholder="Roll Number"
                  value={formData.personalInfo.rollNumber}
                  onChange={handleChange}
                  className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <select
                  name="personalInfo.department"
                  required
                  value={formData.personalInfo.department}
                  onChange={handleChange}
                  className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Department</option>
                  <option value="CSE">Computer Engineering</option>
                  <option value="ECE">Electronics & Communication</option>
                  <option value="ME">Mechanical Engineering</option>
                  {/* Add other departments */}
                </select>
              </div>
              <div>
                <input
                  name="personalInfo.batch"
                  type="number"
                  required
                  placeholder="Batch Year"
                  value={formData.personalInfo.batch}
                  onChange={handleChange}
                  className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <h3 className="text-lg font-medium mt-6">Academic Information</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <input
                  name="academics.cgpa"
                  type="number"
                  step="0.01"
                  required
                  placeholder="CGPA"
                  value={formData.academics.cgpa}
                  onChange={handleChange}
                  className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <input
                  name="academics.tenthMarks"
                  type="number"
                  step="0.01"
                  required
                  placeholder="10th Marks (%)"
                  value={formData.academics.tenthMarks}
                  onChange={handleChange}
                  className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <input
                  name="academics.twelfthMarks"
                  type="number"
                  step="0.01"
                  required
                  placeholder="12th Marks (%)"
                  value={formData.academics.twelfthMarks}
                  onChange={handleChange}
                  className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <h3 className="text-lg font-medium mt-6">Account Information</h3>
            <div className="space-y-4">
              <input
                name="email"
                type="email"
                required
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              <input
                name="password"
                type="password"
                required
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
              loading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <a
              href="/login"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
