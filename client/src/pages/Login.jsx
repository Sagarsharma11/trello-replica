import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { clientId } from '../utils/credentials';
import { jwtDecode } from "jwt-decode";
import { loginApi, signup } from '../services/UserApis';
import "../styles/Login.css";

const Login = () => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
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
            await authenticateUser(credentials);
        } else {
            console.log("Form contains errors");
        }
    };

    const authenticateUser = async (userCredentials) => {
        try {
            const response = await loginApi(userCredentials);
            handleLoginResponse(response);
        } catch (error) {
            handleError(error);
        }
    };

    const validateField = (name, value) => {
        let errorMsg = "";
        if (name === "email" && !emailRegex.test(value)) {
            errorMsg = "Invalid email format";
        } else if (name === "password" && !value) {
            errorMsg = "Password is required";
        }
        setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMsg }));
    };

    const isValid = () => (
        emailRegex.test(credentials.email) &&
        credentials.password &&
        Object.values(errors).every((error) => !error)
    );

    const handleSuccess = async (ele) => {
        console.log("Google Login success: ", ele);
        const userData = jwtDecode(ele.credential);
        console.log("Decoded userData: ", userData);

        if (userData) {
            const userPayload = {
                firstName: userData.given_name,
                lastName: userData.family_name,
                email: userData.email,
                password: "google-login",
            };

            await handleGoogleLogin(userPayload);
        }
    };

    const handleGoogleLogin = async (userPayload) => {
        try {
            const response = await signup(userPayload);
            handleLoginResponse(response);
        } catch (signupError) {
            console.error("Signup failed, attempting login:", signupError);
            userPayload = {
                email:userPayload.email,
                password: userPayload.password
            }
            await authenticateUser(userPayload);
        }
    };

    const handleLoginResponse = (response) => {
        console.log("Login successful:", response);
        const token = response?.token;
        if (token) {
            localStorage.setItem("trello-token", token);
            navigate('/')
            // setTimeout(() => navigate('/'), 1000);
        } else {
            setErrors({ api: "Unexpected response from server." });
        }
    };

    const handleError = (error) => {
        console.error("Login error:", error);
        const message = error.response && error.response.status === 401
            ? "Invalid credentials. Please try again."
            : "Login failed. Please try again later.";
        setErrors({ api: message });
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
                        className='btn btn-primary w-100 btn-sm'
                    >
                        Login
                    </button>

                    <small className='fw-bold'>
                        Don't have an account? <span role="button" className='text-primary' onClick={() => navigate('/signup')}>Signup</span>
                    </small>

                    <GoogleLogin
                        clientId={clientId}
                        ux_mode="popup"
                        onSuccess={handleSuccess}
                        onError={() => console.log('Login Failed')}
                    />
                </div>
            </div>
        </div>
    );
};

export default Login;
