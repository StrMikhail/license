import { Button, Card, Form, Input, Typography } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminProvider } from '../hoc/Provider';
import LoginForm from '../components/forms/LoginForm';

const Login = () => {
    const navigate = useNavigate();
    const { setAdmin } = React.useContext(AdminProvider);
    const [error, setError] = useState([]);

    const checkAdmin = async (data) => {
        await fetch(process.env.REACT_APP_BACKEND_API, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json; application/csv',
            },
        })
            .then((response) => console.log(response))
            .catch((error) => console.log(error));
    };

    const handleSubmitForm = (values) => {
        if (values.login === 'admin' && values.password === 'P@ssw0rd') {
            navigate('/admin');
            setAdmin(true);
        } else {
            setError([
                { name: 'login', errors: ['Ты не мой властелин! Кыш отсюда!'] },
                { name: 'password', errors: [''] },
            ]);
            setAdmin(false);
        }
    };

    return (
        <div className="content">
            <Card>
                <LoginForm handleFinish={handleSubmitForm} error={error} />
            </Card>
        </div>
    );
};

export default Login;
