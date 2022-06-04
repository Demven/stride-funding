import Account from '../types/Account';
import Institution from '../types/Institution';
import InstitutionFilters from '../types/InstitutionFilters';

const API_HOST = process.env.REACT_APP_API_HOST;

export function signIn (
  name:string,
  email:string,
):Promise<Account> {
  return fetch(`${API_HOST}/account/sign-in`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name,
      email,
    }),
  })
    .then((response:Response) => response.json());
}

export function fetchInstitutions (filters?:InstitutionFilters):Promise<Institution[]> {
  const { name, zipCode } = filters || {};

  const filtersQuery = (name || zipCode)
    ? `?${name ? `name=${name}&` : ''}${zipCode ? `zip=${zipCode}` : ''}`
    : '';

  return fetch(`${API_HOST}/institutions${filtersQuery}`)
    .then((response:Response) => response.json());
}

export function fetchSavedInstitutions (email:string|undefined, filters?:InstitutionFilters):Promise<Institution[]> {
  const { name, zipCode } = filters || {};

  const filtersQuery = (name || zipCode)
    ? `${name ? `&name=${name}` : ''}${zipCode ? `&zip=${zipCode}` : ''}`
    : '';

  return fetch(`${API_HOST}/institutions/saved?email=${email}${filtersQuery}`)
    .then((response:Response) => response.json());
}

export function saveInstitution (uuid:string, email:string):Promise<boolean> {
  return fetch(`${API_HOST}/institution/${uuid}/save`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  })
    .then((response:Response) => response.json())
    .then(({ success, error }) => {
      if (error) throw new Error(error);

      return success;
    });
}

export function unsaveInstitution (uuid:string, email:string):Promise<boolean> {
  return fetch(`${API_HOST}/institution/${uuid}/unsave`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  })
    .then((response:Response) => response.json())
    .then(({ success, error }) => {
      if (error) throw new Error(error);

      return success;
    });
}
