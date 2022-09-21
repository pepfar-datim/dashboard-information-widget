import React, {CSSProperties} from 'react';
import {fetchContent, saveContent} from '../shared/services/content.service';
import {Button, ButtonStrip} from '@dhis2/ui';
import {Link} from 'react-router-dom';
import contentHook from '../shared/services/contentHook.service';
import {Jodit} from "jodit";
import {editorConfig} from "./editorConfig";
import {ReadmeLink} from "./readmeLink.component";
import {MessageType, ShowMessage} from "@pepfar-react-lib/message-provider"
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

export let editor:Jodit;
export let test_contentHandle:string;

export default class Edit extends React.Component<
    {showMessage:ShowMessage},
    {editedContent?: string}
> {
    constructor(props) {
        super(props);
        this.state = {};
        fetchContent().then((editedContent:string) => {
            this.setState({editedContent});
            editor = Jodit.make('#edit', editorConfig);
            editor.value = editedContent;
            editor.events.on('change', this.onChange);
        });
    }

    onChange = (editedContent:string) => {
        this.setState({editedContent});
        test_contentHandle = editedContent;
    };

    saveChanges = () => {
        saveContent(contentHook(this.state.editedContent)).then((resp) => {
            this.props.showMessage({type:MessageType.success,text: 'Content saved'})
            window.location.hash = '/';
        }).catch((e) => {
            this.props.showMessage({type:MessageType.error,text: 'Error: Cannot save'})
            console.error(e);
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

