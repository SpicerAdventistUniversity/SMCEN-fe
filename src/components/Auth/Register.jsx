import { useState } from "react";
import axios from "axios";
import { Form, Button, Container, Card, Alert, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

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
    phoneNumber: "",
    paymentScreenshot: null,
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  let navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, paymentScreenshot: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value ?? "");
      });

      await axios.post("http://localhost:5000/api/users/register", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Registration successful!");
      // navigate("/login"); // Redirect to login page after successful registration
      navigate("/"); // Redirect to home page after successful registration
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed. Please try again.");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Card className="p-4 shadow-lg w-100" style={{ maxWidth: "900px" }}>
        <Card.Body>
          <h2 className="text-center mb-4 text-primary">Register</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}

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

                <Form.Group className="mb-3">
                  <Form.Label>Name <span className="text-danger">*</span></Form.Label>
                  <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email <span className="text-danger">*</span></Form.Label>
                  <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Password <span className="text-danger">*</span></Form.Label>
                  <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} required />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Date of Birth <span className="text-danger">*</span></Form.Label>
                  <Form.Control type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Basis of Admission <span className="text-danger">*</span></Form.Label>
                  <Form.Control type="text" name="basisOfAdmission" value={formData.basisOfAdmission} onChange={handleChange} required />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>College Attended <span className="text-danger">*</span></Form.Label>
                  <Form.Control type="text" name="collegeAttended" value={formData.collegeAttended} onChange={handleChange} required />
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
                    <Form.Check inline label="Married" type="radio" name="maritalStatus" value="Married" onChange={handleChange} />
                    <Form.Check inline label="Unmarried" type="radio" name="maritalStatus" value="Unmarried" onChange={handleChange} />
                  </div>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Mother Tongue <span className="text-danger">*</span></Form.Label>
                  <Form.Control type="text" name="motherTongue" value={formData.motherTongue} onChange={handleChange} required />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Are you an Adventist? <span className="text-danger">*</span></Form.Label>
                  <div>
                    <Form.Check inline label="Yes" type="radio" name="isAdventist" value="Yes" onChange={handleChange} />
                    <Form.Check inline label="No" type="radio" name="isAdventist" value="No" onChange={handleChange} />
                  </div>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Union</Form.Label>
                  <Form.Control type="text" name="union" value={formData.union} onChange={handleChange} />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Section/Region/Conference</Form.Label>
                  <Form.Control type="text" name="sectionRegionConference" value={formData.sectionRegionConference} onChange={handleChange} />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Address</Form.Label>
                  <Form.Control as="textarea" rows={2} name="address" value={formData.address} onChange={handleChange} />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Phone Number <span className="text-danger">*</span></Form.Label>
                  <Form.Control type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Payment Screenshot <span className="text-danger">*</span></Form.Label>
                  <Form.Control type="file" name="paymentScreenshot" accept="image/*" onChange={handleFileChange} required />
                </Form.Group>
              </Col>
            </Row>

            <div className="text-center mt-4">
              <Button variant="primary" type="submit" className="px-5">
                Register
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Register;
