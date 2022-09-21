import React from 'react';
import DhisVersionError from './dhisVersionError.component';
import {Loading} from "../../shared/components/loading.component";
import {getJson} from '@pepfar-react-lib/datim-api';

export default class CheckVersionWrapper extends React.Component<{children:any}, any> {
    constructor(props) {
        super(props);
        this.state = {
            dhisVersion: null
        };
        this.checkVersion();
    }

    async checkVersion() {
        let dhisVersion = await getJson('/system/info').then((res) => res.version.match(/^\d+\.\d+/)[0]);
        this.setState({dhisVersion});
    }

    render() {
        if (!this.state.dhisVersion) return <Loading/>;
        if (this.state.dhisVersion<2.31) return <DhisVersionError version={this.state.dhisVersion} />;
        return <>{this.props.children}</>
    }
}
