import apiDB from '@/api/apiDB';
import router from '@/router';

export const loadUserSession = async ({ commit }) => {
  try {
    const { data } = await apiDB.get('/usuarios/loadUserSession', {
      headers: {
        'x-token': `${localStorage.getItem('token')}`,
      },
    });

    data.usuario.token = data.token;
    commit('setUserSession', data.usuario);
  } catch (error) {
    console.log(error);
    commit('setErrorsHome', error.response.data.msg);
  }
};

// export const loadAgradecimientos = async ({ commit }, agradecimientos) => {
//   try {
//     // const { data } = await apiDB.get('/usuarios/loadUserSession', {
//     //   headers: {
//     //     'x-token': `${localStorage.getItem('token')}`,
//     //   },
//     // });
//     commit('setAgradecimientos', agradecimientos);
//   } catch (error) {
//     console.log(error);
//   }
// };

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
    return data;
  } catch (error) {
    const errorsList = error.response.data.errors;
    console.log('errorsList ->', errorsList);
  }
};

export const loginUser = async ({ commit }, bodyReq) => {
  try {
    // data is equal to = { email: ..., password: ... }
    const { data } = await apiDB.post('/auth/login', bodyReq);

    data.usuario.token = data.token;

    localStorage.setItem('token', data.token);
    commit('setUserSession', data.usuario);
    commit('setErrorsInLogin', null);
    if (data.token) router.push({ name: 'home' });
  } catch (error) {
    commit('setErrorsInLogin', error.response.data.msg);
  }
};

export const logoutUser = ({ commit }) => {
  try {
    commit('setUserSession', null);
  } catch (error) {
    console.log('error ->', error);
  }
};

export const updateImageUser = async ({ commit }, payload) => {
  try {
    const formData = new FormData();
    formData.append('imagen', payload.file.value);

    const data = await apiDB.put(`/usuarios/${payload.idUser}`, formData);
    console.log({ data });
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = async ({ commit }, userId) => {
  try {
    const { data } = await apiDB.delete(`/usuarios/${userId}`, {
      headers: {
        'x-token': `${localStorage.getItem('token')}`,
      },
    });

    const user = data.usuario;
    commit('setUserDeleted', user.nombre);
  } catch (error) {
    console.log(error);
  }
};

export const loadUserDetailsById = async ({ commit }, userId) => {
  try {
    const { data } = await apiDB.get(`/usuario/${userId}`);

    const user = data.usuario;
    commit('setUserDetails', user);
  } catch (error) {
    console.log(error);
  }
};

export const updateUserDetails = async ({ commit }, payload) => {
  try {
    const { data } = await apiDB.put(`/usuarios/${payload.id}`, {
      nombre: payload.nombre,
    });

    return data;
  } catch (error) {
    // console.log(error);
    return error;
  }
};
