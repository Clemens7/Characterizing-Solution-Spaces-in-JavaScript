
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
   Number.prototype.clamp = function(min, max) {
    return Math.min(Math.max(this, min), max);
  };

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
    numberInput.addEventListener('change', event => {
      let newValue = event.target.value;
      if (newValue && (newValue = newValue.trim()) !== '' && !isNaN(newValue) && Number.isFinite(Number(newValue))) {
        const parsedValue = Number(parseFloat(newValue).toFixed(1)).clamp(event.target.getAttribute('min'), event.target.getAttribute('max'));
        console.info(`Recevied new value '${newValue}' parsed as ${parsedValue} for number input field ${fieldName}`);
        if (parsedValue * 10 !== frameConfigItem[fieldName]) {
          frameConfigItem[fieldName] = parsedValue * 10;
          console.info(`Updated model's ${fieldName} with value ${parsedValue*10}`, frameConfigItem);
          // update input range field
          rangeInput.value = parsedValue;
          updateConfigurator(frameConfigItem);
        }
        event.target.value = parsedValue; // reset value even if model value did not change, because input might have been rewritten (e.g. rounding/clamp)
      }
    });

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
  
  