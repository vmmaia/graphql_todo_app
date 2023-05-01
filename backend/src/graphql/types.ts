import Priorities from '../enums/Priorities.js';

export type GetArgs = {
    id?: number;
    priority?: Priorities;
    flagged?: boolean;
};

export type CreateArgs = {
    name: string;
    description?: string;
    priority: Priorities;
    flagged: boolean;
};

export type UpdateArgs = {
    id: number;
    name?: string;
    description?: string;
    priority?: Priorities;
    flagged?: boolean;
};

export type DeleteArgs = {
    id: number;
};
