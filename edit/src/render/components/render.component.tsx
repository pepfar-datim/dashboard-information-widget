export function Render({content}:{content:string}){
	return <>
		<div dangerouslySetInnerHTML={{__html: content}} />
	</>
}