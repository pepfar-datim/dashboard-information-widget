import React, {CSSProperties} from 'react';
import {ContentItem, extractSwifterCode, fetchContent} from '../shared/services/content.service';
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
    content: ContentItem[]|null;
    loading:boolean;
}> {
    constructor(props) {
        super(props);
        this.state = {
            content: null,
            loading: true,
        };
        fetchContent().then(extractSwifterCode).then((content:ContentItem[])=>this.setState({content, loading: false}))
    }
    renderContent() {
        if (this.state.loading) return <Loading/>
        if (!this.state.content||this.state.content.length===0) return <Typography>New Dashboard Information widget</Typography>;
        return <React.Fragment>
            {this.state.content.map((contentItem)=>{
                if (typeof contentItem==='string') return <div dangerouslySetInnerHTML={{ __html: contentItem }} />
                else return contentItem;
            })}
        </React.Fragment>
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
