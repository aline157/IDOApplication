import { useRef, useState,   useEffect} from 'react';
import './Register.css'
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import {Link} from 'react-router-dom';


const LOGIN_URL = '/User';



const Register = () => {
 
    
const[email,setEmail]=useState('');
const[pwd1,setPwd1]=useState('');
    const [pwd2, setPwd2] = useState('');

    const [errMsg, setErrMsg] = useState('');
    const errRef = useRef();
    const navigate = useNavigate();

    useEffect(() => {
        setErrMsg('');
        
    }, [email, pwd1,pwd2])


const handleSubmit =async (e)=>{
    e.preventDefault();
    const payload = {
        Email: email,
        Password: pwd1,
        ComfirmPassword: pwd2
    }
    try {
        
        const response = await axios.post(LOGIN_URL, 
            payload,
        );
        console.log(JSON.stringify(response?.data));

        setEmail('');
        setPwd1('');
        setPwd2('');
        // setSuccess(true);
        // response = await response.json()
        // localStorage.setItem("user-info", payload.Email)
        navigate("/")
    } catch (err) {
        if (!err?.response) {
            setErrMsg('No Server Response');
        }else if (err.response?.status === 409) {
            setErrMsg('User already exists');
        } else if (err.response?.status === 400) {
            setErrMsg('Password Not match');
        }  else {
            setErrMsg('Register Failed');
        }
        errRef.current.focus();
    }
}
    return (
        <div className='main-login'>
            <div className="login-contain">
                
                 <div className="left-side">
                         {/* <div className="img-class">
                              <img src={logo} id="img-id" alt="" />
                          </div> */}
                    <div className="top-right">
                       <p>Already have an Account?
                      
                          <Link id='Links-signin' to='/'>Sign In</Link>   
                          </p> 
            </div>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    
                        <form onSubmit={handleSubmit}>
                        <label htmlFor="emil1">Email</label>
                            <input placeholder="Enter your email..." type="email" onChange={(e) => setEmail(e.target.value)}
                            value={email} id="emil1" required/>
                        <label htmlFor="pwd1">Password</label>
                            <input placeholder="Enter password" type="password" autoComplete="false"
                            onChange={(e) => setPwd1(e.target.value)}
                            value={pwd1}
                        id="pwd1" required />
                    
                    <label htmlFor="pwd1">Password</label>
                            <input placeholder="Enter password" type="password" autoComplete="false"
                            onChange={(e) => setPwd2(e.target.value)}
                            value={pwd2}
                        id="pwd1" required />
                    
                            <button type="submit" id="sub_butt">Register</button>
                         </form>


                </div>
                </div>
        </div>
    )
}

export default Register;
