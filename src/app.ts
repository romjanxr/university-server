import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import { routes } from './app/routes';
const app: Application = express();

/* Parser */
app.use(express.json());
app.use(cors());

/* application routes */
app.use('/api/v1', routes);

/* Test Routes */
const test = (req: Request, res: Response) => {
  res.send('Hello  World!');
};

app.get('/', test);

/* Middlewares */
app.use(globalErrorHandler);
export default app;
