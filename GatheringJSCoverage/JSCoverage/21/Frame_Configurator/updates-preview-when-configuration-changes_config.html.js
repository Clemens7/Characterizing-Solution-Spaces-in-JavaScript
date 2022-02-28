
    import * as Frame from './frame.js';
    import {FrameConfiguration,FramedPicture} from './config.js';
    import {appendImageLabel} from './dom-helpers.js'

    //get references to elements
    const container = document.getElementById("preview-container");
    const preview = document.getElementById("preview-image");
    const priceTag = document.getElementById('price');
    const totalSize = document.getElementById('total-size');
    const frameWidth = document.getElementById('frame-width');
    const frameRange = document.getElementById('frame-width-range');
    const matWidth = document.getElementById('mat-width');
    const matRange = document.getElementById('mat-width-range');
    const configForm = document.getElementById('config-form');

    const searchParams = new URL(document.location).searchParams;
    //check if object id is given as url parameter, if not redirect
    const objectID = searchParams.get('objectID');
    if(!objectID)
    

    getNumberOfCartItems();

    async function getNumberOfCartItems() {
      let items = await FramedPicture.loadFromLocalStorage();
      if (items.length>0)
      return ;
    }

    //instantiate frame config object and initialize with search parameter
    const frameConfig = new FrameConfiguration();
    let framedImage;
    FramedPicture.fromObjectID(objectID,preview,frameConfig)
      .catch()
      .then((loadedImage)=>{
        framedImage = loadedImage;

        //generate label for picture
        appendImageLabel(loadedImage.picture,document.getElementById('preview-container'));

        //add event handlers
        preview.addEventListener('load',updatePrintSizes);
        preview.addEventListener('load',updatePriceAndPreview);

        //add event handler for form submission
        configForm.addEventListener('submit',);

        function updatePrintSizes() {
          function setPrintSize(text,size,element){
            element.innerHTML = `${text}<br>${size[0]/10} × ${size[1]/10} cm`;
          }
          //remove event listener
          preview.removeEventListener('load',updatePrintSizes);

          const sizes = Frame.getPrintSizes(preview);
          setPrintSize("Small",sizes.S,document.getElementById('print-size-s-label'));
          setPrintSize("Medium",sizes.M,document.getElementById('print-size-m-label'));
          setPrintSize("Large",sizes.L,document.getElementById('print-size-l-label'));
        }
    });

    if(searchParams.has('printSize'))
    if(searchParams.has('frameStyle'))
    if(searchParams.has('frameWidth'))
    if(searchParams.has('matColor'))
    if(searchParams.has('matWidth'))
    //update initial values of config inputs according to framedImage.config
    let printSizeButtonName="";
    switch(frameConfig.printSize) {
      case 'S':
        printSizeButtonName = 'print-size-s';
        break;
      
      
    }
    document.getElementById(printSizeButtonName).checked = true;

    frameRange.value = frameWidth.value = frameConfig.frameWidthCM;

    document.getElementById('frame-style-'+frameConfig.frameStyle).checked = true;

    matRange.value = matWidth.value = frameConfig.matWidthCM;

    document.getElementById('mat-color-'+frameConfig.matColor).checked = true;

    //connect range inputs with text fields, connect input changes with config object and update preview
    frameWidth.addEventListener('change',event => {
      //apply min, max and step
      frameWidth.value = Math.round(
        (Math.min(
          Math.max(frameWidth.value,frameWidth.min),
          frameWidth.max
        )+Number.EPSILON)*10)/10;

      frameRange.value = frameWidth.value;

      frameConfig.frameWidthCM = frameWidth.value;
      updatePriceAndPreview();
    });
    frameRange.addEventListener('input',);
    matWidth.addEventListener('change',event => {
      //apply min, max and step
      matWidth.value = Math.round(
        (Math.min(
          Math.max(matWidth.value,matWidth.min),
          matWidth.max
        )+Number.EPSILON)*10)/10;

      matRange.value = matWidth.value;

      frameConfig.matWidthCM = matWidth.value;
      updatePriceAndPreview();
    });
    matRange.addEventListener('input',);

    const printSizeButtons = configForm.printSize;
    for(const printSizeButton of printSizeButtons) {
      printSizeButton.addEventListener('change',event=>{
        frameConfig.printSize = event.target.value;
        updatePriceAndPreview();
      })
    }

    const frameStyleButtons = configForm.frameStyle;
    for(const frameStyleButton of frameStyleButtons) {
      frameStyleButton.addEventListener('change',event=>{
        frameConfig.frameStyle = event.target.value;
        updatePriceAndPreview();
      })
    }

    const matColorButtons = configForm.matColor;
    for(const matColorButton of matColorButtons) {
      matColorButton.addEventListener('change',event=>{
        frameConfig.matColor = event.target.value;
        updatePriceAndPreview();
      })
    }

    function updatePriceAndPreview() {
      if(framedImage)
        framedImage.render(container);

      priceTag.textContent = `€ ${frameConfig.price.toFixed(2)}`;

      //calculate size
      const frameMatWidth = Number(frameWidth.value)+Number(matWidth.value);
      const printSize = Frame.getPrintSizes(preview)[configForm.printSize.value];
      totalSize.textContent = `${Number((frameMatWidth*2+printSize[0]*0.1).toFixed(1))} x ${Number((frameMatWidth*2+printSize[1]*0.1).toFixed(1))} cm`;
    }
  