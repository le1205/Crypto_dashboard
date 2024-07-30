<template>
  <div>
    <h2>Price Alerts</h2>
    <form @submit.prevent="addAlert">
      <input v-model="newAlert.symbol" placeholder="Symbol" required />
      <input
        v-model.number="newAlert.targetPrice"
        type="number"
        step="0.01"
        placeholder="Target Price"
        required
      />
      <button type="submit">Add Alert</button>
    </form>
    <ul>
      <li v-for="alert in alerts" :key="alert.id">
        {{ alert.symbol }} - Target: ${{ alert.targetPrice }}
        <button @click="removeAlert(alert.id)">Remove</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      alerts: [],
      newAlert: {
        symbol: "",
        targetPrice: null,
      },
    };
  },
  async fetch() {
    const response = await this.$axios.get("/api/price-alerts");
    this.alerts = response.data;
  },
  methods: {
    async addAlert() {
      const response = await this.$axios.post(
        "/api/price-alerts",
        this.newAlert
      );
      this.alerts.push(response.data);
      this.newAlert = { symbol: "", targetPrice: null };
    },
    async removeAlert(id) {
      await this.$axios.delete(`/api/price-alerts/${id}`);
      this.alerts = this.alerts.filter((alert) => alert.id !== id);
    },
  },
  mounted() {
    this.$socket.on("priceAlertTriggered", (alert) => {
      this.$toast.success(
        `Price alert triggered for ${alert.symbol} at $${alert.currentPrice}`
      );
      this.alerts = this.alerts.filter((a) => a.id !== alert.id);
    });
  },
};
</script>
