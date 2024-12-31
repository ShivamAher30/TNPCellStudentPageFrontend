import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout/Layout";
import Dashboard from './page/Dashboard';
import Profile from "./page/profile";
import Job from "./page/Job";
// import Events- from './page/Events';
// import Resume from './page/Resume';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/jobs" element={<Job />} />
          {/* <Route path="/events" element={<Events />} /> */}
          {/* <Route path="/resume" element={<Resume />} /> */}
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
