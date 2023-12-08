import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import {useNavigate } from 'react-router-dom';




const LoginPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
  background-color: #e9e2d0; /* Set background color to the desired color */
  box-shadow: 10px 0 10px rgba(0, 0, 0, 0.1); /* Add a shadow */
  border-radius: 8px; /* Optional: Add border-radius for rounded corners */
  padding: 20px;
`;

const Header = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
`;

const InputField = styled.input`
  margin-bottom: 10px;
  padding: 8px;
  font-size: 16px;
`;

const SubmitButton = styled.button`
  padding: 2px;
  font-size: 16px;
  background-color: #ff41ed;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
`;

const Login = () => {
    

  const navigate = useNavigate();
  const [Email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Logging in with:", Email, password);
    try {
      const response = await axios.post("http://localhost:4000/apis/login", {
        Email,
        password,
      });
      console.log("login successful:", response.data);
      const token = response.data.token;
      localStorage.setItem('token', token);
      navigate('/');
      // if (token) {
         // Adjust the route based on your setup
      // }
        

      // Handle successful login, e.g., redirect the user to another page
    } catch (error) {
      console.error("Error during login:", error.message);
      // Handle error, show an error message to the user, etc.
    }
  };

  return (
    <LoginPageContainer>
      <Header>LOGIN</Header>
      <LoginForm onSubmit={handleLogin}>
        <InputField
          type="text"
          placeholder="Username or Email"
          value={Email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputField
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <SubmitButton type="submit">Log In</SubmitButton>
        <p>
          NOT A MEMBER ?
          <span>
            <Link to="/sign">Signup</Link>
          </span>
        </p>
      </LoginForm>
    </LoginPageContainer>
  );
};

export default Login;
