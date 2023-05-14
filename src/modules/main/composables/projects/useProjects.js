import { ref } from 'vue';
import apiDB from '@/api/apiDB';

const useProjects = (store) => {
  const projects = ref([]);
  const foundsAllsQty = ref();
  const currentPage = ref(1);
  const limite = ref(6);
  const desde = ref(0);
  const currentPageQty = ref();
  const isLoadingProjects = ref(true);

  const getProjects = async (page = 1) => {
    if (page <= 0) page = 1;

    desde.value = (page - 1) * limite.value;
    isLoadingProjects.value = true;
    const { data } = await apiDB.get('/projects', {
      params: {
        limite: limite.value,
        desde: desde.value,
      },
    });

    if (data.foundsAllsQty > 0) {
      projects.value = data.projects;
      foundsAllsQty.value = data.foundsAllsQty;
      currentPageQty.value = data.currentPageQty;

      currentPage.value = page;
      isLoadingProjects.value = false;

      store.commit('main/setProjects', data.projects);
    }
  };

  getProjects();

  return {
    projects,
    foundsAllsQty,
    currentPageQty,
    currentPage,
    isLoadingProjects,

    nextPage: () => getProjects(currentPage.value + 1),
    prevPage: () => getProjects(currentPage.value - 1),
  };
};

export default (store) => {
  return useProjects(store);
};
