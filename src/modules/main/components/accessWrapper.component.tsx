import React from 'react';
import RouterWrapper from './routerWrapper.component';
import DhisVersionError from './dhisVersionError.component';
import {getData} from "@pepfar-react-lib/http-tools";

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

    checkUser() {
        getData('/me?fields=userCredentials[userRoles[name,id]]').then((res) => {
                let isAdmin = res.userCredentials.userRoles.filter((role) =>
                    role.name.includes('Superuser')
                );
                if (isAdmin.length) this.setState({ isAdmin: true });
            }
        );
    }

    checkVersion() {
        getData('/system/info').then((res) => {
            this.setState({ dhisVersion: res.version.match(/^\d+\.\d+/)[0] });
        });
    }

    checkAdminOnlyEdit() {
        getData(`/dataStore`).then((res) => {
            if (res.includes(config.datastoreNamespace)) {
                getData(
                    `/dataStore/${config.datastoreNamespace}/configuration`
                ).then((res) => {
                    this.setState({
                        adminOnlyEdit: res[config.onlyOpenToSuperUsersKey],
                    });
                });
            }
        });
    }

    render() {
        return (
            <React.Fragment>
                {this.state.dhisVersion !== null && this.state.dhisVersion < 2.31 ? (
                    <DhisVersionError version={this.state.dhisVersion} />
                ) : (
                    <RouterWrapper
                        isAdmin={this.state.isAdmin}
                        adminOnlyEdit={this.state.adminOnlyEdit}
                    />
                )}
            </React.Fragment>
        );
    }
}
