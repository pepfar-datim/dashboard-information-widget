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
    const baseUrl = window.parent.location.origin;
    return (
        <p style={styles.loggedOut}>
            You are no longer logged in, please click{' '}
            <a
                style={styles.loginLink}
                rel="noreferrer"
                href={`${baseUrl}/dhis-web-commons/security/login.action`}
                target="_blank"
            >
                here
            </a>{' '}
            to open a new tab and login, then refresh the current page.
        </p>
    );
};

export default LoggedOutMessage