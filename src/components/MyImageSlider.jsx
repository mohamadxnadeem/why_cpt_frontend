import React from "react";

const MyImageSlider = ({ slides }) => {
    const sliderStyles = {
        height: '100%',
        position: 'relative',
    };

    const slideStyles = {
        width: '100%',
        height: '100%',
        borderRadius: '10px',
        backgroundPosition: 'center',
        backgroundImage: `url(${slides[0]?.url})`, // Use the first slide or an empty string
        backgroundSize: 'cover',
    };

    return (
        <div style={sliderStyles}>
            <div style={slideStyles}></div>
        </div>
    );
};

export default MyImageSlider;
