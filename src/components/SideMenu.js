import React from 'react';
import { Nav, NavLink } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';


const SideMenu = ({setToken}) => {
  const sideMenuStyle = {
    backgroundColor: '#ADD8E6', // Light blue color
    height: '100vh',
    color: 'white',
    padding: '15px',
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    setToken(false);
    navigate("/login");
  }


  return (
    <Nav vertical style={sideMenuStyle}>
      <NavLink onClick={() => handleLogout()}>
        Logout <FaSignOutAlt />
      </NavLink>

    </Nav>
  );
};

export default SideMenu;
