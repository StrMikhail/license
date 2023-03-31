import { Button, Card, Form, Input, Typography } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminProvider } from '../hoc/Provider';
import { formItemLayout, tailFormItemLayout } from '../settings/formSettings';

const Login = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const { setAdmin } = React.useContext(AdminProvider);

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
        if (values.login === 'admin' && values.password === 'admin') {
            navigate('/admin');
            setAdmin(true);
        } else {
            form.setFields([
                { name: 'password', errors: ['Ты не мой властелин! Кыш отсюда!'] },
                { name: 'login', errors: ['Ты не мой властелин! Кыш отсюда!'] },
            ]);
            setAdmin(false);
        }
    };

    return (
        <Card>
            <Form
                {...formItemLayout}
                style={{ width: '350px' }}
                size="large"
                name="form"
                requiredMark="optional"
                onFinish={handleSubmitForm}
                scrollToFirstError
                form={form}>
                <Typography.Title level={3}>Автоизация</Typography.Title>
                <Form.Item
                    name="login"
                    label="Логин"
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Кто ты, путник?',
                        },
                    ]}>
                    <Input allowClear={true} />
                </Form.Item>
                <Form.Item
                    name="password"
                    label="Пароль"
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Напиши кодовое слово',
                        },
                    ]}>
                    <Input.Password allowClear={true} />
                </Form.Item>
                <Form.Item {...tailFormItemLayout} required>
                    <Button type="primary" htmlType="submit" block>
                        Пройти проверку на властелина
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default Login;
