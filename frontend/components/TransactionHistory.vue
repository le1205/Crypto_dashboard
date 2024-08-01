<template>
  <div>
    <h1>Transaction History</h1>
    <ul>
      <li v-for="transaction in transactions" :key="transaction.id">
        {{ transaction.cryptocurrency }} - {{ transaction.amount }} -
        {{ transaction.status }}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState("transactions", ["transactions"]),
  },
  async fetch() {
    const userId = this.$auth.user.user.id;
    const token = this.$auth.user.accessToken;
    await this.$store.dispatch("transactions/fetchTransactions", {
      userId,
      token,
    });
  },
  mounted() {
    this.$store.dispatch("transactions/setupWebSocket");
  },
};
</script>
