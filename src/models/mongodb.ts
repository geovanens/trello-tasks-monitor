import { Db, MongoClient } from 'mongodb';
import collectionManagement from "./collectionsManagement";

const MONGODB_URI = process.env.MONGODB_URI as string;
const DB_NAME = process.env.DATABASE as string;

class MongoDb {
	static db: Db;
	static uri = MONGODB_URI;
	static dbName = DB_NAME;
	static connection;

	static CONNECT(): Promise<Db> {
		if (this.db) {
			return Promise.resolve(this.db);

		} else {
			return MongoClient.connect(this.uri, { useNewUrlParser: true }).then(async (client) => {
				this.connection = client;
				this.db = client.db(this.dbName);
				await collectionManagement(this.db);
				return this.db;
			});
		}
	}

	static CLOSE() {
		this.connection.close();
	}
}

export default MongoDb;