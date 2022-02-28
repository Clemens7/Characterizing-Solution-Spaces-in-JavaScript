
  import * as DOM from './dom-helpers.js';
  import * as PictureDOM from './picture-dom.js';
  import * as PictureAPI from './picture-api.js';
  import { Picture } from './picture.js';
  import * as FrameConfig from './frame-config.js';
  import * as CartHelper from './cart.js';

  document.getElementById("cart-link").innerText = CartHelper.getCartString();
  document.addEventListener('DOMContentLoaded', event => {

    const params = (new URL(document.location)).searchParams;
    const objectQuery = params.get('objectID');
    const printSizeQuery = params.get('printSize');
    const frameStyleQuery = params.get('frameStyle');
    const frameWidthQuery = params.get('frameWidth');
    const matColorQuery = params.get('matColor');
    const matWidthQuery = params.get('matWidth');

    if(objectQuery) {
      PictureAPI.retrieve_picture(objectQuery).then((picture) => {
        if (picture) {
          let previewContainer = document.getElementById("preview-container");

          previewContainer.appendChild(
            DOM.setAttributes(document.createElement('img'), {
              src: picture.imageURLSmall, 
              alt: 'Picture of ' + picture.title + ' by ' + picture.artist,
              id: 'preview-image'
            })
          );
          previewContainer.appendChild(
            DOM.setAttributes(PictureDOM.createLabel(picture), {id: 'image-label'})
          );

          FrameConfig.calcPrintSizes();
          FrameConfig.setTotalSize();
          FrameConfig.setPrice();
          FrameConfig.renderPreview();
        }
      }).catch();
    }
    if(objectQuery) {
      FrameConfig.setObjectID(objectQuery);
    }
    if(printSizeQuery) {
      FrameConfig.setPrintSize(printSizeQuery);
    }
    if(frameStyleQuery) {
      FrameConfig.setFrameStyle(frameStyleQuery);
    }
    if(frameWidthQuery) {
      FrameConfig.setFrameWidth(frameWidthQuery);
    }
    if(matColorQuery) {
      FrameConfig.setMatColor(matColorQuery);
    }
    if(matWidthQuery) {
      FrameConfig.setMatWidth(matWidthQuery);
    }
  });

  const form = document.getElementById('config-form');

  form.addEventListener('submit', );

