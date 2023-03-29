import { Button, Card, Typography } from 'antd';
import React from 'react';

const Error = ({ onClick }) => {
    return (
        <Card>
            <Typography.Title type="danger"> УПС! Что-то пошло не так</Typography.Title>
            <Typography.Title level={5}>Произошла некоторая ошибка!</Typography.Title>
            <Button block size="large" type="primary" onClick={() => onClick(false)}>
                Попробуйте еще раз
            </Button>
        </Card>
    );
};

export default Error;
