import { ref, computed } from 'vue';
import { useStore } from 'vuex';

const useLoginForm = () => {
  const store = useStore();

  const email = ref();
  const password = ref();

  const isEmailValid = computed(() => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email.value);
  });

  const isFormValid = computed(() => isEmailValid.value && password.value);

  const login = () => {
    store.dispatch('main/loginUser', {
      email: email.value,
      password: password.value,
    });
  };

  return {
    loginEmail: email,
    loginPassword: password,
    loginIsFormValid: isFormValid,
    login,
  };
};

export default useLoginForm;
