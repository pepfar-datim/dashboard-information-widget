import {adjustBorders} from "./adjustBorders.service.ts";

export async function render(where: string, what: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 0))
    document.getElementById(where)!.innerHTML = what
    adjustBorders()
}