// src/components/Header.js
import React from 'react';
import { Navbar, NavbarBrand, Nav, Badge, Container, NavLink } from 'reactstrap';

const Header = ({cart}) => {
  
  return (
    <Navbar color="dark" dark>
      <Container>
        <NavbarBrand href="/">My Shopping App</NavbarBrand>
        <Nav >
          
         
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
