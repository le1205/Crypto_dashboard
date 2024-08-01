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
    const userId = this.$auth.user.user.id;
    const token = this.$auth.user.accessToken;
    this.transactions = await this.$axios.$get(
      `/transaction/retrieve/${userId}`,
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );
  },
};
</script>
