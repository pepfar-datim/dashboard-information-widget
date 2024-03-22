
function isEditingDashboard(){
    const pageHash:string = window.parent.location.hash
    return /\/edit|\/new/.test(pageHash)
}

export async function addEditButton():Promise<void>{
    const isEditing:boolean = isEditingDashboard()
    if (!isEditing) return
    const {createEditButton} = await import('./createEditButton.service.ts')
    createEditButton()
}