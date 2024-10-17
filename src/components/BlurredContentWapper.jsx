import React, { useState } from 'react';
import SecurityControl from './SecurityControl'; // Assuming SecurityControl is in the same directory

const BlurredContentWrapper = ({ children, password }) => {
    const [isAuthorized, setIsAuthorized] = useState(false);

    const blurStyle = {
        filter: 'blur(10px)', // Adjust blur strength here
        pointerEvents: 'none', // Prevent interaction with the blurred content
        opacity: 0.7, // Add a bit of transparency
    };

    return (
        <div>
            {/* Header will not be blurred */}
            {children.header}

            {/* Dynamically render content - Blur effect applied based on state */}
            {!isAuthorized ? (
                React.cloneElement(children.content, { style: blurStyle })
            ) : (
                children.content
            )}

            {/* SecurityControl to unlock the content */}
            {!isAuthorized && (
                <SecurityControl password={password} onSuccess={() => setIsAuthorized(true)} />
            )}

            {/* Footer will not be blurred */}
            {children.footer}
        </div>
    );
};

export default BlurredContentWrapper;
