
    import * as checkout from './checkout.js';

    document.addEventListener('DOMContentLoaded', _ => {
      checkout.checkIfCartIsEmpty();
      checkout.initDestinations().then(_ => {
        checkout.calculateAndSetSubtotal();
        checkout.calculateAndSetTotalPrice();
      });
    });

    document.getElementById('country').addEventListener('change', );
  