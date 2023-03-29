import React from 'react';
import brest from '../assets/img/astra.png';
import bit from '../assets/img/bit.png';

const Sercet = ({ setCounter }) => {
    return (
        <div
            onClick={() => setCounter(0)}
            style={{
                width: '100%',
                height: '200px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
            <img src={brest} alt="" height={'50%'} />
            <img src={bit} alt="" height={'50%'} />
        </div>
    );
};

export default Sercet;
