import React, {CSSProperties} from 'react';
import {fetchContent} from '../shared/services/content.service';
import Typography from '@material-ui/core/Typography';
import {Loading} from "../shared/components/loading.component";
import {EditButton} from './editButton.component';

const styles = {
    content: {
        fontSize: "1rem",
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        fontWeight: 400,
        lineHeight: 1.5,
        letterSpacing: '0.00938em'
    } as CSSProperties
}

export default class Render extends React.Component<any, {
    contentBody: string|null;
    loading:boolean;
}> {
    constructor(props) {
        super(props);
        this.state = {
            contentBody: null,
            loading: true,
        };
        fetchContent().then((contentBody)=>this.setState({contentBody, loading: false}))
    }
    renderContent() {
        if (this.state.loading) return <Loading/>
        if (!this.state.contentBody) return <Typography>New Dashboard Information widget</Typography>;
        return <div id="test" style={styles.content} dangerouslySetInnerHTML={{ __html: this.state.contentBody }}/>;
    }
    render() {
        return (
            <React.Fragment>
                <EditButton/>
                {this.renderContent()}
            </React.Fragment>
        );
    }
}
