import { ref } from 'vue';
import apiDB from '@/api/apiDB';

const useAgradecimientos = () => {
  const agradecimientos = ref([]);
  const foundsAllsQty = ref();
  const currentPage = ref(1);
  const limite = ref(6);
  const desde = ref(0);
  const currentPageQty = ref();
  const isLoading = ref(true);

  const getAgradecimientos = async (page = 1) => {
    if (page <= 0) page = 1;

    desde.value = (page - 1) * limite.value;
    isLoading.value = true;
    const { data } = await apiDB.get('/agradecimientos', {
      params: {
        limite: limite.value,
        desde: desde.value,
      },
    });

    if (data.foundsAllsQty > 0) {
      agradecimientos.value = data.agradecimientos;
      foundsAllsQty.value = data.foundsAllsQty;
      currentPageQty.value = data.currentPageQty;

      currentPage.value = page;
      isLoading.value = false;
    }
  };

  getAgradecimientos();

  return {
    agradecimientos,
    foundsAllsQty,
    currentPageQty,
    currentPage,
    isLoading,

    nextPage: () => getAgradecimientos(currentPage.value + 1),
    prevPage: () => getAgradecimientos(currentPage.value - 1),
  };
};

export default useAgradecimientos;
