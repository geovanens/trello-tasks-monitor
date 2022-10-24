import { Collection } from '@interfaces';
import MongoDb from '@models/mongodb';

function findOne(collection: Collection, filter: any) {
	return MongoDb.db.collection(collection).findOne(filter, { projection: { _id: 0 } });
}

function find(collection: Collection, filter: any) {
	return MongoDb.db.collection(collection).find(filter, { projection: { _id: 0 } });
}

function update(collection: Collection, filter: any, body: any) {
	return MongoDb.db.collection(collection).updateOne(filter, body);
}

function insert(collection: Collection, body: any) {
	return MongoDb.db.collection(collection).insertOne(body);
}
function updateMany(collection: Collection, filter: any, body: any) {
	return MongoDb.db.collection(collection).updateMany(filter, body);
}

function updateOne(collection: Collection, filter: any, body: any) {
	return MongoDb.db.collection(collection).updateOne(filter, body);
}


export { findOne, update, updateMany, updateOne, insert, find };