<template>
  <div>
    <h2>Watchlist</h2>
    <ul>
      <li v-for="crypto in watchlist" :key="crypto">
        <div class="crypto-name">
          {{ crypto }}
        </div>
        <button @click="removeCrypto(crypto)">Remove</button>
      </li>
    </ul>
    <div class="form-group">
      <input
        class="form-input"
        v-model="newCrypto"
        placeholder="Add new crypto"
      />
      <button class="form-btn" @click="addCrypto">Add</button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      newCrypto: "",
    };
  },
  computed: {
    ...mapState("watchlist", ["watchlist"]),
  },
  methods: {
    addCrypto() {
      if (this.newCrypto && !this.watchlist.includes(this.newCrypto)) {
        this.$store.commit("watchlist/ADD_CRYPTO", this.newCrypto);
        this.newCrypto = "";
        this.saveWatchlist();
      }
    },
    removeCrypto(crypto) {
      this.$store.commit("watchlist/REMOVE_CRYPTO", crypto);
      this.saveWatchlist();
    },
    saveWatchlist() {
      const userId = this.$auth.user.user.id;
      const token = this.$auth.user.accessToken;
      this.$store.dispatch("watchlist/saveWatchlist", { userId, token });
    },
  },
  async mounted() {
    const userId = this.$auth.user.user.id;
    const token = this.$auth.user.accessToken;
    await this.$store.dispatch("watchlist/fetchWatchlist", { userId, token });
    this.$store.dispatch("watchlist/setupWebSocket");
  },
};
</script>

<style scoped>
.crypto-name {
  display: inline-block;
  width: 40px;
}
.form-group {
  display: flex;
  align-items: center;
}
.form-btn {
  margin-left: 10px;
  padding: 8px 24px;
  background-color: #3d9c7a;
  border: none;
  color: #fff;
  border-radius: 4px;
  cursor: pointer;
}
.form-input {
  display: block;
  padding: 8px 12px;
  border-radius: 4px;
  border: 1px solid #999;
}
</style>
