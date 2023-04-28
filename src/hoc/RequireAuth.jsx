import React from 'react';
import { Navigate } from 'react-router-dom';
import { AdminProvider } from './Provider';

const RequireAuth = ({ children }) => {
    const { admin } = React.useContext(AdminProvider);

    if (!admin) {
        return <Navigate to="/login" />;
    }
    return children;
};

export default RequireAuth;
