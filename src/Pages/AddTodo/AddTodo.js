import React, { useState, useEffect , useRef } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import MainScreen from "../../components/MainScreen/MainScreen";
import "./AddTodo.css";
import Loading from "../../components/Loading/Loading";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import {useLocation} from 'react-router-dom';
const Todo_URL = '/Todo';
const UserGet_URL = '/User/get';



const AddTodo = () => {
  
  const [title, setTitle] = useState("");
  const [id, setId] = useState();
    const [category, setCategory] = useState("");
    const [importance, setImportance] = useState("High");
    const [dueDate, setDueDate] = useState(new Date());
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
    const errRef = useRef();
    
  const [errMsg, setErrMsg] = useState('');


    useEffect(() => {
        setErrMsg('');
    }, [title,category,importance])

  const submitHandler = async (e) => {
    
    e.preventDefault();
      const payload = {
        Title : title,
        Category : category,
        DueDate : dueDate,
        Importance: importance,
        UserEmail: localStorage.getItem('user-info')
      }
      console.log(payload)
    try {
      setLoading(true);
        const response = await axios.post(Todo_URL, 
            payload,
        );
        console.log(JSON.stringify(response?.data));
        setLoading(false);
        setTitle("")
        setCategory("")
      setDueDate(new Date())
      setImportance("")
      navigate("/homePage")
    } catch (err) {
        if (!err?.response) {
            setErrMsg('No Server Response');
        } else if (err.response?.status === 400) {
            setErrMsg('Bad Request');
        }  else {
            setErrMsg('Add Todo Failed');
        }
        errRef.current.focus();
      }
      
  };

  return (
      <MainScreen title="Add New Todo">
      <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
      {loading && <Loading />}
      <div>
        <Row className="profileContainer">
          <Col md={6}>
        <Form onSubmit={submitHandler}>
                          
              <Form.Group >
                <Form.Label>Title</Form.Label>
                <Form.Control
                  placeholder="Enter Todo Title"
                  value={title}
                  required
                  onChange={(e) => setTitle(e.target.value)}
                ></Form.Control>
               </Form.Group>
                          
               <Form.Group >
                <Form.Label>Category</Form.Label>
                <Form.Control
                  placeholder="Enter Todo Category"
                  value={category}
                  required
                  onChange={(e) => setCategory(e.target.value)}
                ></Form.Control>
                          </Form.Group>
                          
              <Form.Group>
                <Form.Label>Enter Todo Importance</Form.Label>
                <Form.Select onChange={(e) => setImportance(e.target.value)} required >
                                  <option>High</option>
                                  <option>Medium</option>
                                  <option>Low</option>
                </Form.Select>
              </Form.Group>
              
              <Form.Group>
              <Form.Label>Due Date</Form.Label>
                <DatePicker selected={dueDate}
                  onChange={(date: Date) => setDueDate(date)} />
                </Form.Group>
                <br></br>
              <Button type="submit" varient="primary">
                Add Todo
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

export default AddTodo;