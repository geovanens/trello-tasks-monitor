const schema = {
	bsonType: 'object',
	required: [
        'board.id',
        'board.name',
        'board.shortLink',
        'card.id',
        'card.name',
        'card.idShort',
        'card.shortLink',
	],
	properties: {
        'board.id': {
            type: 'string',
			description: 'board id',
        },
        'board.name': {
            type: 'string',
			description: 'board name',
        },
        'board.shortLink': {
            type: 'string',
			description: 'board short link',
        },
        'card.id': {
            type: 'string',
			description: 'card id',
        },
        'card.name': {
            type: 'string',
			description: 'card name',
        },
        'card.idShort': {
            type: 'string',
			description: 'card idshort',
        },
        'card.shortLink': {
            type: 'string',
			description: 'short link card',
        },
        inProgress: {
			type: 'bollean',
			description: 'progress task',
		},
	},
};

export default schema;