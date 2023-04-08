import { createStore } from 'vuex';
import { v4 as uuidv4 } from 'uuid';

import apiDB from '@/api/apiDB';

export default createStore({
  state: {
    users: [],
    projects: [],
  },
  mutations: {
    // createTodo(state, text = '') {
    //   if (text.length <= 1) return;

    //   state.todos.push({
    //     id: uuidv4(),
    //     completed: false,
    //     text,
    //   });
    // },

    setUsers(state, users) {
      state.users = users;
    },
  },
  actions: {
    async loadUsers({ commit }) {
      try {
        const { data } = await apiDB.get('/usuarios');
        commit('setUsers', data.total);
      } catch (error) {
        console.log(error);
      }
    },
  },
  getters: {
    getUsers: (state) => state.users,

    // pendingTodos( state, getters, rootState ) {
    //   return state.todos.filter( todo => !todo.completed )
    // },
    // allTodos: (state, getters, rootState) => {
    //   // console.log({ state, getters, rootState })
    //   return state.todos
    // },
    // completedTodos: (state, getters, rootState) => {
    //   return state.todos.filter( todo => todo.completed )
    // },
    // getTodosByTab: ( _ , getters ) => ( tab ) => {
    //   switch ( tab ) {
    //     case 'all': return getters.allTodos
    //     case 'pending': return getters.pendingTodos
    //     case 'completed': return getters.completedTodos
    //   }
    // }
  },
  modules: {},
});
