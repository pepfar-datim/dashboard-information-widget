import React from 'react';
import { Button } from '@material-ui/core';
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
    { contentBody: string | null; inDashEditMode: boolean }
> {
    constructor(props) {
        super(props);
        this.state = {
            contentBody: null,
            inDashEditMode: window.parent.location.hash.includes('edit') || window.parent.location.hash.includes('new'),
        };
        fetchContent()
            .then((resp) => {
                this.setState({ contentBody: resp });
            })
            .catch((err) => {
                console.log('Error fetching dash content');
            });
    }
    renderContent() {
        if (this.state.contentBody)
            return (
                <Typography
                    dangerouslySetInnerHTML={{ __html: this.state.contentBody }}
                ></Typography>
            );
        else return <Typography>New Dashboard Information widget</Typography>;
    }
    render() {
        const editable =
            this.state.inDashEditMode &&
            (this.props.isAdmin || !this.props.adminOnlyEdit);
        return (
            <React.Fragment>
                {editable ? (
                    <Link to={`/edit`} style={styles.link}>
                        <Button color="primary">Edit</Button>
                    </Link>
                ) : null}
                {this.renderContent()}
            </React.Fragment>
        );
    }
}
