import React from 'react';

// ImageBar component without images
const ImageBar = ({ linkUrl }) => {
    return (
        <div style={styles.bar}>
           
        </div>
    );
};

// Inline styles for the bar and link
const styles = {
    bar: {
        backgroundColor: 'white',
        width: '100%',
        height: '80px',   // Adjust height as needed
        display: 'flex',
        justifyContent: 'center',  // Center content horizontally
        alignItems: 'center',      // Center content vertically
        position: 'relative',      // Option to make it stick at the top or bottom
    },
    link: {
        textDecoration: 'none',
        fontSize: '16px',
        color: 'black',
        cursor: 'pointer',
    },
};

export default ImageBar;
