const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const institutions = require('./data/institutions.json');

const PORT = 3001;
const ACCOUNTS_DATA_PATH = './data/accounts.json';
const SAVED_DATA_PATH = './data/saved.json';

const app = express();

app.use(cors());
app.use(express.json());

app.post('/sign-in', (req, res) => {
  const { name, email } = req.body;
  const existingAccount = require(ACCOUNTS_DATA_PATH)[email];

  if (existingAccount?.name === name) {
    res.json(existingAccount);
  } else {
    res.sendStatus(401);
  }
});

app.post('/validate', (req, res) => {
  const { token } = req.body;
  const accounts = require(ACCOUNTS_DATA_PATH);

  if (!token) return res.sendStatus(401);

  const existingAccount = Object
    .values(accounts)
    .find(value => value?.token === token);

  if (existingAccount?.name) {
    res.sendStatus(200);
  } else {
    res.sendStatus(401);
  }
});

app.get('/institutions', (req, res) => {
  const searchByName = (req.query.name || '').toLowerCase();
  const searchByZip = req.query.zip || '';
  const limit = parseInt(req.query.limit, 10) || 100;

  const filteredInstitutions = (searchByName || searchByZip)
    ? institutions.filter((institution) => (
      institution.name.toLowerCase().includes(searchByName) && (institution.zip || '').includes(searchByZip)
    ))
    : institutions;

  const withoutAnnualRate = filteredInstitutions.filter((institution) => !Number(institution.annualRate));
  const withAnnualRate = filteredInstitutions.filter((institution) => !!Number(institution.annualRate));

  const sortedInstitutions = [
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

app.get('/institutions/saved', (req, res) => {
  const email = req.query.email;
  const searchByName = (req.query.name || '').toLowerCase();
  const searchByZip = req.query.zip || '';

  const savedInstitutionIds = require(SAVED_DATA_PATH)[email] || [];
  const savedInstitutions = savedInstitutionIds.map(uuid => institutions.find((institution) => institution.id === uuid));

  const filteredSavedInstitutions = (searchByName || searchByZip)
    ? savedInstitutions.filter((institution) => (
        institution.name.toLowerCase().includes(searchByName) && (institution.zip || '').includes(searchByZip)
      ))
    : savedInstitutions;

  return res.json(filteredSavedInstitutions);
});

app.post('/institution/:institutionId/save/', (req, res) => {
  const uuid = req.params.institutionId;
  const { email } = req.body;

  if (!email) {
    return res.json({ success: false, error: 'Specify "email" parameter' });
  }

  const institutionExists = !!institutions.find((institution) => institution.id === uuid);
  if (!institutionExists) {
    return res.json({ success: false, error: 'Institution with the provided UUID doesn\'t exist' });
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

app.post('/institution/:institutionId/unsave/', (req, res) => {
  const uuid = req.params.institutionId;
  const { email } = req.body;

  if (!email) {
    return res.json({ success: false, error: 'Specify "email" parameter' });
  }

  const institutionExists = !!institutions.find((institution) => institution.id === uuid);
  if (!institutionExists) {
    return res.json({ success: false, error: 'Institution with the provided UUID doesn\'t exist' });
  }

  const savedInstitutionsJson = require(SAVED_DATA_PATH);
  savedInstitutionsJson[email] = (savedInstitutionsJson[email] || []).filter(savedId => savedId !== uuid);

  fs.writeFileSync(
    path.resolve(__dirname, SAVED_DATA_PATH),
    JSON.stringify(savedInstitutionsJson),
  );

  res.json({ success: true, error: '' });
});

app.listen(PORT, () => {
  console.info(`Server is listening on port ${PORT}`);
});
