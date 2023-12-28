// src/components/Login.js
import React, { useState } from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ setToken }) => {
  const [username, setUsername] = useState('kminchelle');
  const [password, setPassword] = useState('0lelplR');
  const navigate = useNavigate();

  localStorage.clear();

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://dummyjson.com/auth/login', {
        username,
        password,
      });

      const { token } = response.data;
      setToken(token);
      localStorage.setItem('token', token);

      if (response.status === 200) navigate('/');
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center vh-100">
      <Row>
        <Col style={{width: '200px'}}>
          <h2 className="text-center">Login</h2>
        
          <Form>
            <Row>
              
            <FormGroup>
            <Col>
              <Label for="username">Username</Label>
            </Col>
            <Col>
              <Input
                type="text"
                id="username"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              </Col>
            </FormGroup>
            </Row>
            <Row>
            <FormGroup>
              <Col>
              <Label for="password">Password</Label>
              </Col>
              <Col>
              <Input
                type="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              </Col>
            </FormGroup>
            </Row>
            <Row>
            <Col>
            <Button color="primary" onClick={handleLogin} className="w-100">
              Login
            </Button>
            </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
