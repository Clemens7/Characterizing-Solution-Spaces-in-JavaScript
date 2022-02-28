
      import * as Frame from './frame.js';
      import {getArtworkById} from "./metArtwork.js";
      import * as Cart from './cart.js';

      const query = window.location.search;
      const param = new URLSearchParams(query);

      const objectID = param.get('objectID');
      const forms = document.getElementById('config-form');

      forms['printSize'].value = param.get('printSize') || 'L';
      forms['frameStyle'].value = param.get('frameStyle') || 'classic';
      forms['frameWidth'].value = forms['frameWidthR'].value = param.get('frameWidth') / 10 || 5;
      forms['matColor'].value = param.get('matColor') || 'mint';
      if (param.get('matWidth'))  else {
        forms['matWidth'].value = forms['matWidthR'].value = 6.5;
      }

      if (!objectID) 

      getArtworkById(objectID).then(artwork => {
        console.log(JSON.stringify(artwork));
        if (artwork === null) 

        let artist = artwork.artist;
        let title = artwork.title;
        let date = artwork.date;

        document.title = `${artist}, ${title}, ${date} | Artmart`;
        document.getElementById("objectID").value = artwork.id;

        const previewImg = document.getElementById("preview-image");
        previewImg.src = artwork.image;
        previewImg.alt = title;

        Frame.createImageLabel(artist, title, date);
        Frame.updateConfig();
    });

    window.updateFrameWidth =  ;

    

    window.updateMateWidth =  ;

    window.addToCart = ;
    window.addEventListener("resize", Frame.updateConfig)
