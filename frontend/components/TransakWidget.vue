<template>
  <div>
    <div id="transak-widget"></div>
    <button @click="openTransakWidget">Buy Crypto</button>
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
      document.body.appendChild(script);
    },
    openTransakWidget() {
      if (window.transak) {
        let transak = new window.TransakSDK.default({
          apiKey: "20f24611-5dd8-401b-8549-5057ed57e820",
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
      const userId = this.$auth.user.id;
      try {
        await this.$axios.post("/transactions/saves", {
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
