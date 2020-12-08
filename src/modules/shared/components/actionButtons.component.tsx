import React from "react";
import Button from "@material-ui/core/es/Button/Button";

const styles = {
    button: {
        marginRight: 10
    }
};

export function ActionButton({children,onActionClick, className, style={}}){
    return <Button size="small" color="primary" onClick={()=>onActionClick()} className={className} {...style} style={styles.button}>{children}</Button>;
}

function renderActions(actions, onActionClick, style){
    return Object.keys(actions).map(action=>{
        if (actions[action]) return <ActionButton onActionClick={()=>onActionClick(action)} className={`cy_mechanismAction_${action}`} key={action} style={style}>{action}</ActionButton>
    });
}


export default function ActionButtons({actions, onActionClick, buttonStyle={}, style={}}){
    return(
        <div style={style}>
            {renderActions(actions, onActionClick, buttonStyle)}
        </div>
    );
}
