
    import * as Frame from './frame.js';
    import {Config, load, save} from './config.js';

    let object;
    let config;
    const preview = {
      img : document.getElementById('preview-image'),
      container : document.getElementById('preview-container')
    };
    const form = {
      printSizes : document.getElementsByName('printSize'),
      frameStyles : document.getElementsByName('frameStyle'),
      matColors : document.getElementsByName('matColor'),

      frameWidth : document.getElementsByName('frameWidth').item(0),
      frameWidthR : document.getElementsByName('frameWidthR').item(0),

      matWidth : document.getElementsByName('matWidth').item(0),
      matWidthR : document.getElementsByName('matWidthR').item(0),

      button : document.getElementsByTagName('button')[0]
    };

    async function loadObject(objectID) {
      object = await load(objectID);
      if (!object) 
    }

    function showPreview() {
      const artist = document.getElementById("artist");
      artist.innerText = object.artistDisplayName;
      const title = document.getElementById("title");
      title.innerText = object.title;
      const date = document.getElementById("date");
      date.innerText = object.objectDate;


      preview.img.src = object.primaryImageSmall;
      preview.img.onload = event => {
        const size = Frame.getPrintSizes(preview.img);
        document.getElementById('print-size-s-label').innerHTML = `Small<br>${size['S'][0]} × ${size['S'][1]} cm`;
        document.getElementById('print-size-m-label').innerHTML = `Medium<br>${size['M'][0]} × ${size['M'][1]} cm`;
        document.getElementById('print-size-l-label').innerHTML = `Large<br>${size['L'][0]} × ${size['L'][1]} cm`;

        updateFrame();
      };
    }

    function updateFrame() {
      Frame.render(preview.img, preview.container, config.printSize, config.frameStyle, config.frameWidth, config.matColor, config.matWidth);
      const price = Frame.calculatePrice(config.printSize, config.frameStyle, config.frameWidth, config.matWidth);
      document.getElementById('price').innerText = `€ ${price.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
    }

    function initForm() {
      // print size
      for (const size of form.printSizes) {
        size.addEventListener('change', );
        size.checked = size.value === config.printSize;
      }

      // frame style
      for (const frame of form.frameStyles) {
        frame.addEventListener('change', );
        frame.checked = frame.value === config.frameStyle;
      }

      // mat color
      for (const color of form.matColors) {
        color.addEventListener('change', );
        color.checked = color.value === config.matColor;
      }

      // frame width
      form.frameWidth.addEventListener('change', event => {
        config.frameWidth = form.frameWidth.value * 10;
        form.frameWidth.value = config.frameWidth / 10;
        form.frameWidthR.value = config.frameWidth / 10;
        updateFrame();
      });
      form.frameWidthR.addEventListener('change', );
      form.frameWidth.value = config.frameWidth / 10;
      form.frameWidthR.value = config.frameWidth / 10;

      // mat width
      form.matWidth.addEventListener('change', );
      form.matWidthR.addEventListener('change', );
      form.matWidth.value = config.matWidth / 10;
      form.matWidthR.value = config.matWidth / 10;

      // button
      form.button.addEventListener('click', );
    }




    const params = (new URL(document.location)).searchParams;
    config = new Config(params.get('objectID'), params.get('printSize'), params.get('frameStyle'), params.get('frameWidth'), params.get('matColor'), params.get('matWidth'));

    initForm();

    document.addEventListener('DOMContentLoaded', async (event) => {
      let cart=JSON.parse(localStorage.getItem('cart'));
      if(cart) 
      await loadObject(config.objectID);
      showPreview();
    });

  