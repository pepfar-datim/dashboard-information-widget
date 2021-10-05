import React from 'react';
import { fetchContent, saveContent } from '../shared/services/content.service';
import { ButtonStrip, Button } from '@dhis2/ui';
import { Link, withRouter } from 'react-router-dom';
import Editor from './editor.component';
import contentHook from '../shared/services/contentHook.service';
import '../../index.css';
import {withSnackbar} from "notistack";

const styles = {
    link: {
        float: 'right',
    },
    clear: {
        clear: 'both',
        height: 20,
    },
    readmeLink: {
        float: 'left',
        fontFamily: 'Roboto',
        fontSize: '0.9rem',
        paddingLeft: '5px',
    },
};

class Edit extends React.Component<
    { enqueueSnackbar: any; history: any },
    {
        originalContent?: string;
        editedContent?: string;
    }
> {
    constructor(props) {
        super(props);
        this.state = {};
        fetchContent().then((resp) => {
            this.setState({
                editedContent: resp,
            });
        });
    }
    onChange = (newContent) => {
        this.setState({ editedContent: newContent });
    };

    saveChanges = () => {
        saveContent(contentHook(this.state.editedContent))
            .then(() => {
                this.props.enqueueSnackbar('Content saved');
                this.props.history.push('/');
            })
            .catch((e) => {
                this.props.enqueueSnackbar('Error: Cannot save');
            });
    };

    render() {
        return (
            <React.Fragment>
                <div>
                    <p style={styles.readmeLink as any}>
                        <i>
                            <a
                                href="https://github.com/pepfar-datim/dashboard-information-widget/blob/main/README.md"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Documentation for the Dashboard Information widget can be found here.
                            </a>
                        </i>
                    </p>
                    <ButtonStrip className="float-right">
                        <Button onClick={this.saveChanges} primary>
                            Save
                        </Button>
                        <Link to={`/`}>
                            <Button destructive>Cancel</Button>
                        </Link>
                    </ButtonStrip>
                    <div style={styles.clear as any} />
                </div>
                <Editor content={this.state.editedContent} onChange={this.onChange} />
            </React.Fragment>
        );
    }
    componentWillUnmount(){
        console.log('leaving, bye!')
        let editor = document.querySelector('.jodit-container');
        if (editor) editor.remove();
    }
}

export default withRouter(withSnackbar(Edit));
