import { useStore } from 'vuex';

const useAuth = () => {
  const store = useStore();

  const logout = () => {
    store.dispatch('main/logoutUser');
  };

  return {
    logout,
  };
};

export default useAuth;
