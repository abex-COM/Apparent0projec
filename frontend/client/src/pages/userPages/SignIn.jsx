import { useState } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from "mdbreact";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const SignInPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/signin",
        formData
      );
      console.log(response.data);
      localStorage.setItem("token", response.data.token); // Store the token in localStorage
      console.log("Token creatd Succefully");
      navigate("/tasks"); // Redirect to TaskPage upon success
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <MDBContainer>
      <MDBRow>
        <MDBCol md="6">
          <form onSubmit={handleSubmit}>
            <p className="h5 text-center mb-4">Sign in</p>
            <div className="grey-text">
              <MDBInput
                label="Your email"
                icon="envelope"
                group
                type="email"
                validate
                error="wrong"
                success="right"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              <MDBInput
                label="Your password"
                icon="lock"
                group
                type="password"
                validate
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div className="text-center">
              <MDBBtn type="submit">Sign In</MDBBtn>
            </div>
          </form>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default SignInPage;
