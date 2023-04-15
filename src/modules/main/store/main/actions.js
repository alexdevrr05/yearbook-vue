import apiDB from '@/api/apiDB';

export const loadUsers = async ({ commit }) => {
  try {
    const { data } = await apiDB.get('/usuarios');
    commit('setUsers', data.total);
  } catch (error) {
    console.log(error);
  }
};

export const registerUser = async ({ commit }, bodyReq) => {
  try {
    // data is equal to = { email, nombre, password, rol }
    const { data } = await apiDB.post('/usuarios', bodyReq);

    console.log('data ->', data);
  } catch (error) {
    const errorsList = error.response.data.errors;
    console.log('errorsList ->', errorsList);
  }
};

export const loginUser = async ({ commit }, bodyReq) => {
  try {
    // data is equal to = { email: ..., password: ... }
    const { data } = await apiDB.post('/auth/login', bodyReq);

    console.log('data ->', data);
  } catch (error) {
    console.log('🚀 ~ file: actions.js:31 ~ loginUser ~ error:', error);
    const errorsList = error.response.data.errors;
    console.log('errorsList ->', errorsList);
  }
};
