<template>
  <div>
    <h1 class="page-title">Crypto Dashboard</h1>
    <!-- <AlertSystem /> -->
    <CryptoChart />
    <CryptoWatchlist />
    <TransakWidget />
    <TransactionHistory />
    <button class="form-btn" @click="logout">Logout</button>
  </div>
</template>

<script>
import CryptoChart from "~/components/CryptoChart.vue";
import CryptoWatchlist from "~/components/CryptoWatchlist.vue";
import TransakWidget from "~/components/TransakWidget.vue";
import TransactionHistory from "~/components/TransactionHistory.vue";
// import AlertSystem from "~/components/AlertSystem.vue";

export default {
  components: {
    CryptoChart,
    CryptoWatchlist,
    TransakWidget,
    // AlertSystem,
  },

  middleware: "auth",
  methods: {
    logout() {
      this.$auth.logout();
      this.$router.push("/login");
    },
    async removeFromWatchlist(symbol) {
      await this.$axios.delete(`/api/watchlist/${symbol}`);
    },
  },
};
</script>

<style scoped>
.form-btn {
  padding: 8px 24px;
  background-color: #3d9c7a;
  border: none;
  color: #fff;
  border-radius: 4px;
  cursor: pointer;
}
</style>
