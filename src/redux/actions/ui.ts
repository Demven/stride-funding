export const SET_SHOW_SAVED = 'ui/SET_SHOW_SAVED';

export function setShowSavedAction (showSaved:boolean) {
  return {
    type: SET_SHOW_SAVED,
    showSaved,
  };
}
