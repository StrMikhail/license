import React, { useState } from 'react';
import Error from '../components/Error';
import LicenseForm from '../components/LicenseForm';
import { ReactComponent as Logo } from '../assets/svg/logo.svg';
import Success from '../components/Success';

const Main = () => {
    const [counter, setCounter] = useState(0);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSetError = (error) => {
        setError(error);
    };
    const handleSetSuccess = (success) => {
        setSuccess(success);
    };

    return (
        <div className="main">
            <div className="header">
                <Logo
                    className="logo"
                    onClick={() => (counter < 5 ? setCounter(counter + 1) : setCounter(0))}
                    style={{
                        transition: '.3s',
                        transform: `rotate(${counter === 4 ? 180 : 0}deg)`,
                    }}
                />
            </div>
            <div className="content">
                {error && <Error onClick={handleSetError} />}
                {success && <Success onClick={handleSetSuccess} />}
                {!error && !success && (
                    <LicenseForm onError={handleSetError} onSuccess={handleSetSuccess} />
                )}
            </div>
        </div>
    );
};

export default Main;
