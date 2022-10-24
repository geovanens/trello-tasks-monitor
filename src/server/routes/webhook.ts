import { updateTask } from '../../controllers/trello'
import { Router } from 'express';

const router = Router();

router.get('/webhook', (_req, res) => {
    console.log('NEW request to trello api webhook');
    res.sendStatus(200); 
});

router.post('/webhook',  updateTask);


export default router;