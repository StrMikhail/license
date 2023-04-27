import React, { useEffect } from 'react';
import { Button, Form, Input, Typography } from 'antd';
import { formItemLayout, tailFormItemLayout } from '../../settings/formSettings';

const LoginForm = ({ handleFinish, error }) => {
    const [form] = Form.useForm();

    useEffect(() => {
        error.length && form.setFields(error);
    }, [error]);

    return (
        <Form
            {...formItemLayout}
            style={{ width: '350px' }}
            size="large"
            name="form"
            requiredMark="optional"
            onFinish={handleFinish}
            scrollToFirstError
            form={form}>
            <Typography.Title level={3}>Авторизация</Typography.Title>
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
    );
};

export default LoginForm;
