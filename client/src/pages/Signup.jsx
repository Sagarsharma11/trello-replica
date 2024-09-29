import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../services/UserApis';
import "../styles/Signup.css";

const Signup = () => {
    const [userInfo, setUserInfo] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        rePassword: ""
    });

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^\d{4}$/; // Assuming password must be exactly 4 digits

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserInfo((prev) => ({ ...prev, [name]: value }));
        validateField(name, value);
    };

    const handleSubmit = async () => {
        if (isValid()) {
            try {
                await signup(userInfo); // Use the imported signup function
                console.log("Registration successful");
                navigate('/login');
            } catch (error) {
                console.error("There was an error during registration:", error);
                setErrors({ ...errors, api: "Registration failed. Please try again." });
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
                if (!passwordRegex.test(value)) {
                    errorMsg = "Password must be exactly 4 digits";
                }
                break;
            case "rePassword":
                if (value !== userInfo.password) {
                    errorMsg = "Passwords do not match";
                }
                break;
            default:
                if (!value) {
                    errorMsg = `${name} is required`;
                }
                break;
        }

        setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMsg }));
    };

    const isValid = () => {
        return (
            userInfo.firstName &&
            userInfo.lastName &&
            emailRegex.test(userInfo.email) &&
            passwordRegex.test(userInfo.password) &&
            userInfo.password === userInfo.rePassword &&
            Object.values(errors).every((error) => !error)
        );
    };

    return (
        <div className="Signup--container">
            <div className="Signup--box">
                <h2 className="fw-bold text-primary">Signup</h2>
                <div className="inner-box border border-primary border-2 rounded shadow">
                    <input
                        onChange={handleChange}
                        className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                        name="firstName"
                        type="text"
                        placeholder="First Name"
                    />
                    {errors.firstName && <small className="text-danger">{errors.firstName}</small>}

                    <input
                        onChange={handleChange}
                        className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                        name="lastName"
                        type="text"
                        placeholder="Last Name"
                    />
                    {errors.lastName && <small className="text-danger">{errors.lastName}</small>}

                    <input
                        onChange={handleChange}
                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                        name="email"
                        type="email"
                        placeholder="Email"
                    />
                    {errors.email && <small className="text-danger">{errors.email}</small>}

                    <input
                        onChange={handleChange}
                        className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                        name="password"
                        type="password"
                        placeholder="Password"
                    />
                    {errors.password && <small className="text-danger">{errors.password}</small>}

                    <input
                        onChange={handleChange}
                        className={`form-control ${errors.rePassword ? 'is-invalid' : ''}`}
                        name="rePassword"
                        type="password"
                        placeholder="Confirm Password"
                    />
                    {errors.rePassword && <small className="text-danger">{errors.rePassword}</small>}

                    {errors.api && <small className="text-danger">{errors.api}</small>}

                    <button
                        disabled={!isValid()}
                        onClick={handleSubmit}
                        className="btn btn-primary w-100 btn-sm"
                    >
                        Signup
                    </button>

                    <small className="fw-bold">
                        Already have an account? <span onClick={() => navigate('/login')} role="button" className="text-primary">Login</span>
                    </small>
                </div>
            </div>
        </div>
    );
};

export default Signup;
