function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}


export async function showMessages(messages: string): Promise<void> {
    const el = document.getElementById('snackbar')!
    el.innerHTML = messages
    el.className = 'show'
    await sleep(8000)
    el.className.replace('show', '')
}