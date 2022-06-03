import { Router as createRouter, Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import Institution from '../../types/Institution';
import institutions from '../../../data/institutions.json';

const SAVED_DATA_PATH = '../../../data/saved.json';

const institutionRouter = createRouter();

institutionRouter.post('/:institutionId/save/', (req:Request, res:Response) => {
  const uuid:string = req.params.institutionId;
  const email = req.body.email as string;

  if (!email) {
    return res.json({
      success: false,
      error: 'Specify "email" parameter',
    });
  }

  const institutionExists:boolean = !!(institutions as Institution[])
    .find((institution:Institution) => institution.id === uuid);

  if (!institutionExists) {
    return res.json({
      success: false,
      error: 'Institution with the provided UUID doesn\'t exist',
    });
  }

  const savedInstitutionsJson = require(SAVED_DATA_PATH);
  savedInstitutionsJson[email] = [
    uuid,
    ...(savedInstitutionsJson[email] || []),
  ];

  fs.writeFileSync(
    path.resolve(__dirname, SAVED_DATA_PATH),
    JSON.stringify(savedInstitutionsJson),
  );

  res.json({ success: true, error: '' });
});

institutionRouter.post('/:institutionId/unsave/', (req:Request, res:Response) => {
  const uuid:string = req.params.institutionId;
  const email:string = req.body.email;

  if (!email) {
    return res.json({
      success: false,
      error: 'Specify "email" parameter',
    });
  }

  const institutionExists:boolean = !!(institutions as Institution[])
    .find((institution:Institution) => institution.id === uuid);

  if (!institutionExists) {
    return res.json({
      success: false,
      error: 'Institution with the provided UUID doesn\'t exist',
    });
  }

  const savedInstitutionsJson = require(SAVED_DATA_PATH);
  savedInstitutionsJson[email] = (savedInstitutionsJson[email] || []).filter(savedId => savedId !== uuid);

  fs.writeFileSync(
    path.resolve(__dirname, SAVED_DATA_PATH),
    JSON.stringify(savedInstitutionsJson),
  );

  res.json({ success: true, error: '' });
});

export default institutionRouter;
