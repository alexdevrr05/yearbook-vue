import { ref } from 'vue';
import apiDB from '@/api/apiDB';

const useProjects = (store) => {
  const projects = ref([]);
  const foundsAllsQtyProjects = ref();
  const currentPage = ref(1);
  const limite = ref(6);
  const desde = ref(0);
  const currentPageQtyProjects = ref();
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
      foundsAllsQtyProjects.value = data.foundsAllsQty;
      currentPageQtyProjects.value = data.currentPageQty;

      // currentPage.value = page;
      isLoadingProjects.value = false;

      store.commit('main/setProjects', data.projects);
      store.commit('main/setAllFoundsProjectsQty', data.foundsAllsQty);
      store.commit('main/setCurrentNumberPageProjects', page);
      store.commit('main/setCurrentPageProjectsQty', data.currentPageQty);
    }
  };

  getProjects();

  return {
    projects,
    foundsAllsQtyProjects,
    currentPageQtyProjects,
    currentPage,
    isLoadingProjects,

    prevPageProjects: () => getProjects(currentPage.value - 1),
    nextPageProjects: () => getProjects(currentPage.value + 1),
  };
};

export default (store) => {
  return useProjects(store);
};
