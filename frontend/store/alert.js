export const state = () => ({
  alerts: [],
});

export const mutations = {
  SET_ALERTS(state, alerts) {
    state.alerts = alerts;
  },
  ADD_ALERT(state, alert) {
    state.alerts.push(alert);
  },
  REMOVE_ALERT(state, alertId) {
    state.alerts = state.alerts.filter((alert) => alert.id !== alertId);
  },
};

export const actions = {
  async fetchAlerts({ commit }, { userId, token }) {
    try {
      const response = await this.$axios.$get(`/alert/user/${userId}`, {
        headers: {
          Authorization: `${token}`,
        },
      });
      const alerts = Array.isArray(response.data.alerts)
        ? response.data.alerts
        : [];
      commit("SET_ALERTS", alerts);
    } catch (error) {
      console.error("Error fetching alerts:", error);
    }
  },
  async createAlert(
    { commit },
    { userId, token, cryptocurrency, targetPrice }
  ) {
    try {
      const response = await this.$axios.$post(
        "/alert/create",
        { userId, cryptocurrency, targetPrice },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      commit("ADD_ALERT", response.data.alert);
    } catch (error) {
      console.error("Error creating alert:", error);
    }
  },
  async deleteAlert({ commit }, { alertId, token }) {
    try {
      await this.$axios.$delete(`/alert/${alertId}`, {
        headers: {
          Authorization: `${token}`,
        },
      });
      commit("REMOVE_ALERT", alertId);
    } catch (error) {
      console.error("Error deleting alert:", error);
    }
  },
};
