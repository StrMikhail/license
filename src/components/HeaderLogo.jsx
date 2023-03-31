import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ReactComponent as Logo } from '../assets/svg/logo.svg';

const HeaderLogo = () => {
    const [counter, setCounter] = useState(0);
    const localtion = useLocation();
    return (
        <Link
            to="/"
            style={{
                width: localtion.pathname === '/admin' ? 'auto' : '400px',
                textAlign: 'center',
            }}>
            <Logo
                className="logo_svg"
                style={{
                    width: '100%',
                    height: '100%',
                }}
                onClick={() => (counter < 5 ? setCounter(counter + 1) : setCounter(0))}
            />
        </Link>
    );
};

export default HeaderLogo;
