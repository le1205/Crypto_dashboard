// store/transactions.js
export const state = () => ({
  transactions: [],
});

export const mutations = {
  SET_TRANSACTIONS(state, transactions) {
    state.transactions = transactions;
  },
  UPDATE_TRANSACTIONS(state, newTransactions) {
    state.transactions = newTransactions;
  },
};

export const actions = {
  async fetchTransactions({ commit }, { userId, token }) {
    try {
      const transactions = await this.$axios.$get(
        `/transaction/retrieve/${userId}`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      commit("SET_TRANSACTIONS", transactions);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  },
  setupWebSocket({ commit, rootState }) {
    const socket = new WebSocket("ws://localhost:5000");

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (
        data.type === "transaction_update" &&
        data.userId === rootState.auth.user.user.id
      ) {
        commit("UPDATE_TRANSACTIONS", data.data);
      }
    };
  },
};
