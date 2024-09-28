import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../styles/Header.css";
import { getToken, logOut } from '../utils/getToken';


const Header = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        logOut();
        navigate('/login');
    };
    const token = getToken();
    return (
        <div className='header--container'>
            <div>
                <h1>Trello Replica</h1>
            </div>
            <div>
                {
                    !token ?
                        <>
                            <Link to="/login">
                                <button className='btn btn-primary'>
                                    Login
                                </button>
                            </Link>
                            <Link to="/signup">
                                <small className='ms-2'>Signup</small>
                            </Link>
                        </> :
                        <button onClick={handleLogout} className='btn btn-danger'>
                            <small className='ms-2'>Logout</small>
                        </button>
                }
            </div>
        </div>
    );
}

export default Header;
