import React from 'react';

const LoggedOutMessage = ({requestRefresh}) => {
    console.log(requestRefresh);
    const styles = {
        loginLink: {
            color: '#069',
            textDecoration: 'underline',
            cursor: 'pointer',
            display: 'inline',
        },
        loggedOut: {
            fontFamily: 'Roboto',
            float: 'left'
        },
    };
    const baseUrl = window.parent.location.origin;
    return (
        <p style={styles.loggedOut as any}>
            You are no longer logged in, please click{' '}
            <a
                style={styles.loginLink}
                rel="noreferrer"
                href={`${baseUrl}/dhis-web-commons/security/login.action`}
                target="_blank"
            >
                here
            </a>{' '}
            to open a new tab and login, then
            {requestRefresh ? ' refresh the current page' : ' try saving again'}.
        </p>
    );
};

export default LoggedOutMessage