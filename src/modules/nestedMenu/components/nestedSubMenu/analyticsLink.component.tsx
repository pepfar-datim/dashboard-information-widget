import {removeStyle} from "../../services/createStyleElement";
import React from "react";

export const AnalyticsLink = ({link,name}:{link:string, name:string})=>{
    name = removeStyle(name)
    return <div onClick={()=>{
        let newTab = window.open(link, '_blank')
        newTab&&newTab.focus()
    }} className={'nestedMenu_analyticsLink'}>
        {name}&nbsp;↗
    </div>
}