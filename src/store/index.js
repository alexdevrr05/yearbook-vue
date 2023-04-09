import { createStore } from 'vuex';

import main from '../modules/main/store/main';

// store
const store = createStore({
  modules: {
    main,
  },
});

export default store;
