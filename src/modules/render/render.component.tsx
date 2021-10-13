import React from 'react';
import { fetchContent } from '../shared/services/content.service';
import Typography from '@material-ui/core/Typography';
import {Loading} from "../shared/components/loading.component";
import { EditButton } from './editButton.component';

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
        return <Typography dangerouslySetInnerHTML={{ __html: this.state.contentBody }}></Typography>;
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
