import { Col, Row, Space } from 'antd';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../assets/svg/logo.svg';
// impot Lo

const HeaderLogo = () => {
    const [counter, setCounter] = useState(0);

    return (
        // <Row justify="start" style={{ padding: '20px 0' }}>
        <Col>
            <Link to="/" className="">
                <Logo
                    className="logo_svg"
                    onClick={() => (counter < 5 ? setCounter(counter + 1) : setCounter(0))}
                />
            </Link>
        </Col>
        // </Row>
    );
};

export default HeaderLogo;
