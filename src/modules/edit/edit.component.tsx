import React, {CSSProperties} from 'react';
import {fetchContent, saveContent, loggedOut} from '../shared/services/content.service';
import {Button, ButtonStrip} from '@dhis2/ui';
import {Link} from 'react-router-dom';
import contentHook from '../shared/services/contentHook.service';
import {withSnackbar} from "notistack";
import {Jodit} from "jodit";
import {editorConfig} from "./editorConfig";
import {ReadmeLink} from "./readmeLink.component";
import {isTestEnv} from "@pepfar-react-lib/http-tools";
import LoggedOutMessage from '../shared/components/LoggedOutMessage';


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
        loggedOutOnEdit: boolean;
        loggedOutOnSave: boolean;
        editedContent?: string;
    }
> {
    editor;
    constructor(props) {
        super(props);
        this.state = {
            loggedOutOnEdit: false,
            loggedOutOnSave: false,
        };
        fetchContent().then((resp) => {
            if (resp === loggedOut) {
                this.setState({ loggedOutOnEdit: true, loggedOutOnSave: false });
            } else {
                this.setState({
                    editedContent: resp,
                });
                this.editor = Jodit.make('#edit', editorConfig);
                this.editor.value = resp;
                this.editor.events.on('change', this.onChange);
                if (isTestEnv()) {
                    // @ts-ignore
                    window.editor = this.editor;
                }
            }
        });
    }

    onChange = (newContent) => {
        this.setState({ editedContent: newContent });
        this.editor.value = newContent;
    };

    saveChanges = () => {
        saveContent(contentHook(this.state.editedContent))
            .then((resp) => {
                if (resp.redirected === true && resp.url.includes('login.action')) {
                    this.setState({ loggedOutOnSave: true, loggedOutOnEdit: false });
                    this.props.enqueueSnackbar('Error: Logged out and cannot save');
                } else {
                    this.props.enqueueSnackbar('Content saved');
                    window.location.hash = '/';
                }
            })
            .catch((e) => {
                this.props.enqueueSnackbar('Error: Cannot save');
            });
    };

    render() {
        const {loggedOutOnEdit, loggedOutOnSave} = this.state
        if (loggedOutOnEdit) {
            return <LoggedOutMessage requestRefresh={true} />;
        }
        return (
            <React.Fragment>
                {loggedOutOnSave ? <LoggedOutMessage requestRefresh={false} /> : <ReadmeLink />}
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
