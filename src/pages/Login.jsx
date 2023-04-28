import { Card } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminProvider } from '../hoc/Provider';
import LoginForm from '../components/forms/LoginForm';

const Login = () => {
    const navigate = useNavigate();
    const { setAdmin } = React.useContext(AdminProvider);
    const [error, setError] = useState([]);

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
