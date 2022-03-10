import React from 'react';
import {
    ContentItem,
    ContentItemType,
    fetchContent,
    loggedOut,
    NestedMenuObject,
    parseContent
} from '../../shared/services/content.service';
import {Typography} from '@mui/material';
import {Loading} from "../../shared/components/loading.component";
import {EditButton} from './editButton.component';
import {NestedMenu} from "../../nestedMenu/components/nestedMenu.component";
import LoggedOutMessage from '../../shared/components/LoggedOutMessage';

const styles = {
    defaultText: {
        fontSize: "1rem",
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        fontWeight: 400,
        lineHeight: 1.5,
        letterSpacing: "0.00938em"
    }
}

export default class Render extends React.Component<any, {
    content: ContentItem[]|null;
    loading:boolean;
    loggedOut: boolean;
}> {
    constructor(props) {
        super(props);
        this.state = {
            content: null,
            loading: true,
            loggedOut: false
        };
        fetchContent().then(rawContent => {
            if (rawContent === loggedOut) {
                this.setState({loggedOut: true, loading: false})
            } else {
                const parsedContent = parseContent(rawContent)
                this.setState({ content: parsedContent, loading: false });
            }
            
        })
    }
    renderContent() {
        if (this.state.loggedOut) return <LoggedOutMessage />
        if (this.state.loading) return <Loading/>
        if (!this.state.content||this.state.content.length===0) return <Typography>New Dashboard Information widget</Typography>;
        return <React.Fragment>
            {this.state.content.map(({type, body},i)=>{
                if (type===ContentItemType.string) return <div style={styles.defaultText} key={i} dangerouslySetInnerHTML={{ __html: body as string}} />
                if (type===ContentItemType.nestedMenu) return <NestedMenu menuJson={body as NestedMenuObject} key={i}/>
                return null;
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
