import React from "react";

const styles = {
    root: {
        float: 'left',
        fontFamily: 'Roboto',
        fontSize: '0.9rem',
        paddingLeft: '5px',
    },
    href: {
        textDecoration: 'none'
    }
};

export function ReadmeLink(){
    return <p style={styles.root as any}>
        <i>
            <a
                href="https://github.com/pepfar-datim/dashboard-information-widget/blob/main/README.md"
                target="_blank"
                rel="noopener noreferrer"
                style={styles.href}
            >
                Documentation for the Dashboard Information widget can be found here.
            </a>
        </i>
    </p>
}