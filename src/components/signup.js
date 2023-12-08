import React, { useState } from 'react';
import styled from 'styled-components';
import axios  from 'axios';

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
border-radius:4px;
color: #fff;
cursor: pointer;
`;

const  Signup = () => {
  const [Email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async(e) => {
    e.preventDefault();
    console.log('Logging in with:', username, password);
    try {
      const response = await axios.post('http://localhost:4000/apis/user', {
        Email,
        username,
        password,
      });
      console.log('Signup successful:', response.data);
    } catch (error) {
      console.error('Error during signup:', error.message);
      // Handle error, show an error message, etc.
    }
  };

  return (
    <LoginPageContainer>
      <Header>Signup</Header>
          <LoginForm onSubmit={handleLogin}>
          <InputField
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <InputField
          type="text"
          placeholder="Email"
          value={Email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputField
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <SubmitButton type="submit">Signup</SubmitButton>
      </LoginForm>
    </LoginPageContainer>
  );
};

export default Signup;
