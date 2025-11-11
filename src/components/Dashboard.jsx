import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { Container, Card, Button, Spinner, Alert, Table } from "react-bootstrap";
import toast from "react-hot-toast";
import userLogout from "../hooks/userLogout";
import { useNavigate } from "react-router-dom";

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

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const [profileData, setprofileData] = useState(null); // ✅ Store profileData data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  let navigate = useNavigate();
  let logoutsession = userLogout();

  useEffect(() => {
    const fetchProfileData = async () => {
      setLoading(true); // ✅ Ensure loading starts here

      try {
        if (!user?.id) {
          setLoading(false);
          return;
        }

        const res = await axios.get(`https://smcen-be.onrender.com/api/users/profileData/${user.id}`);
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
    <Container className="d-flex justify-content-center align-items-center min-vh-100 bg-light px-3">
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
              <Card.Title className="text-center mb-1" style={{ fontSize: "2rem", fontWeight: "700" }}>
                Spicer Memorial College
              </Card.Title>
              <Card.Subtitle className="text-center mb-4 text-muted" style={{ fontSize: "1.2rem" }}>
                Enrichment Course Student Dashboard
              </Card.Subtitle>

              <h5 className="text-center text-primary mb-4 fw-bold">
                Welcome,&nbsp;
                <span className="text-dark" style={{ textDecoration: "underline" }}>
                  {profileData?.name}
                </span>
              </h5>

              {/* 🔹 Personal Details Section */}
              <h4 className="text-secondary mb-3 border-bottom pb-1">Student Information</h4>
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
                    <td colSpan="2" className="text-center"><strong>Adventist?</strong></td>
                    <td colSpan="2" className="text-center">
                      <span className={`badge bg-${profileData?.isAdventist === "Yes" ? "success" : "danger"}`}>
                        {profileData?.isAdventist}
                      </span>
                    </td>
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
                  <tr>
                    <td><strong>State</strong></td>
                    <td colSpan="3">{profileData?.state || "N/A"}</td>
                  </tr>
                  {/* <tr>
                    <td><strong>Cumulative GPA</strong></td>
                    <td colSpan="3" className="fw-bold">{profileData?.cumulativeGPA?.toFixed(2) ?? "0.00"}</td>
                  </tr> */}
                </tbody>
              </Table>

              <div className="mb-5 text-center">
                <Button
                  onClick={() => navigate("/register2")}
                  className="btn btn-success px-4 py-2 rounded shadow fw-bold"
                >
                  Register for Second Semester
                </Button>
                <h6 className="text-gray-700"><i>
                  Note:Second semester registration will open after the completion of the first semester.
                </i></h6>
              </div>

              {/* 🔹 Grades Section */}
              <h4 className="text-secondary mb-3 border-bottom pb-1">Academic Grades</h4>
              <Table striped bordered hover responsive className="table-sm">
                <thead className="table-primary">
                  <tr>
                    <th>Semester</th>
                    <th>Subject</th>
                    <th>Mentor</th>
                    <th>Grade</th>
                    <th>Points</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map((course) => {
                    const courseData = profileData?.grades?.[course.code] || {};
                    return (
                      <tr key={course.code}>
                        <td>{course.semester}</td>
                        <td>{course.title}</td>
                        <td>{course.mentor}</td>
                        <td>{courseData.grade ?? <em className="text-muted">Not Assigned</em>}</td>
                        <td>{courseData.pts?.toFixed(2) ?? "0.00"}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
              <h6 className="text-sm text-gray-600 italic"><i>
                Note: All grades will initially be <span className="font-semibold">F</span> and points will be <span className="font-semibold">0.00</span> until the mentor assigns marks.
              </i></h6>

              {/* 🔹 Logout */}
              <div className="text-center mt-4">
                <Button variant="outline-danger" onClick={logoutsession} className="w-50 shadow-sm fw-bold">
                  Logout
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
