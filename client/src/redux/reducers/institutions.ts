import {
  SET_INSTITUTIONS,
  SET_INSTITUTIONS_LOADING,
  SET_SAVED_INSTITUTIONS,
  SET_SAVED_INSTITUTIONS_LOADING,
  SET_SAVED_INSTITUTIONS_LOADED,
} from '../actions/institutions';
import Institution from '../../types/Institution';

export interface InstitutionsState {
  institutions: Institution[];
  institutionsLoading: boolean;
  savedInstitutions: Institution[];
  savedInstitutionsLoading: boolean;
  savedInstitutionsLoaded: boolean;
}

const INITIAL_STATE:InstitutionsState = {
  institutions: [],
  institutionsLoading: false,
  savedInstitutions: [],
  savedInstitutionsLoading: false,
  savedInstitutionsLoaded: false,
};

export function getInstitutionsInitialState () {
  return INITIAL_STATE;
}

export default function institutionsReducer (state = INITIAL_STATE, action?:any) {
  switch (action.type) {
    case SET_INSTITUTIONS:
      return {
        ...state,
        institutions: action.institutions,
      };
    case SET_INSTITUTIONS_LOADING:
      return {
        ...state,
        institutionsLoading: action.institutionsLoading,
      };
    case SET_SAVED_INSTITUTIONS:
      return {
        ...state,
        savedInstitutions: action.savedInstitutions,
      };
    case SET_SAVED_INSTITUTIONS_LOADING:
      return {
        ...state,
        savedInstitutionsLoading: action.savedInstitutionsLoading,
      };
    case SET_SAVED_INSTITUTIONS_LOADED:
      return {
        ...state,
        savedInstitutionsLoaded: action.savedInstitutionsLoaded,
      };
    default:
      return state;
  }
};
