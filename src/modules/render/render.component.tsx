import React from 'react';
import { Button } from '@dhis2/ui';
import { Link } from 'react-router-dom';
import { fetchContent } from '../shared/services/content.service';
import Typography from '@material-ui/core/Typography';
import {Loading} from "../shared/components/loading.component";

const styles = {
    link: {
        float: 'right',
        textDecoration: 'none'
    },
};

export default class Render extends React.Component<
    { isAdmin: boolean; adminOnlyEdit: boolean;},
    { contentBody: string|null; inDashEditMode: boolean;loading:boolean;  }
> {
    constructor(props) {
        super(props);
        this.state = {
            contentBody: null,
            loading: true,
            inDashEditMode: window.parent.location.hash.includes('edit') || window.parent.location.hash.includes('new'),
        };
        fetchContent().then((contentBody)=>this.setState({contentBody, loading: false}))
    }
    renderContent() {
        if (this.state.loading) return <Loading/>
        if (!this.state.contentBody) return <Typography>New Dashboard Information widget</Typography>;
        return <Typography dangerouslySetInnerHTML={{ __html: this.state.contentBody }}></Typography>;
    }
    render() {
        const editable = this.state.inDashEditMode && (this.props.isAdmin || !this.props.adminOnlyEdit);
        return (
            <React.Fragment>
                {editable && <Link to={`/textEdit`} style={styles.link}>
                        <Button primary data-testid='EditButton'>Edit</Button>
                </Link>}
                {this.renderContent()}
            </React.Fragment>
        );
    }
}
