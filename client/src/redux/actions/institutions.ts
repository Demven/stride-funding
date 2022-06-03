import Institution from '../../types/Institution';

export const SET_INSTITUTIONS = 'institutions/SET_INSTITUTIONS';
export const SET_INSTITUTIONS_LOADING = 'institutions/SET_INSTITUTIONS_LOADING';
export const SET_SAVED_INSTITUTIONS = 'institutions/SET_SAVED_INSTITUTIONS';
export const SET_SAVED_INSTITUTIONS_LOADING = 'institutions/SET_SAVED_INSTITUTIONS_LOADING';
export const SET_SAVED_INSTITUTIONS_LOADED = 'institutions/SET_SAVED_INSTITUTIONS_LOADED';

export function setInstitutionsAction (institutions:Institution[]) {
  return {
    type: SET_INSTITUTIONS,
    institutions,
  };
}

export function setInstitutionsLoadingAction (institutionsLoading:boolean) {
  return {
    type: SET_INSTITUTIONS_LOADING,
    institutionsLoading,
  };
}

export function setSavedInstitutionsAction (savedInstitutions:Institution[]) {
  return {
    type: SET_SAVED_INSTITUTIONS,
    savedInstitutions,
  };
}

export function setSavedInstitutionsLoadingAction (savedInstitutionsLoading:boolean) {
  return {
    type: SET_SAVED_INSTITUTIONS_LOADING,
    savedInstitutionsLoading,
  };
}

export function setSavedInstitutionsLoadedAction (savedInstitutionsLoaded:boolean) {
  return {
    type: SET_SAVED_INSTITUTIONS_LOADED,
    savedInstitutionsLoaded,
  };
}
