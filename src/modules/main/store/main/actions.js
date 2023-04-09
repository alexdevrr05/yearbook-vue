import apiDB from '@/api/apiDB';

export const loadUsers = async ({ commit }) => {
  try {
    const { data } = await apiDB.get('/usuarios');
    commit('setUsers', data.total);
  } catch (error) {
    console.log(error);
  }
};
