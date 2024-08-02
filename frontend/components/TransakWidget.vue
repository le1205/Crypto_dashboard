<template>
  <div>
    <button @click="openTransakWidget" class="form-btn">Buy Crypto</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      transak: null,
    };
  },
  mounted() {
    this.loadTransakScript();
  },
  methods: {
    loadTransakScript() {
      const script = document.createElement("script");
      script.src = "https://cdn.transak.com/js/sdk/1.4.1/transak.js";
      script.async = true;
      script.onload = () => {
        console.log("Transak script loaded");
        this.initTransak();
      };
      document.body.appendChild(script);
    },
    initTransak() {
      const userEmail = this.$auth.user.user.email;
      const transakConfig = {
        apiKey: "", // Your provided API key
        environment: "STAGING", // Change to 'PRODUCTION' when ready
        defaultCryptoCurrency: "ETH",
        walletAddress: "",
        themeColor: "000000",
        email: userEmail,
        redirectURL: "",
      };

      this.transak = new window.TransakSDK.default(transakConfig);

      // Set up event listeners
      this.transak.on(this.transak.ALL_EVENTS, (data) => {
        console.log("Transak Event:", data);
      });

      this.transak.on(
        this.transak.EVENTS.TRANSAK_ORDER_SUCCESSFUL,
        (orderData) => {
          console.log("Successful Order:", orderData);
          this.saveTransaction(orderData);
        }
      );
    },
    openTransakWidget() {
      if (this.transak) {
        this.transak.init();
      } else {
        console.error("Transak not initialized");
      }
    },
    async saveTransaction(orderData) {
      const userId = this.$auth.user.user.id;
      try {
        await this.$axios.post("/transactions/save", {
          orderData,
          id: userId,
        });
        console.log("Transaction saved successfully");
      } catch (error) {
        console.error("Error saving transaction:", error);
      }
    },
  },
};
</script>

<style scoped>
.form-btn {
  margin-top: 10px;
  padding: 8px 24px;
  background-color: #3d9c7a;
  border: none;
  color: #fff;
  border-radius: 4px;
  cursor: pointer;
}
</style>
