import React, { useState, useEffect , useRef } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import MainScreen from "../../components/MainScreen/MainScreen";
import "./ProfileScreen.css";
import Loading from "../../components/Loading/Loading";
import axios from '../../api/axios';
import { useNavigate } from 'react-router-dom';
const LOGIN_URL = '/User';
const ProfileScreen = ({ location, history }) => {
  
//   const [pic, setPic] = useState();
const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
    const errRef = useRef();
    const navigate = useNavigate();
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        setErrMsg('');
    }, [password, oldPassword,confirmPassword])

  const submitHandler = async (e) => {
    
      e.preventDefault();
      const payload = {
        Email: localStorage.getItem("user-info").toString() ,
        OldPassword: oldPassword,
        NewPassword: password,
        ComfirmPassword: confirmPassword,
      }
      console.log(payload)
    try {
      setLoading(true);
        const response = await axios.put(LOGIN_URL, 
            payload,
        );
        console.log(JSON.stringify(response?.data));
        setLoading(false);
        setPassword("")
        setOldPassword("")
        setConfirmPassword("")
        
        navigate("/homePage")
    } catch (err) {
        if (!err?.response) {
            setErrMsg('No Server Response');
        } else if (err.response?.status === 400) {
            setErrMsg('password not match');
        } else if (err.response?.status === 401) {
            setErrMsg('incorrect password');
        } else {
            setErrMsg('Update Failed');
        }
        errRef.current.focus();
      }
      
  };

  return (
      <MainScreen title="EDIT PROFILE">
      <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
      
      <div>
        <Row className="profileContainer">
          <Col md={6}>
            <Form onSubmit={submitHandler}>
             
              <Form.Group controlId="password">
                <Form.Label>Old Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter Old Password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>
              
              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="confirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>{" "}
             
                <br></br>
              <Button type="submit" varient="primary">
                Update
              </Button>
            </Form>
          </Col>
          <Col
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
          
          </Col>
        </Row>
      </div>
    </MainScreen>
  );
};

export default ProfileScreen;