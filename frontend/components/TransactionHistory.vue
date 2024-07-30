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
export default {
  data() {
    return {
      transactions: [],
    };
  },
  async fetch() {
    const userId = this.$auth.user.id;
    const token = this.$auth.strategy.token.get();
    this.transactions = await this.$axios.$get("/transaction/retrieve", {
      params: { id: userId },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
</script>
