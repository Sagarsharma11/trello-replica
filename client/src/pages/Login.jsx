import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import "../styles/Login.css";

const Login = () => {
    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    });

    const [errors, setErrors] = useState({});
    const navigate = useNavigate(); 

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials((prev) => ({ ...prev, [name]: value }));
        validateField(name, value);
    };

    const handleSubmit = async () => {
        if (isValid()) {
            try {
                const response = await axios.post('http://localhost:8000/api/v1/user/login', credentials);
                if (response.status === 200) {
                    console.log("Login successful:", response.data);
                    const token = response.data?.data?.token;
                    if (token) {
                        localStorage.setItem("trello-token", token);
                           setTimeout(() => {
                            navigate('/'); 
                        }, 1000);
                    } else {
                        setErrors({ api: "Unexpected response from server." });
                    }
                }
            } catch (error) {
                console.error("There was an error during login:", error);
                if (error.response && error.response.status === 401) {
                    setErrors({ api: "Invalid credentials. Please try again." });
                } else {
                    setErrors({ api: "Login failed. Please try again later." });
                }
            }
        } else {
            console.log("Form contains errors");
        }
    };

    const validateField = (name, value) => {
        let errorMsg = "";

        switch (name) {
            case "email":
                if (!emailRegex.test(value)) {
                    errorMsg = "Invalid email format";
                }
                break;
            case "password":
                if (!value) {
                    errorMsg = "Password is required";
                }
                break;
            default:
                break;
        }

        setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMsg }));
    };

    const isValid = () => {
        return (
            emailRegex.test(credentials.email) &&
            credentials.password &&
            Object.values(errors).every((error) => !error)
        );
    };

    return (
        <div className='Login--container'>
            <div className='Login--box'>
                <h2 className='fw-bold text-primary'>Login</h2>
                <div className='inner-box border border-primary border-2 rounded shadow'>
                    <input
                        onChange={handleChange}
                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                        name="email"
                        type="email"
                        placeholder='Email'
                    />
                    {errors.email && <small className="text-danger">{errors.email}</small>}

                    <input
                        onChange={handleChange}
                        className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                        name="password"
                        type="password"
                        placeholder='Password'
                    />
                    {errors.password && <small className="text-danger">{errors.password}</small>}

                    {errors.api && <small className="text-danger">{errors.api}</small>}

                    <button
                        disabled={!isValid()}
                        onClick={handleSubmit}
                        className='btn btn-primary w-100'
                    >
                        Login
                    </button>

                    <small className='fw-bold'>
                        Don't have an account? <span className='text-primary' onClick={() => navigate('/signup')}>Signup</span>
                    </small>

                    <button className='btn btn-primary mt-3'>
                        Login with <span className='fw-bold'>Google</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Login;
