import React from 'react';

const Footer = ({ onNext }) => {
    return (
        <div className="footer">
            <button onClick={onNext}>ДАЛЕЕ</button>
        </div>
    );
};

export default Footer;
