import React from 'react';
import Snackbar from '@material-ui/core/Snackbar/Snackbar';
import { IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import AccessWrapper from './accessWrapper.component';

export default class MessageWrapper extends React.Component<
    {},
    { message: { open: boolean; text: string | null } }
> {
    constructor(props) {
        super(props);
        this.state = {
            message: {
                open: false,
                text: null,
            },
        };
    }
    postMessage(message) {
        this.setState({ message: { open: true, text: message } });
        setTimeout(() => {
            this.hideMessage();
        }, 3500);
    }
    hideMessage() {
        this.setState({ message: { open: false, text: null } });
    }
    render() {
        return (
            <React.Fragment>
                <AccessWrapper
                    postMessage={(message) => this.postMessage(message)}
                />
                <Snackbar
                    open={this.state.message.open}
                    message={this.state.message.text}
                    action={
                        <IconButton
                            key="close"
                            aria-label="Close"
                            color="inherit"
                            onClick={() => this.hideMessage()}
                        >
                            <CloseIcon />
                        </IconButton>
                    }
                />
            </React.Fragment>
        );
    }
}
