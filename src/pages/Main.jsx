import React, { useState } from 'react';
import LicenseForm from '../components/forms/LicenseForm';
import { ReactComponent as Toogle } from '../assets/svg/Toogle.svg';
import { Link } from 'react-router-dom';
import { Card } from 'antd';
import ResultCard from '../components/ResultCard';
import { Tabs } from 'antd';
import FileLoader from '../components/FileLoader';
// import type { TabsProps } from 'antd';

const Main = () => {
    const [status, setStatus] = useState();

    const handleSetStatus = (status) => {
        setStatus(status);
    };

    const items = [
        {
            key: '1',
            label: `Генератор лицензии`,
            children: (
                <>
                    {!status ? (
                        <LicenseForm onSetStatus={handleSetStatus} />
                    ) : (
                        <ResultCard name={status} onClick={handleSetStatus} />
                    )}
                </>
            ),
        },
        {
            key: '2',
            label: `Проверка лицензии`,
            children: <FileLoader />,
        },
    ];

    return (
        <>
            <Card
                style={{
                    width: '400px',
                }}>
                <Tabs defaultActiveKey="1" size="small" items={items} />
            </Card>
            <Link to="admin">
                <Toogle className="adm" />
            </Link>
        </>
    );
};

export default Main;
