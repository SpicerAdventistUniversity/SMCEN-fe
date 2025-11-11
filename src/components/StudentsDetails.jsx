import { useState, useEffect } from "react";
import axios from "axios";
import { Container, Table, Spinner, Alert, Card, Button, Form } from "react-bootstrap";
import Navbar from "./Navbar";
import './StudentsDetails.css'; // Ensure this import is at the top of the StudentDetails.jsx file

// Course List with Credit Hours
const courses = [
  { code: "RELB151", title: "Christian Beliefs I/Moral Principles I", credit: 2, semester: "I", mentor: "Mrs. Sharon Clinton" },
  { code: "RELB291", title: "Apocalyptic Literature/Daniel", credit: 2, semester: "I", mentor: "Dr. Jesin Israel" },
  { code: "RELB125", title: "Life and Teachings of Jesus", credit: 3, semester: "I", mentor: "Mr. Gaiphun Gangmei" },
  { code: "RELB238", title: "Adventist Heritage", credit: 3, semester: "I", mentor: "Dr. Koberson Langhu" },
  { code: "EDUC131", title: "Philosophy of Education", credit: 2, semester: "I", mentor: "Dr. Carol Linda Kingston" },
  { code: "WREL234", title: "Religions of the World", credit: 3, semester: "II", mentor: "Mr. Gaiphun Gangmei" },
  { code: "HLED121", title: "Personal Health", credit: 2, semester: "II", mentor: "Pr. Vanlaltluaga Khuma" },
  { code: "RELB152", title: "Christian Beliefs II/Moral Principles II", credit: 2, semester: "II", mentor: "Mrs. Sharon Clinton" },
  { code: "FNCE252", title: "Church Stewardship & Finance", credit: 3, semester: "II", mentor: "Mr. Abhishek Lakra" },
  { code: "RELB292", title: "Apocalyptic Literature II/Revelation", credit: 2, semester: "II", mentor: "Dr. Jesin Israel" },
];

const StudentDetails = () => {
  const [students, setStudents] = useState([]); // List of all students
  const [selectedStudent, setSelectedStudent] = useState(null); // Single selected student
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Fetch list of students on initial load
    const fetchStudents = async () => {
      try {
        const res = await axios.get("https://smcen-be.onrender.com/api/admin/users", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        });
        setStudents(res.data);
      } catch (err) {
        setError("Failed to fetch students.");
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  const handleViewStudent = (studentId) => {
    // Fetch the selected student registration details
    const student = students.find((s) => s._id === studentId);
    setSelectedStudent(student);
  };

  const handleBackToList = () => {
    setSelectedStudent(null); // Go back to the student list view
  };

  // 🔹 Function to Download the Certificate for a Single Student
  const handleDownloadCertificate = async (studentId, studentName) => {
    try {
      const response = await axios.get(`https://smcen-be.onrender.com/api/admin/download-certificate/${studentId}`, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${studentName}_Certificate.pdf`); // 📌 Save as PDF
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error(`❌ Error downloading ${studentName}'s certificate:`, error);
      alert(`Failed to download ${studentName}'s certificate. Try again.`);
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter students based on search query
  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (student.registrationNumber && student.registrationNumber.includes(searchQuery))
  );

  const handlePrint = () => {
    window.print(); // Opens the browser's print dialog
  };

  return (
    <>
      <Navbar />
      <Container className="py-4">
        <Card className="p-4 shadow">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2 className="text-primary">Student Registration Details</h2>
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
          ) : selectedStudent ? (
            // Show selected student's registration details
            <div>
              <h3>{selectedStudent.name}'s Registration Details</h3>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Field</th>
                    <th>Details</th>
                  </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Registration Number</td>
                    <td><b>{selectedStudent.registrationNumber}</b></td>
                  </tr>
                  <tr>
                    <td>Registration Type</td>
                    <td>{selectedStudent.registrationType}</td>
                  </tr>
                  <tr>
                    <td>Name</td>
                    <td>{selectedStudent.name}</td>
                  </tr>
                  <tr>
                    <td>Email</td>
                    <td>{selectedStudent.email}</td>
                  </tr>
                  <tr>
                    <td>Date of Birth</td>
                    <td>{selectedStudent.dateOfBirth}</td>
                  </tr>
                  <tr>
                    <td>Eligibility of Admission</td>
                    <td>{selectedStudent.basisOfAdmission}</td>
                  </tr>
                  <tr>
                    <td>College Attended</td>
                    <td>{selectedStudent.collegeAttended}</td>
                  </tr>
                  <tr>
                    <td>Gender</td>
                    <td>{selectedStudent.gender}</td>
                  </tr>
                  <tr>
                    <td>Marital Status</td>
                    <td>{selectedStudent.maritalStatus}</td>
                  </tr>
                  <tr>
                    <td>Mother Tongue</td>
                    <td>{selectedStudent.motherTongue}</td>
                  </tr>
                  <tr>
                    <td>Are you an Adventist?</td>
                    <td>{selectedStudent.isAdventist}</td>
                  </tr>
                  <tr>
                    <td>Name of the Union</td>
                    <td>{selectedStudent.union}</td>
                  </tr>
                  <tr>
                    <td>Name of the Section/Region/Conference</td>
                    <td>{selectedStudent.sectionRegionConference}</td>
                  </tr>
                  <tr>
                    <td>Address</td>
                    <td>{selectedStudent.address}</td>
                  </tr>
                  <tr>
                    <td>State</td>
                    <td>{selectedStudent.state}</td>
                  </tr>
                  <tr>
                    <td>Phone Number</td>
                    <td>{selectedStudent.phoneNumber}</td>
                  </tr>
                  <tr>
                    <td>Place of Work</td>
                    <td>{selectedStudent.workplace}</td>
                  </tr>
                </tbody>
              </Table>

              {/* 🎯 Back & Download Buttons */}
              <div className="d-flex gap-2">
                <Button variant="secondary" onClick={handleBackToList}>
                  Back to List
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDownloadCertificate(selectedStudent._id, selectedStudent.name)}
                >
                  📥 Download Certificate
                </Button>
                <Button
                  variant="info"
                  onClick={handlePrint}
                >
                  🖨️ Print
                </Button>
              </div>
            </div>
          ) : (
            // Show student list
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
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((student, index) => (
                    <tr key={student._id}>
                      <td>{index + 1}</td>
                      <td>{student.name}</td>
                      <td className="fw-bold text-success">{student.registrationNumber || "N/A"}</td>
                      <td>
                        <Button variant="primary" onClick={() => handleViewStudent(student._id)}>
                          View
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center">
                      No students found!
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

export default StudentDetails;
