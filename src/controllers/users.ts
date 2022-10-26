import { collectionName, User } from "../interfaces";
import MongoDb from "../models/mongoDb";
import { now } from "../helpers/date";

const USER_COLLECTION = MongoDb.db.collection(collectionName.USERS);

async function find(user_: any): Promise<User> {
    let userDb: any = await USER_COLLECTION
    .findOne({ id: user_.id }); 
    const user: User = userDb ? userDb : insert(user_)
    return user;
}

function insert(user: any): User {
    const { id, avatarHash, avatarUrl, fullName, username } = user;
    const date = now();
    const userToDb = {
        id,
        avatarHash,
        avatarUrl,
        fullName,
        username,
        working: false,
        created: date,
        ...user
    };
    USER_COLLECTION.insertOne(userToDb);
    return userToDb;
}

export { find }