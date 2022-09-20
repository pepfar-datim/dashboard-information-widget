import React, {CSSProperties} from "react";
import {Link} from 'react-router-dom';
import {Button} from "@dhis2/ui";
import {getJson} from "@pepfar-react-lib/datim-api";

const config = require('../../../config/config.json');

const styles = {
    link: {
        float: 'right',
        textDecoration: 'none'
    } as CSSProperties,
};

function isOnEditPage(){
    //TODO: This is failing the test
    return window.parent.location.hash.includes('edit') || window.parent.location.hash.includes('new')
}

export class EditButton extends React.Component<any, {
    isSuperAdmin: boolean,
    superAdminOnly: boolean
}>{
    constructor(props) {
        super(props);
        this.state = {
            isSuperAdmin: false,
            superAdminOnly: true
        };
        this.checkIsSuperAdmin();
        this.checkAdminOnlyEdit();
    }

    async checkIsSuperAdmin() {
        let isSuperAdmin:boolean = await getJson('/me?fields=userCredentials[userRoles[name,id]]')
            .then((res) => res.userCredentials.userRoles.some((role) => role.name.includes('Superuser')));
        this.setState({isSuperAdmin});
    }

    async checkAdminOnlyEdit() {
        let superAdminOnly = await getJson(`/dataStore/${config.datastoreNamespace}/configuration`).then(res=>res[config.onlyOpenToSuperUsersKey])
        this.setState({superAdminOnly});
    }

    render(){
        if (!isOnEditPage()) return null;
        if (this.state.superAdminOnly&&!this.state.isSuperAdmin) return null;
        return <Link to={`/textEdit`} style={styles.link}>
            <Button primary data-testid='EditButton' dataTest={'edit-button'}>Edit</Button>
        </Link>
    }
}