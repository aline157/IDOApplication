
import { useState } from 'react'
import Header from '../../components/Header/Header';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Info from '@material-ui/icons/Info';

import IconButton from '@material-ui/core/IconButton';
import React , {useEffect} from 'react'
import './HomePage.css'
import { useNavigate } from 'react-router-dom';
import Banner from "../../components/NewBanner/newBanner";
import Card from "../../components/Card/Card";
import CardTodo from "../../components/CardTodo/CardTodo";
import axios from '../../api/axios';
const Edit_URL = 'Todo';
const Todo_URL = 'Todo/todo';
const Doing_URL = 'Todo/doing';
const Done_URL = 'Todo/done';
const GetId_URL = 'Todo/get';
const UserGet_URL = '/User/get';

const HomePage = () => {
    const [todos, setTodos] = useState(null);
    const [doing, setDoing] = useState(null);
    const [done, setDone] = useState(null);
    const [id, setId] = useState();

    const navigate = useNavigate();
    const [showBanner, setShowBanner] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const handleClickOpen = () => {
        navigate("/addTodo");
    };

    const handleClickShowBanner = () => {
        setShowBanner(true)
    };
    const handleEditTodo = async(id) => {
        console.log("Edit", id)
        const payload = {
            Id: id,
            
        }
        try {
            
            const response = await axios.post(GetId_URL, payload);
            console.log(JSON.stringify(response?.data));
            navigate("/editTodo", {
                state: {
                    title: response?.data.Title,
                    category: response?.data.Category,
                    importance: response?.data.Importance,
                    id: id,
                }
            });

        } catch (err) {
            
        }
        
    };
    const handleStartTodo = async(id,status) => {
        console.log("Start", id)
        
        const payload = {
            Id: id,
            Status: status,
        }
        try {
            
            const response = await axios.put(Edit_URL, payload);
            console.log(JSON.stringify(response?.data));
            getApiData()

        } catch (err) {
            
        }
    };
    const handleDoneTodo = async(id,status) => {
        console.log("Done", id)
        const payload = {
            Id: id,
            Status: status,
        }
        try {
            
            const response = await axios.put(Edit_URL, payload);
            console.log(JSON.stringify(response?.data));
            getApiData()

        } catch (err) {
            
        }
    };

    

    const getApiData = async () => {
        
        const payloadd = {
                Email : localStorage.getItem('user-info'),
              }
            console.log(payloadd)
            try {
                
                const response = await axios.post(Todo_URL,payloadd);
                console.log(JSON.stringify(response?.data));
                setTodos(response?.data);
        
            } catch (err) {
                
            }
            try {
                
                const response = await axios.post(Doing_URL,payloadd);
                console.log(JSON.stringify(response?.data));
                setDoing(response?.data);
        
            } catch (err) {
                
            }
            try {
                
                const response = await axios.post(Done_URL,payloadd);
                console.log(JSON.stringify(response?.data));
                setDone(response?.data);
        
            } catch (err) {
                
            }
        
        
        
    };
    useEffect(() => {
        
        getApiData();
    }, []);
   
    
    return (
      <>
        <Header onChange={(val)=> setSearchTerm(val) }></Header>
            <div />  
            {showBanner ? <Banner onChange={()=> setShowBanner(false) } /> :
                <IconButton
                style={{
                    position: 'fixed',
                    top: 100,
                    right: 0
                }}
			color="primary"
			aria-label="Add Todo"
			onClick={handleClickShowBanner}
			>
			<Info style={{ fontSize: 30 }} />
            </IconButton>}
            

        <IconButton
                style={{
                    position: 'fixed',
                    bottom: 0,
                    right: 0
                }}
			color="primary"
			aria-label="Add Todo"
			onClick={handleClickOpen}
			>
			<AddCircleIcon style={{ fontSize: 60 }} />
            </IconButton>
            
            <div class="container">
               
                <div class="leftpane">
                <Card text='To Do'></Card>
                    
                    {todos && todos.filter((val) => {
                            if (searchTerm == "") {
                                return val
                            } else if ((val.Title.toLowerCase().includes(searchTerm.toLowerCase())) || (val.Category.toLowerCase().includes(searchTerm.toLowerCase())) ) {
                                return val
                            }
                            
                        }) &&
                        todos.filter((val) => {
                            if (searchTerm == "") {
                                return val
                            } else if ((val.Title.toLowerCase().includes(searchTerm.toLowerCase())) || (val.Category.toLowerCase().includes(searchTerm.toLowerCase())) ) {
                                return val
                            }
                            
                        }).map((todo) => (
                            <CardTodo id={todo.Id} type='To Do' title={todo.Title} category={todo.Category} dueDate={todo.DueDate} importance={todo.Importance} editTodo={handleEditTodo} startTodo={handleStartTodo}></CardTodo>       
                        ))}
                    
                </div>

                <div class="middlepane">
                <Card text='Doing'></Card>
                {doing &&
                        doing.filter((val) => {
                            if (searchTerm == "") {
                                return val
                            } else if ((val.Title.toLowerCase().includes(searchTerm.toLowerCase())) || (val.Category.toLowerCase().includes(searchTerm.toLowerCase())) ) {
                                return val
                            }
                            
                        }).map((todo) => (
                            <CardTodo id={todo.Id} type='Doing' title={todo.Title} category={todo.Category} dueDate={todo.DueDate} importance={todo.Importance} editTodo={handleEditTodo} doneTodo={handleDoneTodo}></CardTodo>
                            
                    ))}
                </div>

                <div class="rightpane">
                <Card text='Doing'></Card>
                {done &&
                        done.filter((val) => {
                            if (searchTerm == "") {
                                return val
                            } else if ((val.Title.toLowerCase().includes(searchTerm.toLowerCase())) || (val.Category.toLowerCase().includes(searchTerm.toLowerCase())) ) {
                                return val
                            }
                            
                        }).map((todo) => (
                            <CardTodo type='Done' title={todo.Title} category={todo.Category} dueDate={todo.DueDate} importance={todo.Importance} ></CardTodo>
                            
                    ))}

                </div>
            </div>            
        </>

    );
};

export default HomePage;
