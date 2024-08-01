// store/watchlist.js
export const state = () => ({
  watchlist: [],
});

export const mutations = {
  SET_WATCHLIST(state, watchlist) {
    state.watchlist = watchlist;
  },
  ADD_CRYPTO(state, crypto) {
    if (!state.watchlist.includes(crypto)) {
      state.watchlist.push(crypto);
    }
  },
  REMOVE_CRYPTO(state, crypto) {
    state.watchlist = state.watchlist.filter((c) => c !== crypto);
  },
};

export const actions = {
  async fetchWatchlist({ commit }, { userId, token }) {
    try {
      const response = await this.$axios.$get(`/watchlist/retrieve/${userId}`, {
        headers: {
          Authorization: `${token}`,
        },
      });
      const watchlist = Array.isArray(response.data[0].symbol)
        ? response.data[0].symbol
        : [];
      commit("SET_WATCHLIST", watchlist);
    } catch (error) {
      console.error("Error fetching watchlist:", error);
      if (error.name === "ExpiredAuthSessionError") {
        // Handle expired session
        this.$auth.logout();
        this.$router.push("/login");
      }
    }
  },
  async saveWatchlist({ state, commit }, { userId, token }) {
    try {
      await this.$axios.$post(
        "/watchlist/save",
        {
          watchlist: state.watchlist,
          id: userId,
        },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      console.log("Watchlist saved successfully");
    } catch (error) {
      console.error("Error saving watchlist:", error);
      if (error.name === "ExpiredAuthSessionError") {
        // Handle expired session
        this.$auth.logout();
        this.$router.push("/login");
      }
    }
  },
  setupWebSocket({ commit, rootState }) {
    const socket = new WebSocket("ws://localhost:5000");

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (
        data.type === "watchlist_update" &&
        data.userId === rootState.auth.user.user.id
      ) {
        commit("SET_WATCHLIST", data.data);
      }
    };
  },
};
