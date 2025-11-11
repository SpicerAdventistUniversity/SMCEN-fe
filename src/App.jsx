import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Dashboard from "./components/Dashboard";
import AdminDashboard from "./components/AdminDashboard";
import AssignGrade from "./components/AssignGrade";
import Certificate from "./components/Certificate";
import AdminLogin from "./components/AdminLogin";
import Register2 from "./components/Auth/Register2";
import StudentDetails from "./components/StudentsDetails";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/register2" element={<Register2 />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/assign" element={<AssignGrade />} />
          <Route path="/certificate" element={<Certificate />} />
          <Route path="/students" element={<StudentDetails />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
