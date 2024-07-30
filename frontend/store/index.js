import { reactive } from "vue";

export const store = reactive({
  auth: {
    loggedIn: false,
  },
});

export const mutations = {
  setToken: (state, token) => {
    state.token = token;
  },
  "auth/setUser": (state, user) => {
    state.auth.user = user;
  },
  "auth/setLoggedIn": (state, status) => {
    state.auth.loggedIn = status;
  },
};

export const getters = {
  getUser: (state) => state.auth.user,
  isLoggedIn: (state) => state.auth.loggedIn,
};
