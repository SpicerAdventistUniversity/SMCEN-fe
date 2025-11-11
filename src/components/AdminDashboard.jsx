import { useState, useEffect } from "react";
import axios from "axios";
import { Container, Table, Spinner, Alert, Card, Button, Form } from "react-bootstrap";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
// Courses list with correct credit hours
const courses = [
  { code: "RELB151", title: "Christian Beliefs I/Moral Principles I", credit: 2, semester: "I",mentor:"Mrs. Sharon Clinton" },
  { code: "RELB291", title: "Apocalyptic Literature/Daniel", credit: 2, semester: "I",mentor:"Dr. Jesin Israel" },
  { code: "RELB125", title: "Life and Teachings of Jesus", credit: 3, semester: "I",mentor:"Mr. Gaiphun Gangmei" },
  { code: "RELB238", title: "Adventist Heritage", credit: 3, semester: "I",mentor:"Dr. Koberson Langhu" },
  { code: "EDUC131", title: "Philosophy of Education", credit: 2, semester: "I",mentor:"Dr. Carol Linda Kingston" },
  { code: "WREL234", title: "Religions of the World", credit: 3, semester: "II",mentor:"Mr. Gaiphun Gangmei" },
  { code: "HLED121", title: "Personal Health", credit: 2, semester: "II",mentor:"Pr. Vanlaltluaga Khuma" },
  { code: "RELB152", title: "Christian Beliefs II/Moral Principles II", credit: 2, semester: "II",mentor:"Mrs. Sharon Clinton" },
  { code: "FNCE252", title: "Church Stewardship & Finance", credit: 3, semester: "II",mentor:"Mr. Abhishek Lakra" },
  { code: "RELB292", title: "Apocalyptic Literature II/Revelation", credit: 2, semester: "II",mentor:"Dr. Jesin Israel" },
];

const gradingScale = [
  { min: 83, grade: "A", gpa: 4.00 },
  { min: 80, grade: "A-", gpa: 3.67 },
  { min: 77, grade: "B+", gpa: 3.33 },
  { min: 73, grade: "B", gpa: 3.00 },
  { min: 70, grade: "B-", gpa: 2.67 },
  { min: 64, grade: "C+", gpa: 2.33 },
  { min: 56, grade: "C", gpa: 2.00 },
  { min: 50, grade: "C-", gpa: 1.67 },
  { min: 47, grade: "D+", gpa: 1.33 },
  { min: 43, grade: "D", gpa: 1.00 },
  { min: 40, grade: "D-", gpa: 0.67 },
  { min: 0, grade: "F", gpa: 0.00 },
];

