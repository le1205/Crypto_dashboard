<template>
  <div>
    <h2>Crypto Price Alerts</h2>
    <form @submit.prevent="createAlert">
      <input
        v-model="newAlert.cryptocurrency"
        placeholder="Cryptocurrency"
        required
      />
      <input
        v-model.number="newAlert.targetPrice"
        type="number"
        step="0.01"
        placeholder="Target Price"
        required
      />
      <button type="submit">Create Alert</button>
    </form>
    <ul>
      <li v-for="alert in alerts" :key="alert.id">
        <div class="crypto-name">
          {{ alert.cryptocurrency }} - Target Price: ${{ alert.targetPrice }}
        </div>
        <button @click="deleteAlert(alert.id)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      newAlert: {
        cryptocurrency: "",
        targetPrice: null,
      },
    };
  },
  computed: {
    ...mapState("alert", ["alerts"]),
  },
  methods: {
    async createAlert() {
      const userId = this.$auth.user.user.id;
      const token = this.$auth.user.accessToken;
      await this.$store.dispatch("alert/createAlert", {
        userId,
        token,
        ...this.newAlert,
      });
      this.newAlert = { cryptocurrency: "", targetPrice: null };
    },
    async deleteAlert(alertId) {
      const token = this.$auth.user.accessToken;
      await this.$store.dispatch("alert/deleteAlert", {
        alertId,
        token,
      });
    },
  },
  async mounted() {
    const userId = this.$auth.user.user.id;
    const token = this.$auth.user.accessToken;
    await this.$store.dispatch("alert/fetchAlerts", { userId, token });
  },
};
</script>

<style scoped>
.crypto-name {
  display: inline-block;
  width: 180px;
}
</style>
