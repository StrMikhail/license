import { Button, Form, Input, Typography } from 'antd';
import React from 'react';
import { formItemLayout, tailFormItemLayout } from '../../settings/formSettings';

const AddUserForm = ({ onSubmit }) => {
    const [form] = Form.useForm();

    return (
        <Form
            {...formItemLayout}
            // style={{ width: '350px' }}
            size="large"
            name="form"
            requiredMark="optional"
            onFinish={() => onSubmit(form.getFieldValue())}
            scrollToFirstError
            form={form}>
            <Typography.Title level={4}>Присвоение прав генерации лицензии</Typography.Title>
            <Form.Item
                name="fname"
                label="Фамилия"
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Введите фамилию',
                    },
                ]}>
                <Input allowClear={true} />
            </Form.Item>

            <Form.Item
                name="lname"
                label="Пароль"
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Введите пароль',
                    },
                ]}>
                <Input.Password allowClear={true} />
            </Form.Item>
            <Form.Item {...tailFormItemLayout} required>
                <Button type="primary" htmlType="submit" block>
                    Добавить пользователя
                </Button>
            </Form.Item>
        </Form>
    );
};

export default AddUserForm;
