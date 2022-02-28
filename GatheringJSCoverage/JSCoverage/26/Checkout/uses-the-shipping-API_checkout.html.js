
    import { calculatePrice } from "./frame.js";
    import { getCart } from "./cart.js"

    if (getCart() < 1) 

    document.getElementById('pay-button').setAttribute('disabled', '')

    const subtotal = getCart()
      .map(item => { return calculatePrice(item.printSize, item.frameStyle, item.frameWidth, item.matWidth) })
      .reduce((prev, next) => { return prev + next }, 0)

    document.getElementById('price-subtotal').innerText = `${subtotal.toFixed(2)}`;

    fetch(`https://web-engineering.big.tuwien.ac.at/s20/a2/shipping`)
      .then(result => {
        return result.json()
      })
      .then(data => {

        const countryselect = document.getElementById('country')

        data.destinations.forEach(destination => {

          const option = document.createElement("option")
          option.id = "country-" + destination.country
          option.value = destination.country
          option.setAttribute("data-price", (destination.cost / 100))
          option.innerText = destination.displayName

          countryselect.appendChild(option)
        });

        updatePrice()

        countryselect.addEventListener("change", , false)

        function updatePrice() {
          const shipping = Number(document.getElementById("country-" + countryselect.value).getAttribute("data-price"))
          document.getElementById("price-shipping").innerText = shipping.toFixed(2)
          document.getElementById("price-total").innerText = (subtotal + shipping).toFixed(2)

          document.getElementById('pay-button').removeAttribute('disabled')
        }

      });

  