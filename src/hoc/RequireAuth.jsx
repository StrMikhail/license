import React, { useEffect } from 'react';
// import { useSelector } from 'react-redux';
import { Navigate, useLocation, Redirect } from 'react-router-dom';
import { AdminProvider } from './Provider';

const RequireAuth = ({ children }) => {
    const location = useLocation();

    const { admin, setAdmin } = React.useContext(AdminProvider);

    if (!admin) {
        return <Navigate to="/login" />;
    }
    return children;
};

export default RequireAuth;
