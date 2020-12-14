import React from 'react';
import './responsiveText.component.css';

export default function ResponsiveText(props) {
    return (
        <React.Fragment>
            <span className="smallScreen">{props.small}</span>
            <span className="largeScreen">{props.children}</span>
        </React.Fragment>
    );
}
