export const menuRe = /<pre.*>(.+)<\/pre>/s

export type SubMenu = {
    [key:string]:string|SubMenu
};

export type NestedMenu = {
    style?: string;
    subMenu: SubMenu;
}