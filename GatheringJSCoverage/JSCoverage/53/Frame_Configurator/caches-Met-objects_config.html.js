
  import { ShoppingCartDOM } from './shopping-cart-dom.js';
  import { ShoppingCartItem } from './shopping-cart.js';
  import * as ShoppingCartStorage from './shopping-cart-storage.js';
  import {retrieveObject} from './metmuseum-api.js';
  import {initConfiguratorControls, updateConfigurator, setPreviewImage, createLabel} from './config-dom.js';

  let frameConfigItem = null; // model of frame configuration

  document.addEventListener('DOMContentLoaded', event => {
    updateCartLink();
    applyUrlQueryParams();
    registerEventHandler();
  });

  function registerEventHandler() {
    const addToCartButton = document.getElementById('config-form');
    addToCartButton.addEventListener('submit', );
    registerEventChangeOnNumberAndRangeInput('matWidth');
    registerEventChangeOnNumberAndRangeInput('frameWidth');
    registerEventChangeOnRadioInput('printSize');
    registerEventChangeOnRadioInput('frameStyle');
    registerEventChangeOnRadioInput('matColor');
    // window.addEventListener('resize', reportWindowSize); TODO rerender on resize
  }

  /**
   * Source: https://stackoverflow.com/questions/11409895/whats-the-most-elegant-way-to-cap-a-number-to-a-segment
   * Returns a number whose value is limited to the given range.
   *
   * Example: limit the output of this computation to between 0 and 255
   * (x * 255).clamp(0, 255)
   *
   * @param {Number} min The lower boundary of the output range
   * @param {Number} max The upper boundary of the output range
   * @returns A number in the range [min, max]
   * @type Number
   */
   Number.prototype.clamp = ;

  function registerEventChangeOnRadioInput(fieldName) {
    const radioInputs = document.querySelectorAll(`input[name="${fieldName}"]`);
    for (let radioInput of radioInputs) {
      radioInput.addEventListener('change', );
    }
  }

  function registerEventChangeOnNumberAndRangeInput(fieldName) {
    const rangeInputName = `${fieldName}R`;
    const rangeInput = document.querySelector(`input[name="${rangeInputName}"]`);
    const numberInput = document.querySelector(`input[name="${fieldName}"]`);
    numberInput.addEventListener('change', );

    rangeInput.addEventListener('change', );
  }

  

  

  async function applyUrlQueryParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const objectId = urlParams.get('objectID');
    if (!objectId) 
    let artmartObject = null;

    // param is null if not present, else string
    const printSize = urlParams.get('printSize') || 'M'; 
    const frameStyle = urlParams.get('frameStyle') || 'natural'; 
    const frameWidth = urlParams.get('frameWidth') || 40; // string should be given in millimeters
    const matColor = urlParams.get('matColor') || 'mint'; 
    const matWidth = urlParams.get('matWidth') || 55; // string should be given in millimeters

    // TODO validate values?
    frameConfigItem = new ShoppingCartItem(objectId, printSize, frameStyle, frameWidth, matWidth, matColor);
    initConfiguratorControls(frameConfigItem);

    retrieveObject(objectId)
      .then((artmartObject) => {
        setPreviewImage(artmartObject, frameConfigItem);
        createLabel(artmartObject);
      })
      .catch( );
  }

  function updateCartLink() {
    const items = ShoppingCartStorage.retrieve();
    const shoppingCart = new ShoppingCartDOM(items);
    shoppingCart.updateCartLink();
  }
  
  