// Function to get grade and GPA based on score
const getGradeAndPts = (score, creditHours) => {
  if (!score || isNaN(score)) return { grade: "F", pts: 0.0 };

  for (const scale of gradingScale) {
    if (score >= scale.min) {
      return {
        grade: scale.grade,
        pts: parseFloat((scale.gpa * creditHours).toFixed(2)) || 0.0,
      };
    }
  }
  return { grade: "F", pts: 0.0 };
};

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingUser, setEditingUser] = useState(null);
  const [grades, setGrades] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  let navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("adminToken"); // or however you stored it
        const res = await axios.get("https://smcen-be.onrender.com/api/admin/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(res.data);
      } catch (err) {
        setError("Failed to fetch users.");
        navigate("/adminlogin"); // Redirect to login if unauthorized
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleEdit = (user) => {
    setEditingUser(user);
    setGrades(user.grades || {});
  };

  const handleGradeChange = (courseCode, score) => {
    if (score === "") {
      setGrades((prevGrades) => ({
        ...prevGrades,
        [courseCode]: { score: "", grade: "", pts: "0.00" },
      }));
      return;
    }

    const numericScore = Number(score);
    if (isNaN(numericScore) || numericScore < 0 || numericScore > 100) return;

    const { grade, pts } = getGradeAndPts(numericScore, courses.find(course => course.code === courseCode)?.credit || 0);

    setGrades((prevGrades) => ({
      ...prevGrades,
      [courseCode]: {
        score: numericScore,
        grade,
        pts: pts ? pts.toFixed(2) : "0.00",  // Ensure pts has a valid number
      },
    }));
  };


  const handleSaveGrades = async () => {
    try {
      const formattedGrades = {};
      Object.keys(grades).forEach((courseCode) => {
        formattedGrades[courseCode] = {
          score: Number(grades[courseCode].score),
          grade: grades[courseCode].grade,
          pts: Number(grades[courseCode].pts),
        };
      });

      await axios.put(`https://smcen-be.onrender.com/api/admin/update-grades/${editingUser._id}`, {
        grades: formattedGrades,
      });

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === editingUser._id ? { ...user, grades: formattedGrades } : user
        )
      );

      setEditingUser(null);
      toast.success("Grades updated successfully!");
    } catch (err) {
      alert("Error updating grades. Check console logs.");
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

  const handleDownloadCertificates = () => {
    window.open("https://smcen-be.onrender.com/api/admin/download-certificates", "_blank");
  };

  const handleDownloadUser = async () => {
    try {
      const res = await axios.get("https://smcen-be.onrender.com/api/users/export/csv", {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "students.csv");
      document.body.appendChild(link);
      link.click();
      link.remove();

      toast.success("CSV downloaded successfully!");
    } catch (err) {
      toast.error("Failed to download CSV.");
    }
  };

  const handleDownloadUserSem2 = async () => {
  try {
    const res = await axios.get("https://smcen-be.onrender.com/api/users/export/csv-sem2", {
      responseType: "blob",
    });

    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "sem2_students.csv");
    document.body.appendChild(link);
    link.click();
    link.remove();

    toast.success("Sem 2 CSV downloaded successfully!");
  } catch (err) {
    toast.error("Failed to download Sem 2 CSV.");
  }
};


  return (
    <><div><Navbar />
    </div>
      <Container className="py-4">
        <Card className="p-4 shadow">
          <h2 className="text-center text-primary">Enrichment Course</h2>

          <Form.Control
            type="text"
            placeholder="🔍 Search by Name or Reg No"
            value={searchQuery}
            onChange={handleSearch}
            size="sm"
            className="mb-3 rounded-pill shadow-sm px-3 border-0"
          />


          {loading ? (
            <Spinner animation="border" variant="primary" className="d-block mx-auto" />
          ) : error ? (
            <Alert variant="danger">{error}</Alert>
          ) : editingUser ? (
            <div>
              <h3>{editingUser.name}'s Transcript</h3>
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
                  {courses.map((course) => (
                    <tr key={course.code}>
                      <td>{course.code}</td>
                      <td>{course.title}</td>
                      <td>{course.credit}</td>
                      <td>
                        <Form.Control
                          type="number"
                          min="0"
                          max="100"
                          value={grades[course.code]?.score === "" ? "" : grades[course.code]?.score || ""}
                          onChange={(e) => handleGradeChange(course.code, e.target.value)}
                        />
                      </td>
                      <td>{grades[course.code]?.grade || "Not Assigned"}</td>
                      <td>{grades[course.code]?.pts || "0.00"}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Button variant="success" onClick={handleSaveGrades}>Save Grades</Button>
              <Button variant="secondary" className="ms-2" onClick={() => setEditingUser(null)}>Cancel</Button>
            </div>
          ) : (
            <>
              <div className="d-flex justify-content-center gap-4 mb-4">
                <Button variant="outline-success" size="lg" className="shadow" onClick={handleDownloadCertificates}>
                  📥 Download all Transcripts
                </Button>
                <Button variant="outline-warning" size="lg" className="shadow" onClick={handleDownloadUser}>
                  📥 Download all User Info
                </Button>
                <Button variant="outline-info" size="lg" className="shadow" onClick={handleDownloadUserSem2}>
                  📥 Download sem II Registration
                </Button>
              </div>

              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Reg No.</th>
                    <th>Email</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((user, index) => (
                      <tr key={user._id}>
                        <td>{index + 1}</td>
                        <td>{user.name}</td>
                        <td>{user.registrationNumber || "N/A"}</td>
                        <td>{user.email}</td>
                        <td>
                          <Button variant="primary" onClick={() => handleEdit(user)}>Edit</Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center text-muted">No users found.</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </>
          )}
        </Card>
      </Container>
    </>
  );
};

export default AdminDashboard;
