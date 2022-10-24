import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as express from 'express';
import * as expressWs from 'express-ws';
import routes from './routes';

const app: express.Application = express();
const wsInstance = expressWs(app);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(compression());
app.set('view engine', 'pug');
app.set('views', './views');
app.set('PORT', process.env.PORT);
app.use('/', express.static('chat'));
app.use('/painel', express.static('./src/views/dashboard/build'))
app.use('/', routes);

export default app;
export { wsInstance };