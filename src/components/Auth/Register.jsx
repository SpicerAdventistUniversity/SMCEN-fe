

import { useState } from "react";
import axios from "axios";
import { Form, Button, Container, Card, Row, Col, InputGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Eye, EyeSlash } from "react-bootstrap-icons"; // 👀 Icons for password toggle

const Register = () => {
  const [formData, setFormData] = useState({
    registrationType: "NEW",
    name: "",
    email: "",
    password: "",
    dateOfBirth: "",
    basisOfAdmission: "",
    collegeAttended: "",
    gender: "",
    maritalStatus: "",
    motherTongue: "",
    isAdventist: "",
    union: "",
    sectionRegionConference: "",
    address: "",
    state: "",
    phoneNumber: "",
    paymentScreenshot: null,
    photo: null,
    selectedCourses: [],
    workplace: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [totalFee, setTotalFee] = useState(0); // To store calculated total fee
  const [showPassword, setShowPassword] = useState(false); // 🔹 Toggle Password
  let navigate = useNavigate();

  // Course data, split into two categories: Semester I and Semester II
  const firstSemesterCourses = [
    { code: "RELB151", title: "Christian Beliefs I", credit: 2, semester: "I", mentor: "Mrs. Sharon Clinton" },
    { code: "RELB291", title: "Apocalyptic Literature I", credit: 2, semester: "I", mentor: "Dr. Jesin Israel" },
    { code: "RELB125", title: "Life and Teachings of Jesus", credit: 3, semester: "I", mentor: "Mr. Gaiphun Gangmei" },
    { code: "RELB238", title: "Adventist Heritage", credit: 3, semester: "I", mentor: "Dr. Koberson Langhu" },
    { code: "EDUC231", title: "Philosophy of Education", credit: 2, semester: "I", mentor: "Dr. Carol Linda Kingston" },
  ];

  const handleChange = (e) => {
    // formData.selectedCourses = formData.selectedCourses || []; // Initialize selectedCourses if not already done
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // if (!formData.paymentScreenshot || formData.selectedCourses.length === 0) {
    //   setError("Please fill in all required fields.");
    //   return;
    // }
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  const handleCourseSelection = (e) => {
    const selectedCourseCode = e.target.value;
    let updatedSelectedCourses = [...formData.selectedCourses];

    if (e.target.checked) {
      updatedSelectedCourses.push(selectedCourseCode);
    } else {
      updatedSelectedCourses = updatedSelectedCourses.filter(
        (course) => course !== selectedCourseCode
      );
    }

    setFormData({ ...formData, selectedCourses: updatedSelectedCourses });

    // Calculate total fee
    let calculatedFee = 0;
    updatedSelectedCourses.forEach((courseCode) => {
      const course = [...firstSemesterCourses].find((c) => c.code === courseCode);
      if (course) {
        calculatedFee += course.credit * 18 * 75; // 75rs per class, 18 weeks
      }
    });

    // Add admission fee breakdown (application fee, postage, examination fee)
    const admissionFees = 1000; // Application + Postage + Examination
    calculatedFee += admissionFees;

    setTotalFee(calculatedFee);
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setError("");
  //   setSuccess("");

  //   try {
  //     const formDataToSend = new FormData();
  //     Object.entries(formData).forEach(([key, value]) => {
  //       if (key === "selectedCourses") {
  //         // Send selectedCourses as JSON string
  //         formDataToSend.append("selectedCourses", JSON.stringify(value));
  //       } else {
  //         formDataToSend.append(key, value ?? "");
  //       }
  //     });

  //     // Add totalFee to formData
  //     formDataToSend.append("totalFee", totalFee);

  //     await axios.post("https://smcen-be.onrender.com/api/users/register", formDataToSend, {
  //       headers: { "Content-Type": "multipart/form-data" },
  //     });

  //     toast.success("Registration successful!");
  //     navigate("/login");
  //   } catch (error) {
  //     console.error("Registration Error:", error);
  //     toast.error(error.response?.data?.message || "Registration failed. Please try again.");
  //   }
  // };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const formDataToSend = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        if (key === "selectedCourses") {
          value.forEach((course) => {
            formDataToSend.append("selectedCourses", course); // ✅ send each course
          });
        } else {
          formDataToSend.append(key, value ?? "");
        }
      });

      formDataToSend.append("totalFee", totalFee); // Also correct

      await axios.post("https://smcen-be.onrender.com/api/users/register", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Registration successful!");
      navigate("/login");
    } catch (error) {
      console.error("Registration Error:", error);
      toast.error(error.response?.data?.message || "Registration failed. Please try again.");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Card className="p-4 shadow-lg w-100" style={{ maxWidth: "900px" }}>
        <Card.Body>
          <div className="text-center mb-4">
            <h1 className="form-main-title">Spicer Memorial College</h1>
            <h5 className="form-sub-title">Enrichment Registration Form</h5>
          </div>

          <h5 className="form-section-title">Registration Type</h5>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Registration Type <span className="text-danger">*</span></Form.Label>
                  <div>
                    <Form.Check inline label="New" type="radio" name="registrationType" value="NEW" checked={formData.registrationType === "NEW"} onChange={handleChange} />
                    <Form.Check inline label="Old" type="radio" name="registrationType" value="OLD" checked={formData.registrationType === "OLD"} onChange={handleChange} />
                  </div>
                </Form.Group>
              </Col>
            </Row>

            <h5 className="form-section-title mt-4">Personal Information</h5>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Full Name <span className="text-danger">*</span></Form.Label>
                  <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>E-Mail <span className="text-danger">*</span></Form.Label>
                  <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
                </Form.Group>

                <Form.Group controlId="formPassword" className="mb-3">
                  <Form.Label>Password <span className="text-danger">*</span></Form.Label>
                  <InputGroup>
                    <Form.Control type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} required /><Button variant="outline-secondary" onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <EyeSlash /> : <Eye />} {/* 👀 Toggle Icon */}
                    </Button>
                  </InputGroup>

                  <h6 style={{ color: "red" }}><i>Create a new password</i></h6>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Date of Birth <span className="text-danger">*</span></Form.Label>
                  <Form.Control type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Gender <span className="text-danger">*</span></Form.Label>
                  <div>
                    <Form.Check inline label="Male" type="radio" name="gender" value="Male" onChange={handleChange} />
                    <Form.Check inline label="Female" type="radio" name="gender" value="Female" onChange={handleChange} />
                    <Form.Check inline label="Other" type="radio" name="gender" value="Other" onChange={handleChange} />
                  </div>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Marital Status <span className="text-danger">*</span></Form.Label>
                  <div>
                    <Form.Check inline label="Single" type="radio" name="maritalStatus" value="Single" onChange={handleChange} />
                    <Form.Check inline label="Married" type="radio" name="maritalStatus" value="Married" onChange={handleChange} />
                  </div>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Eligibility of Admission <span className="text-danger">*</span></Form.Label>
                  <Form.Control type="text" name="basisOfAdmission" value={formData.basisOfAdmission} onChange={handleChange} required />
                  <h6>(eg. Bachelor of Arts, Master of Science, 12th PASS)</h6>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>College Attended <span className="text-danger">*</span></Form.Label>
                  <Form.Control type="text" name="collegeAttended" value={formData.collegeAttended} onChange={handleChange} required />
                  <h6>(eg. Spicer Adventist University, Lowry Adventist College)</h6>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Mother Tongue <span className="text-danger">*</span></Form.Label>
                  <Form.Control type="text" name="motherTongue" value={formData.motherTongue} onChange={handleChange} required />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Full Address <span className="text-danger">*</span></Form.Label>
                  <Form.Control as="textarea" rows={2} name="address" value={formData.address} onChange={handleChange} required />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>State <span className="text-danger">*</span></Form.Label>
                  <Form.Control type="text" name="state" value={formData.state} onChange={handleChange} required />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Are you an Adventist? <span className="text-danger">*</span></Form.Label>
                  <div>
                    <Form.Check inline label="Yes" type="radio" name="isAdventist" value="Yes" onChange={handleChange} />
                    <Form.Check inline label="No" type="radio" name="isAdventist" value="No" onChange={handleChange} />
                  </div>
                </Form.Group>

                <Form.Group className="mb-3">
                  <h6>If Yes?</h6>
                  <Form.Label>Name of your Union</Form.Label>
                  <Form.Control type="text" name="union" value={formData.union} onChange={handleChange} />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Name of your Section/Region/Conference</Form.Label>
                  <Form.Control type="text" name="sectionRegionConference" value={formData.sectionRegionConference} onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Place of Work</Form.Label>
                  <Form.Control type="text" name="workplace" value={formData.workplace} onChange={handleChange} />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Phone Number <span className="text-danger">*</span></Form.Label>
                  <Form.Control type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Upload your photo <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="file"
                    name="photo"
                    onChange={handleFileChange}
                    required
                  />
                  <h6>Only JPG, JPEG, and PNG files are allowed</h6>
                </Form.Group>
              </Col>
            </Row>

            <h5 className="form-section-title mt-4">Course Selection <span className="text-danger">*</span></h5>
            <Row>
              <Col md={6}>
                <h6>Semester I</h6>
                {firstSemesterCourses.map((course) => (
                  <Form.Check
                    key={course.code}
                    type="checkbox"
                    label={`${course.code} ${course.title}`}
                    value={course.code}
                    checked={formData.selectedCourses.includes(course.code)}
                    onChange={handleCourseSelection}
                  />
                ))}
              </Col>
            </Row>

            {/* Note and Fee Calculation Box */}
            <div className="mt-3 p-4 border rounded bg-light">
              <h6>Note:</h6>
              <ul>
                <li>All courses are mandatory for new students.</li>
                <li>Old Students should register for the courses not completed.</li>
              </ul>
              <h6>Fee Calculation:</h6>
              <p>
                Each course is charged ₹75 per class, and each semester consists of 18 weeks.
                For example, a 3-credit course will cost ₹75 x 18 weeks x 3 credits = ₹4050.
              </p>
              <h6>Breakdown:</h6>
              <ul>
                <li>Application Fee: ₹300</li>
                <li>Postage: ₹200</li>
                <li>Examination Fee: ₹500</li>
                <li><strong>Total Admission Fees: ₹1000</strong></li>
              </ul>
              <Form.Group className="mt-3">
                <Form.Label style={{ color: "#D9534F" }} name='totalFee'>Total Payment: ₹{totalFee}</Form.Label>
                <Form.Control type="hidden" name="totalFee" value={totalFee} />
              </Form.Group>
            </div>

            {/* Payment Account Details Section */}
            <div style={{ backgroundColor: "#f0f8ff", padding: "20px", marginTop: "30px", borderRadius: "8px", color: "#003366" }}>
              <h5>Payment Account Details</h5>
              <p><strong>Account Name:</strong> SPICER MEMORIAL COLLEGE</p>
              <p><strong>Account Number:</strong> 052210100001351</p>
              <p><strong>IFSC Code:</strong> BKID0000522</p>
              <p><strong>Contact:</strong> +91 86238 27226</p>
            </div>
            <Form.Group className="mb-3">
              <Form.Label>Payment Screenshot <span className="text-danger">*</span></Form.Label>
              <Form.Control
                type="file"
                name="paymentScreenshot"
                onChange={handleFileChange}
                required
              />
              <h6>Only JPG, JPEG, and PNG files are allowed</h6>
            </Form.Group>

            {/* Submit Button */}
            <div className="d-flex justify-content-center mt-4">
              <Button variant="primary" type="submit" disabled={!formData.selectedCourses.length}>Submit Registration</Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Register;
