export default function ({ app }, inject) {
  inject("initTransak", (config) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://global.transak.com/sdk/v1.1/widget.js";
      script.async = true;
      script.onload = () => {
        const transak = new window.TransakSDK(config);
        resolve(transak);
      };
      document.body.appendChild(script);
    });
  });
}
