// Card.js
import React from 'react';

const Card = ({ title, icon }) => {
    return (
        <div className="card">
            <div className="card-icon">
                <i className={icon}></i>
            </div>
            <h3 className="card-title">{title}</h3>
        </div>
    );
};

export default Card;
