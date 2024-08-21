import { SubMenu } from "../../nestedMenu.types"

export default function isLink(menuItem: string | SubMenu): menuItem is string {
    if (typeof menuItem === 'string') {
        const validStarts = [/^https*:\/\//, /^\.*(\.\.)*\//]
        return validStarts.some(re => re.test(menuItem))
    }
    else return false
}