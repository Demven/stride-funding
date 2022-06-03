import { Router as createRouter, Request, Response } from 'express';
import Account from '../../types/Account';

const ACCOUNTS_DATA_PATH = '../../../data/accounts.json';

const accountRouter = createRouter();

accountRouter.post('/sign-in', (req:Request, res:Response) => {
  const { name, email } = req.body;
  const existingAccount:Account|undefined = require(ACCOUNTS_DATA_PATH)[email];

  if (existingAccount?.name === name) {
    res.json(existingAccount);
  } else {
    res.sendStatus(401);
  }
});

accountRouter.post('/validate', (req:Request, res:Response) => {
  const { token } = req.body;
  const accounts:Account|undefined = require(ACCOUNTS_DATA_PATH);

  if (!token) return res.sendStatus(401);

  const existingAccount:Account|undefined = Object
    .values(accounts)
    .find((account:Account) => account?.token === token);

  if (existingAccount?.name) {
    res.sendStatus(200);
  } else {
    res.sendStatus(401);
  }
});

export default accountRouter;
