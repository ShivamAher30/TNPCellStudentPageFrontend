import React, { useState, useContext , useEffect } from "react";
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
  const { studentId, Studentdata } = useContext(studentidContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
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
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.department.trim())
      newErrors.department = "Department is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    if (formData.skills.length === 0)
      newErrors.skills = "At least one skill is required";

    formData.education.forEach((edu, index) => {
      if (!edu.institution.trim() || !edu.degree.trim() || !edu.year.trim()) {
        newErrors.education = "All education fields are required";
      }
    });

    formData.projects.forEach((project, index) => {
      if (
        !project.title.trim() ||
        !project.description.trim() ||
        !project.link.trim() ||
        !project.technologies.trim()
      ) {
        newErrors.projects = "All project fields are required";
      }
    });

    if (!formData.cgpa.trim()) newErrors.cgpa = "CGPA is required";
    if (!formData.tenthMarks.trim())
      newErrors.tenthMarks = "10th Marks are required";
    if (!formData.twelfthMarks.trim())
      newErrors.twelfthMarks = "12th Marks are required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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
    if (!validateForm()) return;

    setLoading(true);
    const localStorageId = localStorage.getItem("studentId");
    try {
      const UpdateProfile = await axiosinstance.put(
        `api/v1/student/profile/${localStorageId}`,
        formData
      );

      navigate(`/profile/${localStorageId}`);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setFormData({
      ...formData,
      projects: [...Studentdata.projects, ,],
      skills: [...Studentdata.skills],
    });
  }, []);

  return (
    <form
      className="max-w-6xl mx-auto p-8 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 min-h-screen"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      {/* Add other fields like department, email, phone, etc. */}
      {/* Skills */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-800">Skills</h2>
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
        {errors.skills && (
          <p className="text-red-500 text-sm">{errors.skills}</p>
        )}
      </div>

      {/* Projects */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-800">Projects</h2>
        {formData.projects.map((project, index) => (
          <div key={index} className="border p-4 rounded-lg mb-4">
            <input
              type="text"
              placeholder="Title"
              value={project.title}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  projects: formData.projects.map((p, i) =>
                    i === index ? { ...p, title: e.target.value } : p
                  ),
                })
              }
              className="w-full p-2 border rounded-lg mb-2"
            />
            <textarea
              placeholder="Description"
              value={project.description}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  projects: formData.projects.map((p, i) =>
                    i === index ? { ...p, description: e.target.value } : p
                  ),
                })
              }
              className="w-full p-2 border rounded-lg mb-2"
            />
            <input
              type="url"
              placeholder="Link"
              value={project.link}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  projects: formData.projects.map((p, i) =>
                    i === index ? { ...p, link: e.target.value } : p
                  ),
                })
              }
              className="w-full p-2 border rounded-lg mb-2"
            />
            <input
              type="text"
              placeholder="Technologies"
              value={project.technologies}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  projects: formData.projects.map((p, i) =>
                    i === index ? { ...p, technologies: e.target.value } : p
                  ),
                })
              }
              className="w-full p-2 border rounded-lg mb-2"
            />
            <button
              type="button"
              onClick={() =>
                setFormData({
                  ...formData,
                  projects: formData.projects.filter((_, i) => i !== index),
                })
              }
              className="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600"
            >
              Remove Project
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addProjectField}
          className="mt-4 px-6 py-2 bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-full hover:shadow-lg transition-all duration-300"
        >
          Add Project
        </button>
        {errors.projects && (
          <p className="text-red-500 text-sm">{errors.projects}</p>
        )}
      </div>

      {/* Submit Button */}
      <div className="text-center">
        <button
          type="submit"
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-medium hover:shadow-lg transition-all duration-300"
        >
          {loading ? (
            <div
              className="spinner-border animate-spin inline-block w-4 h-4 border-2 rounded-full text-white"
              role="status"
            ></div>
          ) : (
            "Submit"
          )}
        </button>
      </div>
    </form>
  );
};

export default EditableProfileForm;
