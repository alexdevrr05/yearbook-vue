export const setUsers = (state, users) => {
  state.users = users;
};

export const setUserSession = (state, credentials) => {
  if (!credentials) {
    localStorage.removeItem('token');
    state.userSession = {};
  }

  state.userSession.token = credentials?.token;
};
