import React, { useState } from 'react';
import { useNavigate } from "react-router-dom"; // Import useHistory
import axios from "axios";
import LoginNavbar from '../Navbar/login-navbar';


function LoginForm() {
    const [error, setError] = useState('');
    const [inputValue, setInputValue] = useState({
        email: "",
        password: "",
        role: " ", // Default role is student
    });
    
    const navigate = useNavigate();
    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setInputValue({
            ...inputValue,
            [name]: value,
        });
    };
        const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const  data  = await axios.post(
                "http://localhost:8000/api/auth/login",
                inputValue,
                { withCredentials: true }
            );
            console.log(data);
            const { msg, token, userId, role } = data.data;
            console.log("156====>", role);
            
            if (data.status === 200) {
                localStorage.setItem("Token", token);
                if(role === 'ADMIN') {
                    navigate("/dashboard")
                }
                else if(role === 'STUDENT') {
                    navigate("/stdashboard")}
                    else if(role === 'HOD') {
                        navigate("/hod_dashboard")
                    }
                else{
                    alert("Please enter a role");
                }
              
                
            } else {
                setError("Invalid email or password");
            }
        } catch (error) {
            console.error("Login error: ", error);
            setError("An error occurred while logging in. Please try again later.");
        }
    };

    return ( 
        <div className='mainbody'>
        <LoginNavbar />
        <div className = "body">
            <h2 className='login-page-heading'>Welcome <br />to <br />LMS Portal</h2> 
        <div className = "main-box">
        <div className = "forms">
        <h2 className='login-heading'>LogIn Here</h2> 

        {/* {error && <div>{error}</div>} */}
        <form className = 'form' onSubmit = { handleSubmit } >
        <input 
            className = 'login-input'
            type = "text"
            name = "email"
            value = { inputValue.email }
            onChange = { handleOnChange }
            placeholder = "Email"/>
        <input 
            className = 'login-input'
            type = "password"
            name = "password"
            value = { inputValue.password }
            onChange = { handleOnChange }
            placeholder = "Password"/>
        < button className = 'button' type = "submit"> Login </button> 
        </form> 
        </div> 
        </div> 
        </div>
        </div>
    );
}

export default LoginForm;















 



               





