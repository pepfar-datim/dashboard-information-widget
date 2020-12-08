import React from "react";
import RouterWrapper from "./routerWrapper.component";
import api from "../../shared/services/api.service";
import DhisVersionError from "./dhisVersionError.component";

const config  = require("../../../config/config.json");

export default class AccessWrapper extends React.Component<any,any>{
    constructor(props){
        super(props);
        this.state = {
          adminOnlyEdit: true,
          isAdmin: false
        };
        this.checkUser();
        this.checkVersion();
        this.checkAdminOnlyEdit();
    }

    checkUser(){
        api.get('/me?fields=userCredentials[userRoles[name,id]]').then(res=>{
            let isAdmin = res.userCredentials.userRoles.filter(role=>role.name.includes('Superuser'));
            if (isAdmin.length) this.setState({isAdmin: true});
        })
    }

    checkVersion(){
        api.get('/system/info').then(res=>{
            this.setState({dhisVersion: res.version.match(/^\d+\.\d+/)[0]});
        })
    }

    checkAdminOnlyEdit() {
      api.get(`/dataStore`).then(res => {
        if (res.includes(config.datastoreNamespace)) {
          api.get(`/dataStore/${config.datastoreNamespace}/configuration`).then(res => {
            this.setState({adminOnlyEdit: res[config.onlyOpenToSuperUsersKey]})
          })
        }
      })
      
    }

  render() {
    return (
      <React.Fragment>
        {this.state.dhisVersion >= 2.31 ? (
          <RouterWrapper
            postMessage={(message) => this.props.postMessage(message)}
            isAdmin={this.state.isAdmin}
            adminOnlyEdit={this.state.adminOnlyEdit}
          />
        ) : (
          <DhisVersionError version={this.state.dhisVersion} />
        )}
      </React.Fragment>
    );
  }
}
