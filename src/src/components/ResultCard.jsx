import { Button, Result } from 'antd';
import React from 'react';
import { result } from '../settings/resultsSettings';

const ResultCard = ({ onClick, name }) => {
    const { status, title, text, buttonText } = result[name];

    return (
        <Result
            status={status}
            title={title}
            subTitle={text}
            extra={[
                <Button type="primary" key="console" onClick={() => onClick('')}>
                    {buttonText}
                </Button>,
            ]}
        />
    );
};

export default ResultCard;
