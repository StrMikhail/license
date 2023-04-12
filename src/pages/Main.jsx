import React, { useState } from 'react';
import LicenseForm from '../components/forms/LicenseForm';
import { ReactComponent as Toogle } from '../assets/svg/Toogle.svg';
import { Link } from 'react-router-dom';
import { Card } from 'antd';
import ResultCard from '../components/ResultCard';

const Main = () => {
    const [status, setStatus] = useState();

    const handleSetStatus = (status) => {
        setStatus(status);
    };

    return (
        <>
            <Card>
                {!status ? (
                    <LicenseForm onSetStatus={handleSetStatus} />
                ) : (
                    <ResultCard name={status} onClick={handleSetStatus} />
                )}
            </Card>
            <Link to="admin">
                <Toogle className="adm" />
            </Link>
        </>
    );
};

export default Main;
