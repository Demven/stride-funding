import { Router as createRouter, Request, Response } from 'express';
import Institution from '../../types/Institution';
import institutions from '../../../data/institutions.json';

const SAVED_DATA_PATH = '../../../data/saved.json';

const institutionsRouter = createRouter();

institutionsRouter.get('/', (req:Request, res:Response) => {
  const searchByName:string = (req.query.name as string || '').toLowerCase();
  const searchByZip:string = req.query.zip as string || '';
  const limit:number = parseInt(req.query.limit as string, 10) || 100;

  const filteredInstitutions:Institution[] = (searchByName || searchByZip)
    ? (institutions as Institution[]).filter((institution:Institution) => (
        institution.name.toLowerCase().includes(searchByName) && (institution.zip || '').includes(searchByZip)
      ))
    : institutions as Institution[];

  const withoutAnnualRate:Institution[] = filteredInstitutions.filter((institution:Institution) => !Number(institution.annualRate));
  const withAnnualRate:Institution[] = filteredInstitutions.filter((institution:Institution) => !!Number(institution.annualRate));

  const sortedInstitutions:Institution[] = [
    ...withAnnualRate.sort((a, b) => {
      if (a.annualRate < b.annualRate) return -1;
      if (a.annualRate > b.annualRate) return 1;
      return 0;
    }),
    ...withoutAnnualRate,
  ]
    .slice(0, limit);

  return res.json(sortedInstitutions);
});

institutionsRouter.get('/saved', (req:Request, res:Response) => {
  const email:string = req.query.email as string;
  const searchByName:string = (req.query.name as string || '').toLowerCase();
  const searchByZip:string = req.query.zip as string || '';

  const savedInstitutionIds:string[] = require(SAVED_DATA_PATH)[email] || [];
  const savedInstitutions:Institution[] = savedInstitutionIds.map((uuid:string) => {
    return (institutions as Institution[])
      .find((institution:Institution) => institution.id === uuid);
  });

  const filteredSavedInstitutions = (searchByName || searchByZip)
    ? savedInstitutions.filter((institution:Institution) => (
      institution.name.toLowerCase().includes(searchByName) && (institution.zip || '').includes(searchByZip)
    ))
    : savedInstitutions;

  return res.json(filteredSavedInstitutions);
});

export default institutionsRouter;
