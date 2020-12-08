export class MechanismInfo {
    ou: string;
    agency: string;
    partner: string;
}

export class MechanismActions {
    submit?: boolean;
    recall?: boolean;
    return?: boolean;
    accept?: boolean;
}

export class MechanismState {
    status: {
        approvalsApi?: string;
        app?: string;
        level?: number;
    };
    view: boolean;
    actions: MechanismActions;
}

export class MechanismMeta {
    workflow: string;
    period: string;
    ou: string;
}

export default class MechanismModel{
    id: string;
    info?: MechanismInfo;
    state?: MechanismState;
    meta?: MechanismMeta;
}