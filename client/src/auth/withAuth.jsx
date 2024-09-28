import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { getToken } from '../utils/getToken';

const withAuth = (WrappedComponent) => {
    return (props) => {
        const [isAuthChecked, setIsAuthChecked] = useState(false);
        const token = getToken(); 
        useEffect(() => {
            setIsAuthChecked(true); 
        }, []);
        if (!isAuthChecked) {
            return null; 
        }
        return token ? (
            <WrappedComponent {...props} />
        ) : (
            <Navigate to="/login" replace />
        );
    };
};

export default withAuth;