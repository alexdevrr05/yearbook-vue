export const setUsers = (state, users) => {
  state.users = users;
};

export const setUserSession = (state, credentials) => {
  if (!credentials) {
    localStorage.removeItem('token');
    state.userSession = {};
  }

  state.userSession = credentials;
  // state.userSession.token = credentials.token;
};

export const setErrorsInLogin = (state, errors) => {
  state.errorsInLogin = errors;
};

export const setErrorsHome = (state, errors) => {
  state.errorsInHome = errors;
};

export const setAcknowledgmentsQty = (state, acknowledgment) => {
  state.acknowledgmentsQty = acknowledgment;
};

export const setAgradecimientos = (state, agradecimientos) => {
  state.agradecimientos = agradecimientos;
};

export const setAllFoundsAcknowledgmentsQty = (state, currentPageQty) => {
  state.foundsAllAcknowledgmentsQty = currentPageQty;
};

export const setCurrentPageAcknowledgmentsQty = (state, currentPageQty) => {
  state.currentPageAcknowledgmentsQty = currentPageQty;
};

export const setCurrentNumberPage = (state, currentNumberPage) => {
  state.currentNumberPage = currentNumberPage;
};
