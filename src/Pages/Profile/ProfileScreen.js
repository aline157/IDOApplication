import React, { useState, useEffect , useRef } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import MainScreen from "../../components/MainScreen/MainScreen";
import "./ProfileScreen.css";
import Loading from "../../components/Loading/Loading";
// import { useDispatch, useSelector } from "react-redux";
// import { updateProfile } from "../../actions/userActions";
// import Loading from "../../components/Loading";
// import ErrorMessage from "./components/ErrorMessage";
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
//   const [picMessage, setPicMessage] = useState();

//   const dispatch = useDispatch();

//   const userLogin = useSelector((state) => state.userLogin);
//   const { userInfo } = userLogin;

//   const userUpdate = useSelector((state) => state.userUpdate);
//   const { loading, error, success } = userUpdate;

//   useEffect(() => {
//     if (!userInfo) {
//       history.push("/");
//     } else {
//       setName(userInfo.name);
//       setEmail(userInfo.email);
//       setPic(userInfo.pic);
//     }
//   }, [history, userInfo]);



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
        // console.log(JSON.stringify(response));
        // const accessToken = response?.data?.accessToken;
        // const roles = response?.data?.roles;
        // setSuccess(true);
        // response = await response.json()
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
      {/* {loading && <Loading />} */}
      <div>
        <Row className="profileContainer">
          <Col md={6}>
            <Form onSubmit={submitHandler}>
              {/* {loading && <Loading />} */}
              {/* {success && (
                <ErrorMessage variant="success">
                  Updated Successfully
                </ErrorMessage>
              )} */}
              {/* {error && <ErrorMessage variant="danger">{error}</ErrorMessage>} */}
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
              {/* {picMessage && (
                <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
              )} */}
              {/* <Form.Group controlId="pic">
                <Form.Label>Change Profile Picture</Form.Label>
                <Form.File
                //   onChange={(e) => postDetails(e.target.files[0])}
                //   id="custom-file"
                //   type="image/png"
                  label="Upload Profile Picture"
                  custom
                />
              </Form.Group> */}
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
            {/* <img src={pic} alt={name} className="profilePic" /> */}
          </Col>
        </Row>
      </div>
    </MainScreen>
  );
};

export default ProfileScreen;