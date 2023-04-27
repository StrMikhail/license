import React from 'react';
import { Form, Input, Typography, DatePicker, Button, Select } from 'antd';
import { transformDate } from '../../utils/transformDate';
import { formItemLayout, tailFormItemLayout } from '../../settings/formSettings';
import { downloadFile } from '../../utils/downloadFile';

const LicenseForm = ({ onSetStatus }) => {
    const [form] = Form.useForm();

    const getLicense = async (settings) => {
        try {
            const response = await fetch(process.env.REACT_APP_BACKEND_API + '/api', {
                method: 'POST',
                body: JSON.stringify(settings),
                headers: {
                    'Content-Type': 'application/json; application/csv',
                },
            });
            console.log(response);

            if (response.status > 399) throw new Error(response.status);
            onSetStatus(response.status);
            const blob = await response.blob();
            downloadFile(blob, `license.dat`);
        } catch (error) {
            onSetStatus(typeof +error.message === 'number' ? error.message : 404);
        }
    };

    const validateDate = (date) => {
        const month = 2629800000;
        const today = new Date();
        const licenseDate = new Date(date);
        const minLicenseDate = new Date(today);
        return licenseDate - minLicenseDate > month;
    };

    const calcDate = () => {
        const month = 2629800000 + 86400000;
        const today = Date.now();
        const monthPlus = today + month;
        return transformDate(new Date(monthPlus));
    };
    const handleSubmitForm = (values) => {
        const date = transformDate(values.edate);
        getLicense({ ...values, edate: date, ndate: transformDate(new Date()) });
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
            return value.length === 0 ? false : true;
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
        <Form
            {...formItemLayout}
            style={{ width: '350px' }}
            size="large"
            name="form"
            requiredMark="optional"
            onFinish={handleSubmitForm}
            scrollToFirstError
            form={form}>
            <Typography.Title level={3}>Генератор лицензии</Typography.Title>
            <Form.Item
                labelCol={{ span: 9 }}
                name="edate"
                tooltip={'Минимум 1 месяц'}
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
                            return Promise.reject(`Не ранее ${calcDate()}`);
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
            <Form.Item
                name="orgName"
                label="Организация"
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Введите организацию',
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
                            if (!value.length) return Promise.reject();
                            if (value && validateSelect(value)) {
                                return Promise.resolve();
                            }
                            return Promise.reject('Введен некоректный hwid');
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
    );
};

export default LicenseForm;
