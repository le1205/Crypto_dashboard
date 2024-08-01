import Vue from "vue";
import VueNativeSock from "vue-native-websocket";

export default ({ store }) => {
  Vue.use(VueNativeSock, "ws://localhost:5000", {
    store: store,
    format: "json",
    connectManually: true,
  });
};
