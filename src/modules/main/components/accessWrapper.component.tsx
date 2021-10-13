import React from 'react';
import RouterWrapper from './routerWrapper.component';
import DhisVersionError from './dhisVersionError.component';
import {getData} from "@pepfar-react-lib/http-tools";
import {Loading} from "../../shared/components/loading.component";

export default class AccessWrapper extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            dhisVersion: null
        };
        this.checkVersion();
    }

    async checkVersion() {
        let dhisVersion = await getData('/system/info').then((res) => res.version.match(/^\d+\.\d+/)[0]);
        this.setState({dhisVersion});
    }

    render() {
        if (!this.state.dhisVersion) return <Loading/>;
        if (this.state.dhisVersion<2.31) return <DhisVersionError version={this.state.dhisVersion} />;
        return <RouterWrapper/>
    }
}
