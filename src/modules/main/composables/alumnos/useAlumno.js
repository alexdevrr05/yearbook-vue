import { ref } from 'vue';
import apiDB from '@/api/apiDB';

const useAlumno = (store, userId = '1') => {
  const isLoading = ref(true);
  const alumno = ref();
  const errorMsg = ref();

  const searchAlumno = async (id) => {
    if (!id) return;

    try {
      isLoading.value = true;
      const { data } = await apiDB.get(`/usuarios/userDetails/${id}`);
      alumno.value = data;

      store.commit('main/setUserDetails', data.usuario);
    } catch (error) {
      console.log('error');
      errorMsg.value = 'No se pudo encontrar ese usuario';
    }

    isLoading.value = false;
  };

  searchAlumno(userId);

  return {
    isLoading,
    alumno,
    errorMsg,
    searchAlumno,
  };
};

export default useAlumno;
