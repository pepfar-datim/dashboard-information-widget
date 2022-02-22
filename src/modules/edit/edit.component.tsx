import React, {CSSProperties} from 'react';
import {fetchContent, saveContent} from '../shared/services/content.service';
import {Button, ButtonStrip} from '@dhis2/ui';
import { Link, Navigate } from 'react-router-dom';
import contentHook from '../shared/services/contentHook.service';
import {withSnackbar} from "notistack";
import {Jodit} from "jodit";
import {editorConfig} from "./editorConfig";
import {ReadmeLink} from "./readmeLink.component";
import {isTestEnv} from "@pepfar-react-lib/http-tools";


const styles = {
    link: {
        float: 'right',
    },
    clear: {
        clear: 'both',
        height: 20,
    },
    buttons: {
        float: 'right'
    } as CSSProperties,
    cancel: {textDecoration: 'none'}
};

class Edit extends React.Component<
    { enqueueSnackbar: any },
    {
        editedContent?: string;
        goHome: boolean;
    }
> {
    editor;
    constructor(props) {
        super(props);
        this.state = {
            goHome: false
        };
        fetchContent().then((resp ) => {
            this.setState({
                editedContent: resp,
            });
            this.editor = Jodit.make('#edit', editorConfig);
            this.editor.value = resp;
            this.editor.events.on('change', this.onChange);
            if (isTestEnv()) { // @ts-ignore
                window.editor = this.editor;
            }
        });
    }

    onChange = (newContent) => {
        console.log('newContent', newContent)
        this.setState({ editedContent: newContent });
        this.editor.value = newContent;
    };

    saveChanges = () => {
        saveContent(contentHook(this.state.editedContent))
            .then(() => {
                this.props.enqueueSnackbar('Content saved');
                this.setState({goHome: true})
            })
            .catch((e) => {
                this.props.enqueueSnackbar('Error: Cannot save');
            });
    };

    render() {
        if (this.state.goHome) {
            return <Navigate to="/" />;
        }
        return (
            <React.Fragment>
                <ReadmeLink/>
                <div style={styles.buttons}>
                    <ButtonStrip>
                        <Button onClick={this.saveChanges} primary dataTest={'save-button'}>
                            Save
                        </Button>
                        <Link to={`/`} style={styles.cancel}>
                            <Button destructive dataTest={'cancel-button'}>Cancel</Button>
                        </Link>
                    </ButtonStrip>
                </div>
                <div style={styles.clear as any}/>
                <div id='edit'/>
            </React.Fragment>
        );
    }
    componentWillUnmount(){
        let editor = document.querySelector('.jodit-container');
        if (editor) editor.remove();
    }
}

export default withSnackbar(Edit);
