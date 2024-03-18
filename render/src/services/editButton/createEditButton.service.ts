import {getWidgetId} from "../shared/getWidgetId.service.ts";

const editButtonStyle = `
    border-color: rgb(13, 71, 161);
    background: linear-gradient(rgb(21, 101, 192) 0%, rgb(6, 80, 163) 100%) rgb(43, 97, 179);
    color: rgb(255, 255, 255);
    fill: rgb(255, 255, 255);
    font-weight: 500;
    border-radius: 4px;
    height: 36px;
    padding: 0px 12px;
    font-size: 14px;
    line-height: 16px;
    border: 1px solid rgb(160, 173, 186);
    text-decoration: none;
    cursor: pointer;
    letter-spacing: 0.5px;
    position: absolute;
    right: 0px;
    top: 0px;
`

const editButtonHoverStyle = `
    border-color: rgb(13, 71, 161)!important;
    background: linear-gradient(rgb(5, 79, 163) 0%, rgb(3, 71, 147) 100%) rgb(33, 83, 159)!important;
`

export function createEditButton() {
    const button = document.createElement('button')
    button.innerHTML = 'Edit'
    button.id = 'edit'
    button.setAttribute('style', editButtonStyle)

    const style = document.createElement('style')
    style.innerHTML = `#edit:hover{${editButtonHoverStyle}}`

    const link = document.createElement('a')
    link.setAttribute('href',`edit.html?dashboardItemId=${getWidgetId()}`)

    link.appendChild(button)

    document.body.appendChild(link)
    document.head.appendChild(style)
    document.body.style.position = 'relative'
}