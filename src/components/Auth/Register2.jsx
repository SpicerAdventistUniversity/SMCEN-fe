import { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button, Container, Card, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Register2 = () => {
    const [formData, setFormData] = useState({
        name: "",
        registrationNumber: "",
        selectedCourses: [],
    });

    const [totalFee, setTotalFee] = useState(0); // To store calculated total fee
    let navigate = useNavigate();

    // Course data, split into two categories: Semester I and Semester II
    const SecondSemesterCourses = [
        { code: "WREL234", title: "Religions of the World", credit: 3, semester: "II", mentor: "Mr. Gaiphun Gangmei" },
        { code: "HLED121", title: "Personal Health", credit: 2, semester: "II", mentor: "Pr. Vanlaltluaga Khuma" },
        { code: "RELB152", title: "Christian Beliefs II", credit: 2, semester: "II", mentor: "Mrs. Sharon Clinton" },
        { code: "FNCE252", title: "Church Stewardship & Finance", credit: 3, semester: "II", mentor: "Mr. Abhishek Lakra" },
        { code: "RELB292", title: "Apocalyptic Literature II", credit: 2, semester: "II", mentor: "Dr. Jesin Israel" },
    ];

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, paymentScreenshot: e.target.files[0] });
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
    };

    // Function to calculate total fee based on selected courses
    const calculateTotalFee = () => {
        const feePerClass = 75; // Fee per class
        const weeksPerSemester = 18; // Number of weeks in the semester

        const total = formData.selectedCourses.reduce((acc, courseCode) => {
            const course = SecondSemesterCourses.find(course => course.code === courseCode);
            if (course) {
                acc += feePerClass * weeksPerSemester * course.credit; // Calculate fee per course
            }
            return acc;
        }, 0);

        setTotalFee(total); // Update the total fee
    };

    // Recalculate total fee whenever selected courses change
    useEffect(() => {
        calculateTotalFee();
    }, [formData.selectedCourses]);

const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const formDataToSend = new FormData();
for (const [key, value] of Object.entries(formData)) {
    if (value !== undefined && value !== null) {
        formDataToSend.append(key, value);
    }
}


        formDataToSend.append("totalFee", totalFee);  // Append totalFee

        await axios.post("https://smcen-be.onrender.com/api/users/register2", formDataToSend, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        toast.success("Registration successful!");
        alert("Registration successful.");
        navigate('/login')
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
                        <h5 className="form-sub-title">Enrichment Course Second Semester Registration</h5>
                    </div>

                    <Form onSubmit={handleSubmit}>
                        <h5 className="form-section-title mt-4">Personal Information</h5>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Full Name <span className="text-danger">*</span></Form.Label>
                                    <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Registration Number <span className="text-danger">*</span></Form.Label>
                                    <Form.Control type="text" name="registrationNumber" value={formData.registrationNumber} onChange={handleChange} required />
                                </Form.Group>
                            </Col>
                        </Row>

                        <h5 className="form-section-title mt-4">Course Selection <span className="text-danger">*</span></h5>
                        <Row>
                            <Col md={6}>
                                <h6>Semester II</h6>
                                {SecondSemesterCourses.map((course) => (
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
                                <li>New candidates should take all courses as mandatory.</li>
                                <li>Those who have already registered and completed some courses can skip the courses.</li>
                            </ul>
                            <h6>Fee Calculation:</h6>
                            <p>
                                Each course is charged ₹75 per class, and each semester consists of 18 weeks.
                                For example, a 3-credit course will cost ₹75 x 18 weeks x 3 credits = ₹4050.
                            </p>
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
                        </Form.Group>

                        {/* Submit Button */}
                        <div className="d-flex justify-content-center mt-4">
                            <Button variant="primary" type="submit" disabled={!formData.selectedCourses.length}>Submit</Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Register2;
