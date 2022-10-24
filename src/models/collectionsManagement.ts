import { findIndex } from 'lodash';
import { Db } from 'mongodb';
import * as schemas from './schemas/index';

/**
 * Indexes que devem ser criados para as coleções
 * Adicionar propriedade `name` se o nome do index( concat keys)
 * for grande
 */
const Indexes = {
	users: [
		{
			key: { id: 1 },
			unique: true,
			background: true,
			sparse: true,
		},
	],
};

/**
 * Cria as coleções obrigatórias do projeto, com seus respectivos schemas de validação.
 * Coleções:
 *
 * users - guarda todos os usuários 
 * tasks - guarda as tarefas
 *
 * @param mongoDb objeto de conexão com o mongo db
 */
export default async function (mongoDb: Db): Promise<{ error: any, success: boolean }> {
	try {
		const listOfCollections = (await mongoDb.command({
			listCollections: 1.0,
			authorizedCollections: true,
			nameOnly: true,
		})).cursor.firstBatch;

		for (const collectionName of Object.keys(schemas)) {
			if (findIndex(listOfCollections, { name: collectionName }) === -1) {
				await create(collectionName, mongoDb, Indexes[collectionName], schemas[collectionName]);

			} else {
				await updateSchema(collectionName, mongoDb, schemas[collectionName]);

			}

		}

		return Promise.resolve({ error: null, success: true });

	} catch (error) {
		return Promise.resolve({ error, success: false });
	}
}

/**
 * Cria a coleção com o nome passado em parametro(caso não exista) e adiciona os índices em background
 * @param collection Nome da coleção a ser criada
 * @param mongoDb Objeto de conexão ao Mongo Db
 * @param indexes Índices que devem ser criados para a coleção
 * @param options Opções/configurações para crianção da coleção de acordo com a documentação do MongoDb
 */
async function create(collection: string, mongoDb: Db, indexes: any[], schema: any = {}): Promise<{ error: any, success: boolean, schema: any }> {
	try {
		await mongoDb.createCollection(collection, {
			validator: {
				$jsonSchema: schema,
			},
		});
		await mongoDb.collection(collection).createIndexes(indexes);

		return Promise.resolve({ schema, error: null, success: false });

	} catch (error) {
		return Promise.resolve({ schema, error, success: false });
	}
}

/**
 * Caso a coleção já esteja criada, basta atualizar seu schema
 * @param collection Nome da coleção a ser criada
 * @param mongoDb Objeto de conexão ao Mongo Db
 * @param indexes Índices que devem ser criados para a coleção
 * @param options Opções/configurações para crianção da coleção de acordo com a documentação do MongoDb
 */
async function updateSchema(collection: string, mongoDb: Db, schema: any = {}): Promise<{ error: any, success: boolean }> {
	try {
		await mongoDb.command({
			collMod: collection,
			validator: {
				$jsonSchema: schema,
			},
			validationAction: 'error',
			validationLevel: 'strict',
		});

		return Promise.resolve({ error: null, success: false });

	} catch (error) {
		return Promise.resolve({ error, success: false });
	}
}
