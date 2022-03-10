import React from 'react';

const LoggedOutMessage = () => {
    const styles = {
        loginLink: {
            color: '#069',
            textDecoration: 'underline',
            cursor: 'pointer',
            display: 'inline',
        },
        loggedOut: {
            fontFamily: 'Roboto',
        },
    };
    const handleLogin = () => {
        const baseUrl = window.parent.location.origin;
        window.parent.location.href = `${baseUrl}/dhis-web-commons/security/login.action`;
    };
    return (
        <p style={styles.loggedOut}>
            You are no longer logged in, please click{' '}
            <p style={styles.loginLink} onClick={handleLogin}>
                here
            </p>{' '}
            to return to the login page.
        </p>
    );
};

export default LoggedOutMessage