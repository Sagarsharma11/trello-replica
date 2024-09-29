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
                <h4>Trello Replica</h4>
            </div>
            <div>
                {
                    !token ?
                        <>
                            <Link to="/login">
                                <button className='btn btn-primary btn-sm'>
                                    Login
                                </button>
                            </Link>
                            <Link to="/signup">
                                <small className='ms-2 btn-sm'>Signup</small>
                            </Link>
                        </> :
                        <button onClick={handleLogout} className='btn btn-danger btn-sm' >
                            <small className='ms-2'>Logout</small>
                        </button>
                }
            </div>
        </div>
    );
}

export default Header;
