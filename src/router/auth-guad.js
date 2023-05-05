const isAutheticatedGuard = async (to, from, next) => {
  const token = localStorage.getItem('token');

  console.log('token ->', token);
  console.log('from ->', from);
  console.log('next ->', next);
};
