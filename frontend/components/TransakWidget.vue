<template>
  <div>
    <div id="transak-widget"></div>
    <button @click="openTransakWidget" class="form-btn">Buy Crypto</button>
  </div>
</template>

<script>
export default {
  mounted() {
    this.loadTransakScript();
  },
  methods: {
    loadTransakScript() {
      const script = document.createElement("script");
      script.src = "https://global.transak.com/sdk/v1.1/widget.js";
      script.async = true;
      script.onload = () => {
        console.log("Transak script loaded.");
      };
      document.body.appendChild(script);
    },
    openTransakWidget() {
      console.log("Clicked", window.transak);
      if (window.transak) {
        let transak = new window.TransakSDK.default({
          apiKey: "",
          environment: "STAGING",
          defaultCryptoCurrency: "ETH",
          walletAddress: "", // User's wallet address
          themeColor: "000000",
          email: "", // User's email
          redirectURL: "",
        });

        transak.init();

        transak.on(transak.ALL_EVENTS, (data) => {
          console.log(data);
        });

        transak.on(transak.EVENTS.TRANSAK_ORDER_SUCCESSFUL, (orderData) => {
          console.log(orderData);
          this.saveTransaction(orderData);
        });
      }
    },
    async saveTransaction(orderData) {
      const userId = this.$auth.user.user.id;
      try {
        await this.$axios.post("/transactions/save", {
          orderData,
          id: userId,
        });
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
