import React from 'react';
import RouterWrapper from './routerWrapper.component';
import DhisVersionError from './dhisVersionError.component';
import {getData} from "@pepfar-react-lib/http-tools";
import {Loading} from "../../shared/components/loading.component";

const config = require('../../../config/config.json');

export default class AccessWrapper extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            adminOnlyEdit: true,
            isAdmin: false,
            dhisVersion: null
        };
        this.checkUser();
        this.checkVersion();
        this.checkAdminOnlyEdit();
    }

    async checkUser() {
        let isAdmin:boolean = await getData('/me?fields=userCredentials[userRoles[name,id]]')
            .then((res) => res.userCredentials.userRoles.some((role) => role.name.includes('Superuser')));
        this.setState({isAdmin});
    }

    async checkVersion() {
        let dhisVersion = await getData('/system/info').then((res) => res.version.match(/^\d+\.\d+/)[0]);
        this.setState({dhisVersion});
    }

    async checkAdminOnlyEdit() {
        let adminOnlyEdit = await getData(`/dataStore/${config.datastoreNamespace}/configuration`).then(res=>res[config.onlyOpenToSuperUsersKey])
        this.setState({adminOnlyEdit});
    }

    render() {
        if (!this.state.dhisVersion) return <Loading/>;
        if (this.state.dhisVersion<2.31) return <DhisVersionError version={this.state.dhisVersion} />;
        return <RouterWrapper isAdmin={this.state.isAdmin} adminOnlyEdit={this.state.adminOnlyEdit}/>
    }
}
