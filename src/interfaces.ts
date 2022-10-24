export type Collection = 'users' | 'tasks';

export enum collectionName {
    USERS = 'users',
    CARDS = 'cards',
    TASKS = 'tasks',
}

export interface User {
    id: string;
    avatarHash: string;
    avatarUrl: string;
    fullName: string;
    username: string;
}

export interface Task {
    board: {
        id: string;
        name: string;
        shortLink: string;
    };
    card: {
        id: string;
        name: string;
        idShort: number;
        shortLink: string;
    };
    inProgress: boolean;
    timers: Timer[];
    user: User;
}

export interface Timer {
    timeStart: string;
    timeEnd: string;
}
