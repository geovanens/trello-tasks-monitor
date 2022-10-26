import { collectionName, TrelloAction } from "../interfaces";
import MongoDb from "../models/mongoDb";
import { Request, Response } from "express";
import axios from "axios";

const TOKEN = process.env.TRELLO_TOKEN;
const KEY = process.env.TRELLO_KEY;

async function getCard(id: string) {
    const options = {
        method: 'GET',
        url: `https://api.trello.com/1/cards/${id}`,
        params: {
            key: KEY,
            token: TOKEN
        }
    };
    const response = await axios.request(options);
    return response.data;
}

async function getList(id: string) {
    const options = {
        method: 'GET',
        url: `https://api.trello.com/1/lists/${id}`,
        params: {
            key: KEY,
            token: TOKEN
        }
    };
    const response = await axios.request(options);
    return response.data;
}

async function getUser(id: string) {
    const options = {
        method: 'GET',
        url: `https://api.trello.com/1/members/${id}`,
        params: {
            key: KEY,
            token: TOKEN
        }
    };
    const response = await axios.request(options);
    return response.data;
}

async function updateCard(id: string) {
    const COLLECTION_CARDS = MongoDb.db.collection(collectionName.CARDS);
    const card = await getCard(id);
    const query = {id};
    const update = { $set: card };
    const options = { upsert: true };
    COLLECTION_CARDS.updateOne(query, update, options);
    return card;
}

async function updateUsers(ids: string[]) {
    const COLLECTION_USERS = MongoDb.db.collection(collectionName.USERS);
    const dbMembers = await COLLECTION_USERS.find({id: {$in: ids}}).toArray();
    const idDbMembers = dbMembers.map(e => e.id);
    const remaining = ids.filter(id => !idDbMembers.includes(id));
    remaining.forEach(id => {
        const user = getUser(id);
        COLLECTION_USERS.insertOne(user);
    })
}

async function updateLists(id: string) {
    const COLLECTION_LISTS = MongoDb.db.collection(collectionName.LISTS);
    const list = getList(id);
    const query = {id};
    const update = { $set: list };
    const options = { upsert: true };
    COLLECTION_LISTS.updateOne(query, update, options);
}


async function saveData(request: Request, response: Response) {
    const COLLECTION_CARDS = MongoDb.db.collection(collectionName.CARDS);
    const action: TrelloAction = request.body.action;
    const acceptedTypes = ['addMemberToCard', 'removeMemberFromCard', "createCard", "deleteCard", "updateCard"];
    if (acceptedTypes.includes(action?.type)) {
        const cardId = action.data.card.id;
        if (action?.type === "deleteCard") {
            console.log('deletando card', cardId);
            await COLLECTION_CARDS.deleteOne(cardId);
        } else {
            console.log('atualizando card', cardId);
            const card = await updateCard(cardId);
            const { idMembers, idList } = card;
            updateUsers(idMembers);
            updateLists(idList);
        }
    };
    response.status(200).json({message: 'ok'});
}

export { saveData };