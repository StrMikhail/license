import { Button, Card, Typography } from 'antd';
import React from 'react';

const Success = ({ onClick, title, buttonText }) => {
    return (
        <>
            <Typography.Title type="success">Все прошло успешно!</Typography.Title>
            <Typography.Title level={5}>{title}</Typography.Title>
            <Button block size="large" type="primary" onClick={() => onClick(false)}>
                {buttonText}
            </Button>
        </>
    );
};

export default Success;
