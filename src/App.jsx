import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout/Layout";
import Dashboard from "./page/Dashboard";
import Profile from "./page/profile";
import Job from "./page/Job";
// import Events- from './page/Events';
// import Resume from './page/Resume';
import Login from "./page/Login";
import Signup from "./page/Signup";

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route element={<Layout />}>
            <Route path="/dashboard/:studentid" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/jobs" element={<Job />} />
            {/* <Route path="/events" element={<Events />} /> */}
            {/* <Route path="/resume" element={<Resume />} /> */}
            <Route path="/" element={<Dashboard />} />
          </Route>
        </Routes>
    </Router>
  );
}

export default App;
