import React, { useState, useContext } from "react";
import {
  User,
  Mail,
  Phone,
  GraduationCap,
  Building,
  Calendar,
  CheckCircle2,
  Globe,
  Code,
  X,
} from "lucide-react";
import axiosinstance from "../utils/axios";
import { studentidContext } from "../context/StudentidProvider";
import { Navigate, useNavigate } from "react-router-dom";
const EditableProfileForm = ({ CloneStudent, setCloneStudnet }) => {
  const { studentId } = useContext(studentidContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    department: "",
    email: "",
    phone: "",
    skills: [],
    education: [{ institution: "", degree: "", year: "" }],
    cgpa: "",
    tenthMarks: "",
    twelfthMarks: "",
    linkedin: "",
    leetcode: "",
    projects: [{ title: "", description: "", link: "", technologies: "" }],
  });

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    console.log(formData);
  };

  const handleArrayChange = (arrayField, index, field, value) => {
    const updatedArray = [...formData[arrayField]];
    updatedArray[index] = { ...updatedArray[index], [field]: value };
    setFormData({ ...formData, [arrayField]: updatedArray });
  };

  const addSkill = (skill) => {
    if (skill && !formData.skills.includes(skill)) {
      setFormData({ ...formData, skills: [...formData.skills, skill] });
    }
  };

  const removeSkill = (skill) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((s) => s !== skill),
    });
  };

  const addEducationField = () => {
    setFormData({
      ...formData,
      education: [
        ...formData.education,
        { institution: "", degree: "", year: "" },
      ],
    });
  };

  const addProjectField = () => {
    setFormData({
      ...formData,
      projects: [
        ...formData.projects,
        { title: "", description: "", link: "", technologies: "" },
      ],
    });
  };
  const onSubmit = async () => {
    // Object.keys(formData).forEach((key) => {
    //   if (Array.isArray(formData[key])) {
    //     formData[key].forEach((item) => {
    //       Object.keys(item).forEach((field) => {
    //         console.log(${key}[${field}] = ${item[field]});
    //       });
    //     });
    //   } else {
    //     console.log(${key} = ${formData[key]});
    //   }
    // });
    const localStorageId = localStorage.getItem("studentId");
    try {
      const UpdateProfile = await axiosinstance.put(
        api/v1/student/profile/${studentId},
        formData
      );
      console.log(UpdateProfile);

      navigate(/profile/${localStorageId});
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      className="max-w-6xl mx-auto p-8 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 min-h-screen"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(formData);
      }}
    >
      {/* Personal Information */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-600">
            <User className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">Personal Info</h2>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4">
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            className="w-full p-3 border rounded-lg"
          />
          <input
            type="text"
            placeholder="Department"
            value={formData.department}
            onChange={(e) => handleInputChange("department", e.target.value)}
            className="w-full p-3 border rounded-lg"
          />
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-600">
            <Mail className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">Contact Info</h2>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4">
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            className="w-full p-3 border rounded-lg"
          />
          <input
            type="number"
            placeholder="Phone"
            value={formData.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            className="w-full p-3 border rounded-lg"
          />
        </div>
      </div>

      {/* Skills */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 rounded-full bg-gradient-to-r from-purple-500 to-purple-600">
            <Code className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">Skills</h2>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4">
          <input
            type="text"
            placeholder="Add a skill"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addSkill(e.target.value);
                e.target.value = "";
              }
            }}
            className="w-full p-3 border rounded-lg"
          />
          <div className="flex flex-wrap gap-2">
            {formData.skills.map((skill, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-3 py-1 bg-purple-100 text-purple-600 rounded-full"
              >
                <span>{skill}</span>
                <button
                  type="button"
                  onClick={() => removeSkill(skill)}
                  className="p-1 rounded-full hover:bg-purple-200"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="text-center">
        <button
          type="submit"
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-medium hover:shadow-lg transition-all duration-300"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

