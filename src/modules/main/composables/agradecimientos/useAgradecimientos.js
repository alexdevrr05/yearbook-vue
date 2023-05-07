import { ref } from 'vue';
import apiDB from '@/api/apiDB';

const useAgradecimientos = () => {
  const agradecimientos = ref([]);

  const getAgradecimientos = async (page = 1) => {
    const { data } = await apiDB.get('/agradecimientos');

    agradecimientos.value = data.agradecimientos;
  };

  getAgradecimientos();

  return {
    agradecimientos,
  };
};

export default useAgradecimientos;
