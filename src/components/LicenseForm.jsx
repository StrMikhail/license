import React, { useEffect, useState } from 'react';
import { Form, Input, Typography, DatePicker, Button, Upload, Select } from 'antd';
import { ReactComponent as Logo } from '../assets/svg/logo.svg';
import DownloadLink from 'react-download-link';
import brest from '../assets/img/astra.png';
import bit from '../assets/img/bit.png';

const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 6,
        },
    },
};

const tailFormItemLayout = {
    wrapperCol: {
        span: 24,
        offset: 0,
    },
};

const LicenseForm = () => {
    const [form] = Form.useForm();
    const [isDownload, setDownload] = useState(false);
    const [counter, setCounter] = useState(0);

    console.log(counter);
    // useEffect(() => {

    //     console.log(counter);
    // }, counter);

    const getLicense = async (settings) => {
        await fetch(process.env.REACT_APP_BACKEND_AP, {
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
            })
            .then(() => setDownload(true));
    };

    const transformDate = (date) => {
        const D = date.$D + 1 < 10 ? `0${date.$D}` : date.$D;
        const M = date.$M + 1 < 10 ? `0${date.$M + 1}` : date.$M + 1;
        const Y = date.$y;
        return `${D}/${M}/${Y}`;
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

    const onSelect = (value) => {
        if (value.length && /^([aA-zZ0-9]{8})$/.test(value[value.length - 1])) {
            form.setFieldValue('hwid', (value.error = 'asdasd'));
            return form.setFieldValue(
                'hwid',
                value.map((item) => item.toUpperCase()),
            );
        }
        return value.pop();
    };
    return (
        <>
            <>
                <Logo
                    className="logo"
                    onClick={() => counter < 5 && setCounter(counter + 1)}
                    style={{
                        transition: '.3s',
                        transform: `rotate(${counter == 5 ? 180 : 0}deg)`,
                        opacity: `${counter === 5 ? 0 : 1}`,
                    }}
                />
                {counter === 5 && (
                    <div
                        onClick={() => setCounter(0)}
                        style={{
                            width: '100%',
                            height: '200px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <img src={brest} alt="" height={'50%'} />
                        <img src={bit} alt="" height={'50%'} />
                    </div>
                )}
            </>
            <div className="license_form">
                <Form
                    {...formItemLayout}
                    style={{ width: '350px' }}
                    name="form"
                    requiredMark="optional"
                    onFinish={handleSubmitForm}
                    scrollToFirstError
                    form={form}>
                    {isDownload ? (
                        <div>
                            <Typography.Title level={4} style={{ textAlign: 'center' }}>
                                Лицензия успешно сгенерирована
                            </Typography.Title>
                            <Button
                                type="primary"
                                htmlType="submit"
                                block
                                onClick={() => setDownload(false)}>
                                Сгенерировать новую лицензию
                            </Button>
                        </div>
                    ) : (
                        <>
                            <Typography.Title level={3}>Продление лицензии</Typography.Title>

                            <Form.Item
                                name="fname"
                                label="Фамилия"
                                hasFeedback
                                normalize={(value) => value.trim()}
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
                                normalize={(value) => value.trim()}
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
                                hasFeedback
                                rules={[
                                    {
                                        required: true,
                                        message: 'Введите hwid',
                                    },
                                ]}>
                                <Select
                                    mode="tags"
                                    value="string"
                                    maxTagTextLength={8}
                                    onChange={onSelect}
                                    style={{ width: '100%' }}
                                />
                            </Form.Item>

                            <Form.Item
                                labelCol={{ span: 25 }}
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
                                            return Promise.reject(
                                                'Продлить лицензию можно минимум на 3 месяца',
                                            );
                                        },
                                    },
                                ]}>
                                <DatePicker
                                    placeholder="Выберете дату"
                                    format="DD/MM/YYYY"
                                    style={{ width: '100%' }}
                                />
                            </Form.Item>
                            <Form.Item {...tailFormItemLayout} required>
                                <Button type="primary" htmlType="submit" block>
                                    Сгенерировать лицензию
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form>
            </div>
        </>
    );
};

export default LicenseForm;
