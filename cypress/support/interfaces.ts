export enum ViewMode {
    DISPLAY = 'display',
    EDITABLE = 'editable',
    EDITING = 'editing'
}

export interface SetupWidgetItemProps {
    widgetId?: string;
    viewMode?: ViewMode;
}