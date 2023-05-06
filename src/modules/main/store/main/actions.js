import apiDB from '@/api/apiDB';
import router from '@/router';

export const loadUsers = async ({ commit }) => {
  try {
    const { data } = await apiDB.get('/usuarios', {
      headers: {
        Authorization: 'Bearer ' + 'Example',
      },
    });
    commit('setUsers', data.total);
  } catch (error) {
    console.log(error);
  }
};

export const registerUser = async ({ commit }, bodyReq) => {
  try {
    // data is equal to = { email, nombre, password, rol }
    const { data } = await apiDB.post('/usuarios', bodyReq);
  } catch (error) {
    const errorsList = error.response.data.errors;
    console.log('errorsList ->', errorsList);
  }
};

export const loginUser = async ({ commit }, bodyReq) => {
  try {
    // data is equal to = { email: ..., password: ... }
    const { data } = await apiDB.post('/auth/login', bodyReq);
    localStorage.setItem('token', data.token);
    commit('setUserSession', { token: localStorage.getItem('token') });
    if (data.token) router.push({ name: 'home' });
  } catch (error) {
    const errorsList = error.response.data;
    console.log('errorsList ->', errorsList);
  }
};

export const logoutUser = ({ commit }) => {
  try {
    commit('setUserSession', null);
  } catch (error) {
    console.log('error ->', error);
  }
};
