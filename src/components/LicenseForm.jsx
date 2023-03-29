import React, { useState } from 'react';
import { Form, Input, Typography, DatePicker, Button, Upload, Select, Card } from 'antd';
import Success from './Success';
import { transformDate } from '../utils/transformDate';

const formItemLayout = {
    labelCol: {
        xs: {
            span: 20,
        },
        sm: {
            span: 7,
            offset: 0,
        },
    },
};

const tailFormItemLayout = {
    wrapperCol: {
        span: 24,
        offset: 0,
    },
};

const LicenseForm = ({ onError, onSuccess }) => {
    const [form] = Form.useForm();

    const getLicense = async (settings) => {
        await fetch(process.env.REACT_APP_BACKEND_API, {
            method: 'POST',
            body: JSON.stringify(settings),
            headers: {
                'Content-Type': 'application/json; application/csv',
            },
        })
            .then((response) => response.blob())
            .then((blob) => {
                const url = window.URL.createObjectURL(new Blob([blob]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `license.dat`);
                document.body.appendChild(link);
                link.click();
                link.parentNode.removeChild(link);
                onSuccess(true);
            })
            .catch((error) => onError(error));
    };

    const validateDate = (date) => {
        const today = new Date();
        const licenseDate = new Date(transformDate(date).split('/').reverse());
        const minLicenseDate = new Date(today.setMonth(today.getMonth() + 3));
        return licenseDate >= minLicenseDate;
    };

    const handleSubmitForm = (values) => {
        const date = transformDate(values.edate);
        getLicense({ ...values, edate: date });
    };

    const isValideSelect = (value) => {
        return /^([aA-zZ0-9]{8})$/.test(value);
    };

    const validateSelect = (value) => {
        const fullArr = [...value];

        const lastEl = value.pop().toUpperCase();

        if (!isValideSelect(lastEl)) {
            form.setFieldValue(
                'hwid',
                value.map((i) => i.toUpperCase()),
            );
            return true;
        }
        if (value.includes(lastEl)) {
            form.setFieldValue(
                'hwid',
                value.map((i) => i.toUpperCase()),
            );
        } else {
            form.setFieldValue(
                'hwid',
                fullArr.map((i) => i.toUpperCase()),
            );
        }
        return true;
    };
    return (
        <Card className="license_form">
            <Form
                {...formItemLayout}
                style={{ width: '350px' }}
                size="large"
                name="form"
                requiredMark="optional"
                onFinish={handleSubmitForm}
                scrollToFirstError
                form={form}>
                <Typography.Title level={3}>Продление лицензии</Typography.Title>
                <Form.Item
                    labelCol={{ span: 9 }}
                    name="edate"
                    tooltip={'Минимум 3 месяца'}
                    label="Продлить до"
                    hasFeedback
                    validateFirst="parallel"
                    rules={[
                        {
                            required: true,
                            message: 'Выберите дату',
                        },
                        {
                            validator(_, value) {
                                if (value && validateDate(value)) {
                                    return Promise.resolve();
                                }
                                return Promise.reject('Не менее 3 месяцев');
                            },
                        },
                    ]}>
                    <DatePicker
                        placeholder="Выберете дату"
                        format="DD/MM/YYYY"
                        placement="topRight"
                        style={{ width: '100%' }}
                    />
                </Form.Item>
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
                    label="Имя"
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Введите имя',
                        },
                    ]}>
                    <Input allowClear={true} />
                </Form.Item>

                <Form.Item
                    name="hwid"
                    label="hwid"
                    tooltip={'8 символов'}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Введите hwid',
                        },
                        {
                            validator: (_, value) => {
                                if (value && validateSelect(value)) {
                                    return Promise.resolve();
                                }
                                return Promise.reject();
                            },
                        },
                    ]}>
                    <Select
                        mode="tags"
                        value={'string[]'}
                        maxTagTextLength={3}
                        maxTagCount={2}
                        optionFilterProp="value"
                    />
                </Form.Item>

                <Form.Item {...tailFormItemLayout} required>
                    <Button type="primary" htmlType="submit" block>
                        Сгенерировать лицензию
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default LicenseForm;
