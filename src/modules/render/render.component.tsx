import React from 'react';
import { Button } from '@dhis2/ui';
import { Link } from 'react-router-dom';
import { fetchContent } from '../shared/services/content.service';
import Typography from '@material-ui/core/Typography';

const styles = {
    link: {
        float: 'right',
        textDecoration: 'none'
    },
};

export default class Render extends React.Component<
    { isAdmin: boolean; adminOnlyEdit: boolean },
    { contentBody: string|null; inDashEditMode: boolean }
> {
    constructor(props) {
        super(props);
        this.state = {
            contentBody: null,
            inDashEditMode: window.parent.location.hash.includes('edit') || window.parent.location.hash.includes('new'),
        };
        fetchContent().then((contentBody)=>this.setState({contentBody}))
    }
    renderContent() {
        if (!this.state.contentBody) return <Typography>New Dashboard Information widget</Typography>;
        return <Typography dangerouslySetInnerHTML={{ __html: this.state.contentBody }}></Typography>;
    }
    render() {
        const editable = this.state.inDashEditMode && (this.props.isAdmin || !this.props.adminOnlyEdit);
        return (
            <React.Fragment>
                {editable && <Link to={`/textEdit`} style={styles.link}>
                        <Button primary>Edit</Button>
                </Link>}
                {this.renderContent()}
            </React.Fragment>
        );
    }
}
