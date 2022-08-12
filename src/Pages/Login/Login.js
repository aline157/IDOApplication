import { useRef, useState,  useContext , useEffect} from 'react';
import AuthContext from "../../context/AuthProvider";
import './Login.css';
import {Link} from 'react-router-dom';
import welcomeimg from '../../Photos/photo.JPG';
import axios from '../../api/axios';
import { useNavigate } from 'react-router-dom';
const LOGIN_URL = 'User/login';


const Login = () => {
    const { setAuth } = useContext(AuthContext);
    const errRef = useRef();
    const navigate = useNavigate();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
 
    useEffect(() => {
        setErrMsg('');
        
    }, [user, pwd])

    useEffect(() => {
        if (localStorage.getItem('user-info')){
            navigate("/homePage");
        } 
      });

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            Email: user,
            Password: pwd,
        }
        try {
            
            const response = await axios.post(LOGIN_URL, 
                payload,
            );
            console.log(JSON.stringify(response?.data));
           
            setAuth({user, pwd});
            setUser('');
            setPwd('');
            localStorage.setItem("user-info", payload.Email)
            navigate("/homePage")
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 404) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }

    return (
        <div className='main-login'>
            <div className="login-contain">
            <div className="left-side">
                    
                    <div className="welcomeImg">
                        <img src={welcomeimg} style={{marginTop:"80px"}} id='wel-img-id' alt=""  />
                    </div>
                </div>
                
                 <div className="right-side">
                    
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                  
                        <form onSubmit={handleSubmit}>
                        <label htmlFor="emil1">Email</label>
                            <input placeholder="Enter your email..." type="email" onChange={(e) => setUser(e.target.value)}
                            value={user} id="emil1" required/>
                        <label htmlFor="pwd1">Password</label>
                            <input placeholder="Enter password" type="password" autoComplete="false"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                             id="pwd1" required/>
                            <button type="submit" id="sub_butt">Login</button>
                         </form>

                         <div className="footer">
                             <h4>Don't have an Account ? <Link   className='link' to='/Register'>Register Now</Link></h4>
                         </div>

                 </div>
                  

                </div>
        </div>
    )
}

export default Login
