import { Router } from 'express';
import { readdirSync } from 'fs';
import { join } from 'path';

const router = Router();
const ROUTES_PATH = join(__dirname, 'routes');

main();

async function main(){
	for (const path of readdirSync(ROUTES_PATH)) {
		const module = import(`./routes/${path}`);
		router.use('/',(await module).default);
	}
}

export default router;