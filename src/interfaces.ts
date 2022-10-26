export type Collection = 'users' | 'tasks';

export enum collectionName {
    USERS = 'users',
    CARDS = 'cards',
    TASKS = 'tasks',
    LISTS = 'lists'
}

export interface User {
    id: string;
    avatarHash: string;
    avatarUrl: string;
    fullName: string;
    username: string;
    working: boolean;
    created: string;
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

export interface TrelloAction {
    id: string; idMemberCreator: string; data: any; appCreator: null; type: ActionType; date: string; limits: null; display: any; memberCreator: any;
}

export type ActionType = "acceptEnterpriseJoinRequest" | "addAttachmentToCard" | "addChecklistToCard" | "addMemberToBoard" | "addMemberToCard" | "addMemberToOrganization" | "addOrganizationToEnterprise" | "addToEnterprisePluginWhitelist" | "addToOrganizationBoard" | "commentCard" | "convertToCardFromCheckItem" | "copyBoard" | "copyCard" | "copyCommentCard" | "createBoard" | "createCard" | "createList" | "createOrganization" | "deleteBoardInvitation" | "deleteCard" | "deleteOrganizationInvitation" | "disableEnterprisePluginWhitelist" | "disablePlugin" | "disablePowerUp" | "emailCard" | "enableEnterprisePluginWhitelist" | "enablePlugin" | "enablePowerUp" | "makeAdminOfBoard" | "makeNormalMemberOfBoard" | "makeNormalMemberOfOrganization" | "makeObserverOfBoard" | "memberJoinedTrello" | "moveCardFromBoard" | "moveCardToBoard" | "moveListFromBoard" | "moveListToBoard" | "removeChecklistFromCard" | "removeFromEnterprisePluginWhitelist" | "removeFromOrganizationBoard" | "removeMemberFromCard" | "removeOrganizationFromEnterprise" | "unconfirmedBoardInvitation" | "unconfirmedOrganizationInvitation" | "updateBoard" | "updateCard" | "updateCheckItemStateOnCard" | "updateChecklist" | "updateList" | "updateMember" | "updateOrganization" | "updateCustomFieldItem";