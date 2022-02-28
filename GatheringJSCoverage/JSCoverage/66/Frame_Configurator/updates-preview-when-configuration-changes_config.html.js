


    import {getPrintSizes} from '/frame.js';
    import {calculatePrice} from '/frame.js';
    import {render} from '/frame.js';

    var srcX;
    var objectId;
    var printSize;
    var frameStyle;
    var frameWidth;
    var matWidth;
    var matColor;
    var price;
    var img = new Image();
    var container = document.getElementById("preview-container");

    /*-- Parameters --*/
    let urlParams = new URLSearchParams(window.location.search);
    objectId = urlParams.get('objectID');

    if ( objectId == null ) 

    printSize = urlParams.get('printSize');
    if ( printSize == null ) {
        document.getElementById("print-size-m").checked = true;
        printSize = "M";
    }

    frameStyle = urlParams.get('frameStyle');
    if ( frameStyle == null ) {
        document.getElementById("frame-style-natural").checked = true;
        frameStyle = 'natural';
    }

    frameWidth = urlParams.get('frameWidth');
    if ( frameWidth == null ) {
        document.getElementById("frameWidthBox").value = 2;
        document.getElementById("frameWidthBar").value = 2;
        frameWidth = 2;
    }

    matWidth = urlParams.get('matWidth');
    if ( matWidth == null ) {
        document.getElementById("mat-width-box").value = 0;
        document.getElementById("mat-width-bar").value = 0 ;
        matWidth = 0;
    }

    matColor = urlParams.get('matColor');
    if ( matColor == null ) {
        document.getElementById("mat-color-mint").checked = true;
        matColor = 'ivory';
    }

    if (objectId in localStorage)  else {
        let data = httpGetById("https://collectionapi.metmuseum.org/public/collection/v1/objects/", objectId);
        localStorage[objectId] = JSON.stringify(data);
        retrieveImage(objectId);
    }

    /* ---- Dynamically displaying the Preview-Image ---- */
    let parentContainer = document.getElementById("preview-container");

    let containerPSS = document.getElementById("print-size-s");
    containerPSS.onclick = function () {
        printSize = 'S';
        render(img, container, printSize, frameStyle, frameWidth, matColor, matWidth);
        calcPrice()
    };

    let containerPSM = document.getElementById("print-size-m");
    containerPSM.onclick = function () {
        printSize = 'M';
        render(img, container, printSize, frameStyle, frameWidth, matColor, matWidth);
        calcPrice()
    };

    let containerPSL = document.getElementById("print-size-l");
    containerPSL.onclick = function () {
        printSize = 'L';
        render(img, container, printSize, frameStyle, frameWidth, matColor, matWidth);
        calcPrice()
    };

    /* --- FrameStyle --- */
    /* -- Classic --*/
    let containerFSC = document.getElementById("frame-style-classic");
    containerFSC.onclick = ;

    /* -- Natural --*/
    let containerFSN = document.getElementById("frame-style-natural");
    containerFSN.onclick = ;

    /* -- Shabby --*/
    let containerFSS = document.getElementById("frame-style-shabby");
    containerFSS.onclick = function () {
        frameStyle = 'shabby';
        render(img, container, printSize, frameStyle, frameWidth, matColor, matWidth);
        calcPrice()
    };

    /* -- Elegant --*/
    let containerFSE = document.getElementById("frame-style-elegant");
    containerFSE.onclick = function () {
        frameStyle = 'elegant';
        render(img, container, printSize, frameStyle, frameWidth, matColor, matWidth);
        calcPrice()
    };

    /* --- MatColor --- */
    /* -- Ivory -- */
    let containerMCI = document.getElementById("mat-color-ivory");
    containerMCI.onclick = ;
    /* -- Mint -- */
    let containerMCM = document.getElementById("mat-color-mint");
    containerMCM.onclick = function () {
        matColor = 'mint';
        render(img, container, printSize, frameStyle, frameWidth, matColor, matWidth);
        calcPrice()
    };

    /* -- WINE -- */
    let containerMCW = document.getElementById("mat-color-wine");
    containerMCW.onclick = function () {
        matColor = 'wine';
        render(img, container, printSize, frameStyle, frameWidth, matColor, matWidth);
        calcPrice()
    };

    /* -- Indigo -- */
    let containerMCIN = document.getElementById("mat-color-indigo");
    containerMCIN.onclick = function () {
        matColor = 'indigo';
        render(img, container, printSize, frameStyle, frameWidth, matColor, matWidth);
        calcPrice()
    };

    /* -- Coal -- */
    let containerMCC = document.getElementById("mat-color-coal");
    containerMCC.onclick = function () {
        matColor = 'coal';
        render(img, container, printSize, frameStyle, frameWidth, matColor, matWidth);
        calcPrice()
    };


    /* --- Keeping the configs in sync --- */
    /* -- FrameWidth -- */
    let containerF1 = document.getElementById("frameWidthBox");
    let containerF2 = document.getElementById("frameWidthBar");

    containerF1.onchange = function () {
        if (containerF1.value < 2)  else if (containerF1.value > 5)  else {
            containerF1.value = Math.round(containerF1.value * 10) / 10;
            containerF2.value = containerF1.value;
            frameWidth = (containerF1.value * 10);
        }

        render(img, container, printSize, frameStyle, frameWidth, matColor, matWidth);
        calcPrice()
    };
    containerF2.onchange = ;

    /* -- MatWidth -- */
    let containerM1 = document.getElementById("mat-width-box");
    let containerM2 = document.getElementById("mat-width-bar");

    containerM1.onchange = function () {
        if (containerM1.value < 0)  else if (containerM1.value > 10)  else {
            containerM1.value = Math.round(containerM1.value * 10) / 10;
            containerM2.value = containerM1.value;
            matWidth = (containerM1.value * 10);
        }
        render(img, container, printSize, frameStyle, frameWidth, matColor, matWidth);
        calcPrice()
    };
    containerM2.onchange = ;

    /* --- Displaying the image --- */
    function displayImage(src, printSize, frameWidth, frameStyle, matWidth, matColor) {
        console.log(src);
        img.id = "preview-image";
        img.src = src;
        srcX = src;
        container.prepend(img);

        img.addEventListener('load', function () {
            sizing(getPrintSizes(img));
            render(img, container, printSize, frameStyle, frameWidth, matColor, matWidth);
            calcPrice();
        }, false);


    }

    /* --- Displays the 3 sizing options for the Artwork --- */
    function sizing(sizing) {
        const containerSS = document.getElementById("print-size-s-label");
        const containerSM = document.getElementById("print-size-m-label");
        const containerSL = document.getElementById("print-size-l-label");

        console.log("S : "+sizing.S[0]+ " x "+sizing.S[1]+ " cm");
        console.log("M : "+sizing.M[0]+ " x "+sizing.M[1]+ " cm");
        console.log("L : "+sizing.L[0]+ " x "+sizing.L[1]+ " cm");
        containerSS.innerText = "S \n" + sizing.S[0] + " × " + sizing.S[1] + " cm";
        containerSM.innerText = "M \n" + sizing.M[0] + " × " + sizing.M[1] + " cm";
        containerSL.innerText = "L \n" + sizing.L[0] + " × " + sizing.L[1] + " cm";
    }

    function setTotalSize(sizing) {
        var erg = "";
        if ( printSize === 'S' ) {
            erg = sizing.S[0] + frameWidth + " × " + ( sizing.S[1] + frameWidth ) + " cm"
        } else if ( printSize === 'M' ) {
            erg = sizing.M[0] + frameWidth + " × " + ( sizing.M[1] + frameWidth ) + " cm"
        } else {
            erg = sizing.L[0] + frameWidth + " × " + ( sizing.L[1] + frameWidth ) + " cm"
        }

        return erg;
    }

    /* --- Displays the calculated Price --- */
    function calcPrice() {
        price = calculatePrice(printSize,frameStyle,frameWidth/10,matWidth/10);
        document.getElementById('price').innerText = "€ "+ price.toFixed(2);
        document.getElementById("total-size"). innerHTML = setTotalSize(getPrintSizes(img));
    }

    /* --- Retrieving the fitting image from the API --- */
    async function retrieveImage(objectId) {

        const url = "https://collectionapi.metmuseum.org/public/collection/v1/objects/" + objectId;
        console.log(url);
        const response = await fetch(url);
        const responseJson = await response.json();
        console.log(responseJson);
        try {
            if ( responseJson.message === 'Not Found' || responseJson.message === 'ObjectID not found') 
            if (responseJson.primaryImageSmall.length > 0) {
                displayImage(responseJson.primaryImageSmall, printSize, frameWidth, frameStyle, matWidth, matColor);

                document.getElementById("desc_artist").innerHTML = responseJson.artistDisplayName;
                document.getElementById("desc_title").innerHTML = responseJson.title;
                document.getElementById("desc_date").innerHTML = responseJson.objectDate;
            }
        } 

    }

    document.getElementById("config-form").onsubmit = ;

    var items = getLocalStorage("cart");
    document.getElementById("cart-count").innerText = " (" + items.length + ")";


