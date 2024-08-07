import {getWidgetId} from './getWidgetId.service'
import { isEditingDashboard } from './isEditingDashboards.service'

const messageContainer = (messageContent: string) => (`
    <div>${messageContent}</div>
    <div class="snackbarClose">×</div>
`)

function addCloseHandler() {
    const el = document.getElementById('snackbar')!
    el.addEventListener('click', function(event) {
        const target = event.target as HTMLElement;
        if (target.classList.contains('snackbarClose')) {
            el.className = ''
        }
    });
    sessionStorage.removeItem(getWidgetId())
}

export async function showMessages(messages: string): Promise<void> {
    const widgetId = getWidgetId()
    if (messages) {
        sessionStorage.setItem(widgetId, messages)
    }
    const messageContent = sessionStorage.getItem(widgetId);
    if (messageContent && isEditingDashboard()) {
        const messageHtml = messageContainer(messageContent)
        const el = document.getElementById('snackbar')!
        el.innerHTML = messageHtml
        el.className = 'show'
        addCloseHandler()
    }
}