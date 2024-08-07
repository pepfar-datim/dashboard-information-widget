import {isEditingDashboard} from '../../../../shared/isEditingDashboards.service.ts'

export async function addEditButton():Promise<void>{
    const isEditing:boolean = isEditingDashboard()
    if (!isEditing) return
    const {createEditButton} = await import('./createEditButton.service.ts')
    createEditButton()
}