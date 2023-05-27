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
      errorMsg.value = null;

      if (data.usuario) {
        store.commit('main/setUserDetails', data.usuario);
      }
      isLoading.value = false;
    } catch (error) {
      console.log('error');
      errorMsg.value = 'No se pudo encontrar al usuario';
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
