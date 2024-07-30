<template>
  <div>
    <select class="form-select" v-model="selectedCrypto" @change="updateChart">
      <option v-for="crypto in cryptoList" :key="crypto" :value="crypto">
        {{ crypto }}
      </option>
    </select>
    <div id="tradingview-widget-container"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedCrypto: "BTCUSD",
      cryptoList: ["BTCUSD", "ETHUSD", "XRPUSD"],
    };
  },
  mounted() {
    this.loadTradingViewScript();
  },
  methods: {
    loadTradingViewScript() {
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/tv.js";
      script.async = true;
      script.onload = () => this.initChart();
      document.head.appendChild(script);
    },
    initChart() {
      new TradingView.widget({
        container_id: "tradingview-widget-container",
        symbol: this.selectedCrypto,
        interval: "D",
        timezone: "Etc/UTC",
        theme: "light",
        style: "1",
        locale: "en",
        toolbar_bg: "#f1f3f6",
        enable_publishing: false,
        allow_symbol_change: true,
        width: "100%",
        height: 400,
      });
    },
    updateChart() {
      this.initChart();
    },
  },
};
</script>

<style scoped>
.form-select {
  padding: 6px 8px;
}
#tradingview-widget-container {
  margin-top: 24px;
  height: 400px;
}
</style>
