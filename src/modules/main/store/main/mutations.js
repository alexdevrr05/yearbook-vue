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

// export const setAgradecimientos = (state, agradecimientos) => {
//   state.agradecimientos = agradecimientos;
// };
