import App from './App.vue';
import router from './router';
import { createApp } from 'vue';
import { MotionPlugin } from '@vueuse/motion';

// Vuetify
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

const vuetify = createVuetify({
  components,
  directives,
});

createApp(App).use(vuetify).use(MotionPlugin).use(router).mount('#app');
