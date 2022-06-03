import { Router as createRouter, Request, Response } from 'express';
import accountRouter from './accountRouter';
import institutionsRouter from './institutionsRouter';
import institutionRouter from './institutionRouter';

const v1Router = createRouter();

v1Router.get('/', (req:Request, res:Response) => {
  res.send('Status: running');
});

v1Router.use('/account', accountRouter);
v1Router.use('/institutions', institutionsRouter);
v1Router.use('/institution', institutionRouter);

export default v1Router;
