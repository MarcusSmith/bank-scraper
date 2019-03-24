import express from 'express';
import { config } from './config';
import { handleError } from './middleware/handle-error';
import * as routes from './routes';

const app = express();
app.disable('x-powered-by');

routes.register(app);
app.use(handleError);

app.listen(config.port, () => {
  console.log(`server started at http://localhost:${config.port}`);
});
