import { ref, computed } from 'vue';
import { useStore } from 'vuex';

const useRegisterForm = () => {
  const store = useStore();

  const name = ref();
  const email = ref();
  const password = ref();
  const role = ref('USER_ROLE');

  const isEmailValid = computed(() => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email.value);
  });

  const isFormValid = computed(
    () => isEmailValid.value && name.value && password.value
  );

  const register = () => {
    store.dispatch('main/registerUser', {
      email: email.value,
      password: password.value,
      nombre: name.value,
      rol: role.value,
    });
  };

  return {
    name,
    email,
    password,
    isFormValid,
    isEmailValid,
    register,
  };
};

export default useRegisterForm;
