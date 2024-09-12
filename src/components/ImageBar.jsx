import React from 'react';

// ImageBar component
const ImageBar = ({ imageUrl, linkUrl, altText }) => {
    return (
        <div style={styles.bar}>
            <a href={linkUrl} target="_blank" rel="noopener noreferrer">
                <img src={imageUrl} alt={altText} style={styles.image} />
            </a>
        </div>
    );
};

// Inline styles for the bar and image
const styles = {
    bar: {
        backgroundColor: 'white',
        width: '100%',
        height: '80px',   // Adjust height as needed
        display: 'flex',
        justifyContent: 'left',  // Center the image horizontally
        alignItems: 'center',      // Center the image vertically
       
        position: 'relative',      // Option to make it stick at the top or bottom
    },
    image: {
        maxHeight: '60px',        // Adjust image height relative to bar
        maxWidth: 'auto',         // Maintain image aspect ratio
        cursor: 'pointer',
    },
};

export default ImageBar;
