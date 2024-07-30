<template>
  <div>
    <h2>Watchlist</h2>
    <ul>
      <li v-for="crypto in watchlist" :key="crypto">
        {{ crypto }}
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
      <button class="form-btn" @click="saveWatchlist">Save</button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      watchlist: [],
      newCrypto: "",
    };
  },
  computed: {
    ...mapGetters({
      user: "getUser",
    }),
  },
  methods: {
    addCrypto() {
      if (!this.watchlist) {
        this.watchlist = [];
      }
      if (this.newCrypto && !this.watchlist.includes(this.newCrypto)) {
        this.watchlist.push(this.newCrypto);
        this.newCrypto = "";
        this.saveWatchlist();
      }
    },
    removeCrypto(crypto) {
      this.watchlist = this.watchlist.filter((c) => c !== crypto);
      this.saveWatchlist();
    },
    saveWatchlist() {
      const userId = this.$auth.user.id;

      this.$axios
        .$post("/watchlist/save", {
          watchlist: this.watchlist,
          id: userId,
        })
        .then((response) => {
          console.log("Watchlist saved successfully", response);
        })
        .catch((error) => {
          if (error.name === "ExpiredAuthSessionError") {
            console.log("Authentication session has expired");
            // Redirect to login page or show a re-authentication modal
            this.$auth.logout();
            this.$router.push("/login");
          } else {
            console.error("Error saving watchlist:", error);
          }
        });
    },

    fetchWatchlist() {
      const userId = this.$auth.user.id;

      this.$axios
        .$get("/watchlist/retrieve", {
          params: { id: userId },
        })
        .then((response) => {
          this.watchlist = Array.isArray(response.data) ? response.data : [];
        })
        .catch((error) => {
          if (error.name === "ExpiredAuthSessionError") {
            console.log("Authentication session has expired");
            // Redirect to login page or show a re-authentication modal
            this.$auth.logout();
            this.$router.push("/login");
          } else {
            console.error("Error fetching watchlist:", error);
          }
        });
    },
  },
  mounted() {
    this.fetchWatchlist();
  },
};
</script>

<style scoped>
.form-group {
  display: flex;
  gap: 16px;
  margin-bottom: 12px;
}
.form-input {
  padding: 8px 12px;
  border-radius: 4px;
  border: 1px solid #666;
}
.form-btn {
  padding: 8px 24px;
  background-color: #3d9c7a;
  border: none;
  color: #fff;
  border-radius: 4px;
  cursor: pointer;
}
</style>
