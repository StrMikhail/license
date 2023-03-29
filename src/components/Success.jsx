import { Button, Card, Typography } from 'antd';
import React from 'react';

const Success = ({ onClick }) => {
    return (
        <Card>
            <Typography.Title type="success">Все прошло успешно!</Typography.Title>
            <Typography.Title level={5}>
                Лицензия автоматически загружена на Ваш компьютер
            </Typography.Title>
            <Button block size="large" type="primary" onClick={() => onClick(false)}>
                Сгенерировать еще
            </Button>
        </Card>
    );
};

export default Success;
