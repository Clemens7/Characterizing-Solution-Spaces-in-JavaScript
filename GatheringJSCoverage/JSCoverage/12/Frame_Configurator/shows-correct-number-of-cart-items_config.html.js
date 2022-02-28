
  import {initConfig, renderPreview, roundWidth } from './config.js'

  const config = initConfig()

  // setup event listener
  document.querySelectorAll('input[type="radio"], input[type="range"]')
    .forEach(input => input.addEventListener('change', event => {
      config[event.target.name] = event.target.value
    }))

  document.getElementById("frame-width").addEventListener('change', )

  document.getElementById('mat-width').addEventListener('change', )

  // set values from url parameters
  Object.entries(config).forEach(([name, value]) => {
    const radios = document.querySelectorAll(`input[type="radio"][name="${name}"]`)
    radios.forEach(input => input.checked = (input.value === value ))
    const inputs =  document.querySelectorAll(`input:not([type="radio"])[name^="${name}"]`)
    inputs.forEach(input => input.value = value / 10)
  })

  renderPreview(config);

  let cart = JSON.parse(localStorage.getItem('cart')) ;
  if (cart != null && cart.length >= 1) 

  // add image with current configuration to cart
  document.querySelector('button[type="submit"]').addEventListener('click', )
