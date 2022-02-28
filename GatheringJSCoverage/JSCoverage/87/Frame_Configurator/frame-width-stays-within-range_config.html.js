
    import * as configUtil from './config.js';
    import * as util from './util.js';

    util.showCartNumber();
  
    //adding event listener to get query paremeters
    document.addEventListener('DOMContentLoaded', event => {

      const queryParams = (new URL(document.location)).searchParams;
      const objectIDParam = queryParams.get("objectID");
      //
      const printSize = util.getOrDefault(queryParams, "printSize", 'M');
      const frameStyle =  util.getOrDefault(queryParams, "frameStyle", 'natural');
      const frameWidth =  util.getOrDefault(queryParams, "frameWidth", 40) / 10;
      const matColor =  util.getOrDefault(queryParams, "matColor", 'mint');
      const matWidth =  util.getOrDefault(queryParams, "matWidth", 55) / 10;

      //redirect if there is no objectID given or null
      if (!objectIDParam) 

      console.log("Got Query Parameters: ",objectIDParam, printSize, frameStyle, frameWidth,matColor,matWidth);

      configUtil.setupConfigurator(objectIDParam, printSize, frameStyle, frameWidth, matColor, matWidth);
    });

    //event change for printSize
    document.getElementById("print-size-s").addEventListener('click', );
    document.getElementById("print-size-m").addEventListener('click', );
    document.getElementById("print-size-l").addEventListener('click', );

    //event change for frameStyle
    document.getElementById("frame-style-classic").addEventListener('click', );
    document.getElementById("frame-style-natural").addEventListener('click', );
    document.getElementById("frame-style-shabby").addEventListener('click', );
    document.getElementById("frame-style-elegant").addEventListener('click', );

    //event change for matColor
    document.getElementById("mat-color-ivory").addEventListener('click', );
    document.getElementById("mat-color-mint").addEventListener('click', );
    document.getElementById("mat-color-wine").addEventListener('click', );
    document.getElementById("mat-color-indigo").addEventListener('click', );
    document.getElementById("mat-color-coal").addEventListener('click', );

    //event change for matWidth
    document.getElementsByName("matWidthR")[0].addEventListener('change', );
    document.getElementsByName("matWidth")[0].addEventListener('change', );

    //event change for frameWidth
    document.getElementsByName("frameWidthR")[0].addEventListener('change', );
    document.getElementsByName("frameWidth")[0].addEventListener('change', event => configUtil.onTextInputWithCorrespondingSliderChange(event.target));

    document.getElementById("config-form").addEventListener('submit', );
  