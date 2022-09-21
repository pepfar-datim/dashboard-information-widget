import React, {CSSProperties} from 'react';
import {fetchContent, saveContent} from '../shared/services/content.service';
import {Button, ButtonStrip} from '@dhis2/ui';
import {Link} from 'react-router-dom';
import contentHook from '../shared/services/contentHook.service';
import {withSnackbar} from "notistack";
import {Jodit} from "jodit";
import {editorConfig} from "./editorConfig";
import {ReadmeLink} from "./readmeLink.component";
import './resizeStyle.css'

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

export let testContent:string;

class Edit extends React.Component<
    {enqueueSnackbar: any},
    {editedContent?: string}
> {
    editor;
    constructor(props) {
        super(props);
        this.state = {};
        fetchContent().then((resp) => {
            this.setState({
                editedContent: resp,
            });
            this.editor = Jodit.make('#edit', editorConfig);
            this.editor.value = resp;
            this.editor.events.on('change', this.onChange);
                // if (isTestEnv()) {
                    // @ts-ignore
            window.editor = this.editor;
                // }
        });
    }

    onChange = (newContent) => {
        this.setState({editedContent: newContent});
        this.editor.value = newContent;
    };

    saveChanges = () => {
        saveContent(contentHook(this.state.editedContent))
            .then((resp) => {
                this.props.enqueueSnackbar('Content saved');
                window.location.hash = '/';
            })
            .catch((e) => {
                this.props.enqueueSnackbar('Error: Cannot save');
            });
    };

    render() {
        return (
            <React.Fragment>
                <ReadmeLink />
                <div style={styles.buttons}>
                    <ButtonStrip>
                        <Button onClick={this.saveChanges} primary dataTest={'save-button'}>
                            Save
                        </Button>
                        <Link to={`/`} style={styles.cancel}>
                            <Button destructive dataTest={'cancel-button'}>
                                Cancel
                            </Button>
                        </Link>
                    </ButtonStrip>
                </div>
                <div style={styles.clear as any} />
                <div id="edit" />
            </React.Fragment>
        );
    }
    componentWillUnmount() {
        let editor = document.querySelector('.jodit-container');
        if (editor) editor.remove();
    }
}

export default withSnackbar(Edit);
