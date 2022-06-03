import { Dispatch } from 'redux';
import {
  setInstitutionsAction,
  setInstitutionsLoadingAction,
  setSavedInstitutionsAction,
  setSavedInstitutionsLoadingAction,
  setSavedInstitutionsLoadedAction,
} from '../actions/institutions';
import * as api from '../../services/api';
import { State } from '../reducers';
import Institution from '../../types/Institution';
import InstitutionFilters from '../../types/InstitutionFilters';

export function fetchInstitutions (filters?:InstitutionFilters) {
  return (dispatch:Dispatch, getState:() => State) => {
    dispatch(setInstitutionsLoadingAction(true));

    api.fetchInstitutions(filters)
      .then((institutions:Institution[]) => {
        dispatch(setInstitutionsAction(institutions));
      })
      .catch(console.error)
      .finally(() => {
        dispatch(setInstitutionsLoadingAction(false));
      });
  };
}

export function fetchSavedInstitutions (filters?:InstitutionFilters) {
  return (dispatch:Dispatch, getState:() => State) => {
    const { account: { email } } = getState();

    dispatch(setSavedInstitutionsLoadingAction(true));

    api.fetchSavedInstitutions(email, filters)
      .then((savedInstitutions:Institution[]) => {
        dispatch(setSavedInstitutionsAction(savedInstitutions));
      })
      .catch(console.error)
      .finally(() => {
        dispatch(setSavedInstitutionsLoadingAction(false));
        dispatch(setSavedInstitutionsLoadedAction(true));
      });
  };
}
