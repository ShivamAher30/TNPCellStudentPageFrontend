import dummyData from '../repodummydata/profile';
import { User, GraduationCap, Code, Briefcase, Mail, Phone, Building, Calendar, Globe, Linkedin, CheckCircle2 } from 'lucide-react';

function Profile() {
  const { 
    name, email, phone, education, skills, projects, links,
    cgpa, tenthMarks, twelfthMarks,
    verificationStatus, verificationDate
  } = dummyData;

  return (
    <div className="max-w-6xl mx-auto p-8 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 min-h-screen">
      {/* Header Card */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-xl p-8 mb-8 text-white">
        <div className="flex items-center gap-8 mb-6">
          <div className="w-32 h-32 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-2xl ring-4 ring-white/30">
            <User className="w-16 h-16 text-white" />
          </div>
          <div>
            <h1 className="text-5xl font-bold mb-3 text-white">{name}</h1>
            <div className="flex items-center gap-3">
              <span className="px-4 py-1.5 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-medium">
                Student
              </span>
              <span className="px-4 py-1.5 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-medium">
                {education[0].degree}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Information */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-600">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">Contact Info</h2>
              <p className="text-gray-500">How to reach me</p>
            </div>
          </div>
          <div className="space-y-4">
            <p className="flex items-center gap-3 text-gray-600">
              <Mail className="w-5 h-5 text-blue-500" />
              {email}
            </p>
            <p className="flex items-center gap-3 text-gray-600">
              <Phone className="w-5 h-5 text-blue-500" />
              {phone}
            </p>
          </div>
        </div>

        {/* Skills */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 rounded-full bg-gradient-to-r from-purple-500 to-purple-600">
              <Code className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">Skills</h2>
              <p className="text-gray-500">Technical expertise</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            {skills.map((skill, index) => (
              <span 
                key={index}
                className="px-4 py-2 bg-gradient-to-r from-purple-50 to-purple-100 text-purple-600 rounded-full text-sm font-medium hover:shadow-md transition-all duration-300"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Education */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 rounded-full bg-gradient-to-r from-green-500 to-green-600">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">Education</h2>
              <p className="text-gray-500">Academic background</p>
            </div>
          </div>
          {education.map((edu, index) => (
            <div key={index} className="mb-4 p-4 rounded-xl bg-gradient-to-r from-green-50 to-green-100">
              <div className="flex items-center gap-3 mb-2">
                <Building className="w-5 h-5 text-green-600" />
                <p className="font-bold text-gray-800">{edu.institution}</p>
              </div>
              <div className="ml-8 space-y-2">
                <p className="text-gray-600">{edu.degree}</p>
                <div className="flex items-center gap-2 text-green-600">
                  <Calendar className="w-4 h-4" />
                  <p className="text-sm">{edu.year}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Academic Marks */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 rounded-full bg-gradient-to-r from-orange-500 to-orange-600">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div className="flex items-center justify-between flex-1">
              <div>
                <h2 className="text-xl font-bold text-gray-800">Academic Performance</h2>
                <p className="text-gray-500">Educational marks</p>
              </div>
              {verificationStatus === "verified" && (
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle2 className="w-5 h-5" />
                  <span className="text-sm">Verified on {new Date(verificationDate).toLocaleDateString()}</span>
                </div>
              )}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-gradient-to-r from-orange-50 to-orange-100">
              <p className="text-sm text-gray-600 mb-1">CGPA</p>
              <p className="text-2xl font-bold text-gray-800">{cgpa}</p>
            </div>
            <div className="p-4 rounded-lg bg-gradient-to-r from-orange-50 to-orange-100">
              <p className="text-sm text-gray-600 mb-1">10th Grade</p>
              <p className="text-2xl font-bold text-gray-800">{tenthMarks}%</p>
            </div>
            <div className="p-4 rounded-lg bg-gradient-to-r from-orange-50 to-orange-100">
              <p className="text-sm text-gray-600 mb-1">12th Grade</p>
              <p className="text-2xl font-bold text-gray-800">{twelfthMarks}%</p>
            </div>
          </div>
        </div>

        {/* Links */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 rounded-full bg-gradient-to-r from-pink-500 to-pink-600">
              <Globe className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">Social Links</h2>
              <p className="text-gray-500">Connect with me</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-4">
            {links.linkedin && (
              <a href={links.linkedin} target="_blank" rel="noopener noreferrer" 
                 className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300">
                <Linkedin className="w-5 h-5" /> LinkedIn
              </a>
            )}
            {links.leetcode && (
              <a href={links.leetcode} target="_blank" rel="noopener noreferrer" 
                 className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300">
                <Code className="w-5 h-5" /> LeetCode
              </a>
            )}
          </div>
        </div>

        {/* Projects Section - Full Width */}
        <div className="md:col-span-2 bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-600">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">Projects</h2>
              <p className="text-gray-500">What I've built</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <div key={index} className="p-6 rounded-xl bg-gradient-to-r from-indigo-50 to-indigo-100 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <h3 className="font-bold text-xl text-gray-800">{project.title}</h3>
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" 
                       className="p-2 rounded-full hover:bg-indigo-200 transition-colors">
                      <Globe className="w-5 h-5 text-indigo-600" />
                    </a>
                  )}
                </div>
                <p className="text-gray-600 mb-4">{project.description}</p>
                {project.technologies && (
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, i) => (
                      <span key={i} className="px-3 py-1 bg-white text-indigo-600 rounded-full text-xs font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;