import express, { Request, Response, Application } from 'express';
import cors from 'cors';
import apiV1Router from './api/v1';

const { PORT = '3001' } = process.env;

const app:Application = express();

app.use(cors());
app.use(express.json());

app.get('/', (req:Request, res:Response) => {
  res.send('Status: running');
});

app.use('/v1', apiV1Router);

const port:number = parseInt(PORT, 10);
app.listen(port, () => {
  console.info(`Server is listening on port ${port}`);
});
