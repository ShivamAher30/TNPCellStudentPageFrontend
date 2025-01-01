import React, { useState } from "react";
import {
  BookCheck,
  Clock,
  XCircle,
  FileText,
  Download,
  Search,
} from "lucide-react";
import { mockApplications } from "../repodummydata/mockApplication";
import Statcard from "../components/dashboard/statcard";
const ResumeList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const filteredResumes = mockApplications.resumes.filter((resume) =>
    resume.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">My Resumes</h2>
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search resumes..."
            className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="divide-y">
        {filteredResumes.map((resume) => (
          <div
            key={resume.id}
            className="py-4 flex items-center justify-between"
          >
            <div className="flex items-center">
              <FileText className="text-gray-500 mr-3" size={20} />
              <div>
                <p className="font-medium">{resume.name}</p>
                <p className="text-sm text-gray-500">{resume.date}</p>
              </div>
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Download size={20} className="text-gray-600" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

function Dashboard() {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Statcard
          icon={BookCheck}
          title="Accepted Applications"
          count={mockApplications.stats.accepted}
          color="bg-green-500"
        />
        <Statcard
          icon={Clock}
          title="Pending Applications"
          count={mockApplications.stats.pending}
          color="bg-blue-500"
        />
        <Statcard
          icon={XCircle}
          title="Rejected Applications"
          count={mockApplications.stats.rejected}
          color="bg-red-500"
        />
      </div>

      <ResumeList />
    </div>
  );
}

export default Dashboard;
