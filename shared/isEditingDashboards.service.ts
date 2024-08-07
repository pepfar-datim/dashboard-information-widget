export function isEditingDashboard(){
    const pageHash:string = window.parent.location.hash
    return /\/edit|\/new/.test(pageHash)
}