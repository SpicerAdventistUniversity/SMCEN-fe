import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { Container, Card, Button, Spinner, Alert, Table } from "react-bootstrap";
import toast from "react-hot-toast";
import userLogout from "../hooks/userLogout";

const courses = [
  { code: "RELB151", title: "Christian Beliefs I" },
  { code: "RELB291", title: "Apocalyptic Literature" },
  { code: "RELB125", title: "Life and Teachings of Jesus" },
  { code: "RELB238", title: "Adventist Heritage" },
  { code: "EDUC131", title: "Philosophy of Education" },
  { code: "RELB152", title: "Christian Beliefs II" },
  { code: "FNCE451", title: "Church Stewardship & Finance" },
  { code: "RELB292", title: "Apocalyptic Literature" },
  { code: "RELB151_2", title: "Religions of the World" },
  { code: "HLED121", title: "Personal Health" },
];

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const [profileData, setprofileData] = useState(null); // ✅ Store profileData data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  let logoutsession = userLogout();

  useEffect(() => {
    const fetchProfileData = async () => {
      setLoading(true); // ✅ Ensure loading starts here

      try {
        if (!user?.id) {
          setLoading(false);
          return;
        }

        const res = await axios.get(`http://localhost:5000/api/users/profileData/${user.id}`);
        setprofileData(res.data);
        toast.success("Profile data fetched successfully!", { id: "profileData-success" });
      } catch (err) {
        toast.error(err.response?.data?.message || "Failed to fetch profile data.", { id: "profileData-error" });
      } finally {
        setLoading(false); // ✅ Ensure this always runs
      }
    };

    fetchProfileData();
  }, [user]);



  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <Card className="shadow-lg w-100" style={{ maxWidth: "950px" }}>
        <Card.Body>
          {loading ? (
            <div className="text-center my-5">
              <Spinner animation="border" variant="primary" />
            </div>
          ) : error ? (
            <Alert variant="danger">{error}</Alert>
          ) : (
            <>
              <h2 className="text-center text-primary mb-4 fw-bold">
                <span role="img" aria-label="wave" style={{ fontSize: "1.8rem", marginRight: "8px" }}>👋</span>
                Welcome,&nbsp;
                <span className="text-dark" style={{ textDecoration: "underline", color: "#0d6efd" }}>
                  {profileData?.name}
                </span>
              </h2>


              {/* 🔹 Personal Details Section */}
              <h4 className="text-secondary mb-3">📋 Student Info</h4>
              <Table bordered hover responsive className="mb-4 table-sm">
                <tbody>
                  <tr>
                    <td><strong>Reg. Number</strong></td>
                    <td className="fw-bold text-success">{profileData?.registrationNumber || "N/A"}</td>
                    <td><strong>Email</strong></td>
                    <td>{profileData?.email}</td>
                  </tr>
                  <tr>
                    <td><strong>Phone</strong></td>
                    <td>{profileData?.phoneNumber}</td>
                    <td><strong>Date of Birth</strong></td>
                    <td>{profileData?.dateOfBirth}</td>
                  </tr>
                  <tr>
                    <td><strong>Admission Basis</strong></td>
                    <td>{profileData?.basisOfAdmission}</td>
                    <td><strong>College</strong></td>
                    <td>{profileData?.collegeAttended}</td>
                  </tr>
                  <tr>
                    <td><strong>Gender</strong></td>
                    <td>{profileData?.gender}</td>
                    <td><strong>Reg. Type</strong></td>
                    <td>{profileData?.registrationType}</td>
                  </tr>
                  <tr>
                    <td><strong>Marital Status</strong></td>
                    <td>{profileData?.maritalStatus}</td>
                    <td><strong>Mother Tongue</strong></td>
                    <td>{profileData?.motherTongue}</td>
                  </tr>
                  <tr>
                    <td><strong>Adventist?</strong></td>
                    <td>
                      <span className={`badge bg-${profileData?.isAdventist === "Yes" ? "success" : "danger"}`}>
                        {profileData?.isAdventist}
                      </span>
                    </td>
                    <td><strong>Cumulative GPA</strong></td>
                    <td className="fw-bold">{profileData?.cumulativeGPA?.toFixed(2) ?? "0.00"}</td>
                  </tr>
                  <tr>
                    <td><strong>Union</strong></td>
                    <td>{profileData?.union || "N/A"}</td>
                    <td><strong>Section/Region/Conference</strong></td>
                    <td>{profileData?.sectionRegionConference || "N/A"}</td>
                  </tr>
                  <tr>
                    <td><strong>Address</strong></td>
                    <td colSpan="3">{profileData?.address || "N/A"}</td>
                  </tr>
                </tbody>
              </Table>

              {/* 🔹 Grades Section */}
              <h4 className="text-secondary mb-3">📚 Academic Grades</h4>
              <Table striped bordered hover responsive className="table-sm">
                <thead className="table-primary">
                  <tr>
                    <th>Subject</th>
                    {/* <th>Score</th> */}
                    <th>Grade</th>
                    <th>Points</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map((course) => {
                    const courseData = profileData?.grades?.[course.code] || {};
                    return (
                      <tr key={course.code}>
                        <td>{course.title}</td>
                        {/* <td>{courseData.score ?? <em className="text-muted">Not Assigned</em>}</td> */}
                        <td>{courseData.grade ?? <em className="text-muted">Not Assigned</em>}</td>
                        <td>{courseData.pts?.toFixed(2) ?? "0.00"}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>

              {/* 🔹 Logout */}
              <div className="text-center mt-4">
                <Button variant="outline-danger" onClick={logoutsession} className="w-50 shadow-sm">
                  🚪 Logout
                </Button>
              </div>
            </>
          )}
        </Card.Body>
      </Card>
    </Container>

  );
};

export default Dashboard;
