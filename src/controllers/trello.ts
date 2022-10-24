import { collectionName, Task, TrelloAction, User } from "@interfaces";
import MongoDb from "@models/mongoDb";
import { Request, Response } from "express";

async function updateTask(request: Request, response: Response) {
    const action: TrelloAction = request.body.action;
    console.log('action', action);
    if (action?.type === "updateCustomFieldItem") {
        const userId = action.display?.entities?.memberCreator?.id;
        const cardId = action.display?.entities?.card?.id;
        const task = await MongoDb.db
        .collection(collectionName.TASKS)
        .findOne({ 'user.id': userId, 'card.id': cardId  }); 
        if (task) {
            console.log('task no banco', task);
        } else {
            console.log('inserir task no banco');
            const data = action.data;
            console.log('data', data);
            const board = data.board;
            const card = data.card;
            const user: User = action.memberCreator;
            const newTask: Task = {
                board,
                card,
                inProgress: true,
                timers: [],
                user
            }
            const res = await MongoDb.db.collection(collectionName.TASKS).insertOne(newTask);
            console.log('insercao', res);
        }
    };
    response.status(200).json({message: 'ok'});
}

export { updateTask };