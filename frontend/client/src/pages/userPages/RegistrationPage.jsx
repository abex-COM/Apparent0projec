import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from "mdbreact";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
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
        "http://localhost:5000/api/users/signup",
        formData
      );
      console.log(response.data);
      navigate("/signin"); // Redirect to sign-in page upon success
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <MDBContainer>
      <MDBRow>
        <MDBCol md="6">
          <form onSubmit={handleSubmit}>
            <p className="h5 text-center mb-4">Sign up</p>
            <div className="grey-text">
              <MDBInput
                label="Your name"
                icon="user"
                group
                type="text"
                validate
                error="wrong"
                success="right"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
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
                label="Your role"
                icon="briefcase"
                group
                type="text"
                validate
                error="wrong"
                success="right"
                name="role"
                value={formData.role}
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
              <span>
                Already registered? <Link to="/signin">Sign in</Link>
              </span>
              <MDBBtn type="submit">Register</MDBBtn>
            </div>
          </form>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default RegistrationPage;
