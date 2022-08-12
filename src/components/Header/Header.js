// import React, { useEffect } from "react";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import userimg from '../../Photos/avatar.png';
// import welcomeimg from '../../Photos/welcomeback.svg';
import welcomeimg from '../../Photos/photo.JPG';

import {
  Container,
  Form,
  FormControl,
  Nav,
    Navbar,
    
  NavDropdown,
} from "react-bootstrap";
// import { useDispatch, useSelector } from "react-redux";
import {} from "react-router-dom";
// import { logout } from "../actions/userActions";

function Header(props) {
//   const dispatch = useDispatch();

//   const userLogin = useSelector((state) => state.userLogin);
//   const { userInfo } = userLogin;

//   const logoutHandler = () => {
//     dispatch(logout());
//   };
    
const [success, setSuccess] = useState(false);
const navigate = useNavigate();

useEffect(() => {
    if (!localStorage.getItem('user-info')){
        navigate("/");
    } 
});
    const logoutHandler = async (e) => {
        if (success === true) {
            e.preventDefault();
        }
    e.preventDefault();
    localStorage.removeItem("user-info")
    setSuccess(true)
  }
  const profileHandler = async (e) => {
    e.preventDefault();
    navigate("/profile");
}

//   useEffect(() => {}, [userInfo]);

  return (
    <Navbar collapseOnSelect expand="lg"  bg="primary" variant="dark">
        <img
        alt=""
        src={welcomeimg}
        width="100"
        height="80"
        style={{ marginRight: 10 }}
        />
      {/* <Container> */}
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="m-auto">
            
          <Form inline>
                <FormControl
                  type="text"
                  placeholder="Search"
            className="mr-sm-2"
          
            
                  onChange={(e) => props.onChange(e.target.value)}
                  
                />
              </Form>
                     
                      
        </Nav>
        
                
                  <img
                      alt=""
                      src={userimg}
                      width="40"
                      height="40"
                      style={{ marginRight: 10 }}
                    />
          <Nav>
            
              <>
                {/* <Nav.Link >Aline</Nav.Link> */}
                <NavDropdown
                //   title={`${userInfo.name}`}
                  title={localStorage.getItem('user-info')}
                  id="collasible-nav-dropdown"
                >
                  <NavDropdown.Item onClick={profileHandler}>
                    
                    My Profile
                  </NavDropdown.Item>

                  <NavDropdown.Divider />
                                  <NavDropdown.Item
                                    onClick={logoutHandler}
                                  >
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            
          </Nav>
              </Navbar.Collapse>
              
      {/* </Container> */}
    </Navbar>
  );
}

export default Header;