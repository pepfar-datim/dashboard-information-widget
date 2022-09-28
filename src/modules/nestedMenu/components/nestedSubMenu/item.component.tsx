import React from "react";
import {randomInteger} from "../../services/randomInteger";
import {checkStyle, removeStyle} from "../../services/createStyleElement";

const styles = {
    root: {
        cursor: 'pointer'
    }
}

export function Item({name, selected, children}:{name:string, selected:boolean, children:any}){
    let id = `nestedMenuItem_${randomInteger()}`
    checkStyle(id,name);
    return <div id={id} className={`nestedMenu_item ${selected&&'selected'}`} style={styles.root}>
        {children}
    </div>
}