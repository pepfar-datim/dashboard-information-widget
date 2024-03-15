import {useEffect, useState} from "react";
import {RenderLoading} from "./renderLoading.component.tsx";
import {Render} from "./render.component.tsx";
import {fetchRenderContent} from "../services/fetchRenderContent.service.tsx";

export function RenderContext(){
    const [content, setContent] = useState<string>();
    useEffect(()=>{
        fetchRenderContent().then(setContent)
    },[])
    if (!content) return <RenderLoading/>
	return <>
        <Render content={content}/>
	</>
}