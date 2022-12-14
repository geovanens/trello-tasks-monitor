const schema = {
	bsonType: 'object',
	required: [
        'id',
        'avatarHash',
        'avatarUrl',
        'fullName',
        'username'
	],
	properties: {
		id: {
			type: 'string',
			description: 'unique id',
		},
		avatarHash: {
			type: 'string',
			description: 'avatar hash user',
		},
        avatarUrl: {
			type: 'string',
			description: 'avatar url user',
		},
        fullName: {
			type: 'string',
			description: 'full name user',
		},
        username: {
			type: 'string',
			description: 'username',
		},
		working: {
			type: 'boolean',
			description: 'in working',
		},
		created: {
			type: 'string',
			description: 'date created',
		}
	},
};

export default schema;