import React, { useState } from 'react';
import Error from '../components/Error';
import LicenseForm from '../components/LicenseForm';
import { ReactComponent as Toogle } from '../assets/svg/Toogle.svg';
import { Link } from 'react-router-dom';
import Success from '../components/Success';
import { Card } from 'antd';

const Main = () => {
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSetError = (error) => {
        setError(error);
    };
    const handleSetSuccess = (success) => {
        setSuccess(success);
    };

    return (
        <div className="content">
            <Card>
                {error && <Error onClick={handleSetError} />}
                {success && (
                    <Success
                        title={'Лицензия автоматически сохранена на Ваш компьютер'}
                        buttonText={'Сгенерировать еще'}
                        onClick={handleSetSuccess}
                    />
                )}
                {!error && !success && (
                    <LicenseForm onError={handleSetError} onSuccess={handleSetSuccess} />
                )}
            </Card>
            <Link to="admin">
                <Toogle className="adm" />
            </Link>
        </div>
    );
};

export default Main;
