
    import { payButtonEnabled, initCosts, updateCosts} from "./checkout.js"
    payButtonEnabled(false);

    document.addEventListener("DOMContentLoaded", async event => {
      await initCosts();
    });
    document.getElementById("country").addEventListener("change", updateCosts);
  