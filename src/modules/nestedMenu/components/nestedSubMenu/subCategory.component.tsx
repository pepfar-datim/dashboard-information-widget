import {removeStyle} from "../../services/createStyleElement";
import React from "react";

export function SubCategory({name, onClick}:{name:string, onClick: ()=>void}){
    return <><div
        onClick={onClick}>
        {removeStyle(name)}
    </div></>
}