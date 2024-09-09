export const menuRe = /<pre\s+[^>]*type=["']nestedMenu["'][^>]*>(.*?)<\/pre>/is;

export type SubMenu = {
    [key:string]:string|SubMenu
};

export type NestedMenu = {
    style?: string;
    subMenu: SubMenu;
}
export type SelectFunction = (value: string) => void;