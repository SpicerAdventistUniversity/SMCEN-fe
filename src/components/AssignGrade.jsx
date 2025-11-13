import { useState, useEffect } from "react";
import axios from "axios";
import { Container, Table, Spinner, Alert, Card, Button, Form } from "react-bootstrap";
import Navbar from "./Navbar";

// Course List with Credit Hours
const courses = [
  { code: "RELB151", title: "Christian Beliefs I", credit: 2, semester: "I",mentor:"Mrs. Sharon Clinton" },
  { code: "RELB291", title: "Apocalyptic Literature I", credit: 2, semester: "I",mentor:"Dr. Jesin Israel" },
  { code: "RELB125", title: "Life and Teachings of Jesus", credit: 3, semester: "I",mentor:"Mr. Gaiphun Gangmei" },
  { code: "RELB238", title: "Adventist Heritage", credit: 3, semester: "I",mentor:"Dr. Koberson Langhu" },
  { code: "EDUC231", title: "Philosophy of Education", credit: 2, semester: "I",mentor:"Dr. Carol Linda Kingston" },
  { code: "WREL234", title: "Religions of the World", credit: 3, semester: "II",mentor:"Mr. Gaiphun Gangmei" },
  { code: "HLED121", title: "Personal Health", credit: 2, semester: "II",mentor:"Pr. Vanlaltluaga Khuma" },
  { code: "RELB152", title: "Christian Beliefs II", credit: 2, semester: "II",mentor:"Mrs. Sharon Clinton" },
  { code: "FNCE252", title: "Church Stewardship & Finance", credit: 3, semester: "II",mentor:"Mr. Abhishek Lakra" },
  { code: "RELB292", title: "Apocalyptic Literature II", credit: 2, semester: "II",mentor:"Dr. Jesin Israel" },
];

const AssignGrade = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("https://smcen-be.onrender.com/api/admin/users", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        });
        setUsers(res.data);
      } catch (err) {
        setError("Failed to fetch users.");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleViewTranscript = (user) => {
    setSelectedUser(user);
  };

  // 🔹 Function to Download All Certificates
  const handleDownloadCertificates = async () => {
    try {
      const response = await axios.get("https://smcen-be.onrender.com/api/admin/download-certificates", {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Certificates.zip");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error("❌ Error downloading certificates:", error);
      alert("Failed to download certificates. Try again.");
    }
  };

  // 🔹 Function to Download a Single User's Certificate
  const handleDownloadUserCertificate = async (userId, userName) => {
    try {
      const response = await axios.get(`https://smcen-be.onrender.com/api/admin/download-certificate/${userId}`, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${userName}_Certificate.pdf`); // 📌 Save as PDF
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error(`❌ Error downloading ${userName}'s certificate:`, error);
      alert(`Failed to download ${userName}'s certificate. Try again.`);
    }
  };

  //Function to Download a single user's sem 1 certificate
   const handleDownloadUsersem1Certificate = async (userId, userName) => {
    try {
      const response = await axios.get(`https://smcen-be.onrender.com/api/admin/download-sem1/${userId}`, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${userName}_Certificate.pdf`); // 📌 Save as PDF
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error(`❌ Error downloading ${userName}'s certificate:`, error);
      alert(`Failed to download ${userName}'s certificate. Try again.`);
    }
  };

    //Function to Download a single user's sem 2 certificate
   const handleDownloadUsersem2Certificate = async (userId, userName) => {
    try {
      const response = await axios.get(`https://smcen-be.onrender.com/api/admin/download-sem2/${userId}`, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${userName}_Certificate.pdf`); // 📌 Save as PDF
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error(`❌ Error downloading ${userName}'s certificate:`, error);
      alert(`Failed to download ${userName}'s certificate. Try again.`);
    }
  };
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (user.registrationNumber && user.registrationNumber.includes(searchQuery))
  );

  return (
    <>
    <Navbar />
    <Container className="py-4">
      <Card className="p-4 shadow">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="text-primary">Assigned Grades</h2>
          <Button variant="success" onClick={handleDownloadCertificates}>📥 Download All Certificates</Button>
        </div>

        {/* 🔍 Search Box */}
        <Form.Control
            type="text"
            placeholder="🔍 Search by Name or Reg No"
            value={searchQuery}
            onChange={handleSearch}
            size="sm"
            className="mb-3 rounded-pill shadow-sm px-3 border-0"
          />

        {loading ? (
          <div className="text-center">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : error ? (
          <Alert variant="danger">{error}</Alert>
        ) : selectedUser ? (
          // 🔹 Show Transcript View
          <div>
            <h3>{selectedUser.name}'s Transcript</h3>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Course Code</th>
                  <th>Course Title</th>
                  <th>Cr. Hrs</th>
                  <th>Score</th>
                  <th>Grade</th>
                  <th>Pts</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course) => {
                  const courseData = selectedUser.grades?.[course.code] || {};
                  return (
                    <tr key={course.code}>
                      <td>{course.code}</td>
                      <td>{course.title}</td>
                      <td>{course.credit}</td>
                      <td>{courseData.score ?? "N/A"}</td>
                      <td>{courseData.grade ?? "N/A"}</td>
                      <td>{courseData.pts !== undefined ? Number(courseData.pts).toFixed(2) : "0.00"}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            
            {/* 🎯 Back & Download Buttons */}
            <div className="d-flex gap-2">
              <Button variant="secondary" onClick={() => setSelectedUser(null)}>
                Back to List
              </Button>
              <Button 
                variant="danger" 
                onClick={() => handleDownloadUserCertificate(selectedUser._id, selectedUser.name)}
              >
                📥 Download Certificate
              </Button>
              <Button 
                variant="danger" 
                onClick={() => handleDownloadUsersem1Certificate(selectedUser._id, selectedUser.name)}
              >
                📥 Download sem1 marksheet
              </Button>
              <Button 
                variant="danger" 
                onClick={() => handleDownloadUsersem2Certificate(selectedUser._id, selectedUser.name)}
              >
                📥 Download sem2 marksheet
              </Button>
            </div>
          </div>
        ) : (
          // 🔹 Show Student List with View Button
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Reg No.</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user, index) => (
                  <tr key={user._id}>
                    <td>{index + 1}</td>
                    <td>{user.name}</td>
                    <td className="fw-bold text-success">{user.registrationNumber || "N/A"}</td>
                    <td>
                      <Button variant="primary" onClick={() => handleViewTranscript(user)}>
                        View
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center text-muted">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        )}
      </Card>
    </Container>
    </>
  );
};

export default AssignGrade;
