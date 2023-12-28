// src/App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import SideMenu from './components/SideMenu';
import Home from './components/Home';
import Login from './components/Login';
import Cart from './components/Cart';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; // You can create this file for additional custom styling

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [cart, setCart] = useState([]);
  // setToken(localStorage.getItem("token"))
  useEffect(()=>{
    if(!token) localStorage.clear();
  },[token])
  return (
    <Router>
      <div className="App">
        {token ? (
          <>
          <Header cart={cart}/>
          <Container fluid>
            <Row>
              <Col md={2}>
                <SideMenu setToken={setToken}/>
              </Col>
              <Col md={10}>
              <Routes>
                {/* <AuthenticatedRoute></AuthenticatedRoute> */}
                  <Route path="/" element={<Home token={token} setCart={setCart} />} />
                  <Route path="/login" element={<Login setToken={setToken} />} />
                  <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
                  <Route path="*" element={<Login setToken={setToken} />} />
                </Routes>
              </Col>
            </Row>
          </Container>
          <Footer />
          </>
        ): (
         
              <Routes>
                {/* <AuthenticatedRoute></AuthenticatedRoute> */}
                  <Route path="/" element={<Home token={token} setCart={setCart} />} />
                  <Route path="/login" element={<Login setToken={setToken} />} />
                  <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
                  <Route path="*" element={<Login setToken={setToken} />} />
                </Routes>
              
        ) }
        
      </div>
    </Router>
  );
}

export default App;
