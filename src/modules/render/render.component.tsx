import React from 'react';
import { Button } from '@dhis2/ui';
import { Link } from 'react-router-dom';
import { fetchContent } from '../shared/services/content.service';
import Typography from '@material-ui/core/Typography';

const styles = {
    link: {
        float: 'right',
    },
};

export default class Render extends React.Component<
    { isAdmin: boolean; adminOnlyEdit: boolean },
    { contentFetched: boolean; contentBody: string | null; inDashEditMode: boolean }
> {
    constructor(props) {
        super(props);
        this.state = {
            contentFetched: false,
            contentBody: null,
            inDashEditMode: window.parent.location.hash.includes('edit') || window.parent.location.hash.includes('new'),
        };
        fetchContent()
            .then((resp) => {
                this.setState({
                    contentFetched: true,
                    contentBody: resp,
                });
            })
            .catch((err) => {
                console.log('Error fetching dash content');
            });
    }
    renderContent() {
        if (this.state.contentBody)
            return <Typography dangerouslySetInnerHTML={{ __html: this.state.contentBody }}></Typography>;
        else if (this.state.contentFetched) return <Typography>New Dashboard Information widget</Typography>;
        else return <Typography></Typography>;
    }
    render() {
        const editable = this.state.inDashEditMode && (this.props.isAdmin || !this.props.adminOnlyEdit);
        return (
            <React.Fragment>
                {editable || process.env.NODE_ENV === 'development' ? (
                    <Link to={`/edit`} style={styles.link}>
                        <Button primary>Edit</Button>
                    </Link>
                ) : null}
                {this.renderContent()}
            </React.Fragment>
        );
    }
}
