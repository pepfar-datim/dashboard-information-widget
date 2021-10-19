import React, {ReactElement, useMemo} from "react";
import YAML from 'yaml'

export function Sifter({yaml}:{yaml:string}):ReactElement{
    let sifterSpec = useMemo(()=>{
        return YAML.parse(yaml);
    },[yaml]);
    console.log(sifterSpec);
    return <div>sifter</div>
}