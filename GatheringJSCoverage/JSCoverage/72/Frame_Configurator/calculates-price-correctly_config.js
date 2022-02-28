/**
 * Constants
 **/
const MIN_FRAME_WIDTH = 2;
const MAX_FRAME_WIDTH = 5;
const MIN_MAT_WIDTH = 0;
const MAX_MAT_WIDTH = 10;

async function loadArtwork() {
    const urlParams = new URLSearchParams(window.location.search);
    const objectID = urlParams.get('objectID');
    if (objectID == null) 

    document.getElementById('object-id').value = objectID;

    let imageContainer = document.getElementById('preview-container');

    let image = document.createElement('img');
    let imageLabel = document.createElement('div');
    imageLabel.id = 'image-label';
    imageLabel.classList = 'museum-label';
    image.id = 'preview-image';
    imageContainer.appendChild(image);
    imageContainer.appendChild(imageLabel);
    

    const request = async () => {
        const response = await fetch('https://collectionapi.metmuseum.org/public/collection/v1/objects/' + objectID);
        if (response['status'] !== 200) 
        return await response.json();
    };

    let responseCallback = function (json) {
        if (json['primaryImage'] === '')  else {
            image.src = json['primaryImageSmall'];
        }
        imageLabel.innerHTML = `<b>${json['artistDisplayName']}</b><br><i>${json['title']},</i> ${json['objectDate']}`;
    }

    const cachedJson = localStorage.getItem(`object-${objectID}`);
    if (cachedJson != null)  else {
        request().then(json => {
            localStorage.setItem(`object-${objectID}`, JSON.stringify(json));
            responseCallback(json);
        }).catch();
    }

}

function preSetConfiguratorParameters() {
    const urlParams = new URLSearchParams(window.location.search);
    const printSizeIds = {'S': 'print-size-s', 'M': 'print-size-m', 'L': 'print-size-l'};
    const frameStyleIds = {'natural': 'frame-style-natural', 'classic': 'frame-style-classic', 'shabby': 'frame-style-shabby', 'elegant': 'frame-style-elegant'};
    const matColorIds = {'ivory': 'mat-color-ivory', 'coal': 'mat-color-coal', 'mint': 'mat-color-mint', 'indigo': 'mat-color-indigo', 'wine': 'mat-color-wine'}
    const printSize = urlParams.get('printSize');
    const frameStyle = urlParams.get('frameStyle');
    const matColor = urlParams.get('matColor');
    let matWidth = urlParams.get('matWidth');
    let frameWidth = urlParams.get('frameWidth');

    if (printSize != null) 

    if (frameStyle != null) 

    if (matColor != null) 

    if (frameWidth != null) 

    if (matWidth != null) 
}

function updateFrameWidth(width) {
    let frameWidth = document.getElementById('frameWidth');
    let frameWidthR = document.getElementById('frameWidth');
    width = Math.round((width) * 10) / 10;
    if (width > MAX_FRAME_WIDTH) 
    else if (width < MIN_FRAME_WIDTH) 
    frameWidth.value = width;
    frameWidthR.value = width;
}

function updateMatWidth(width) {
    let matWidth = document.getElementById('matWidth');
    let matWidthR = document.getElementById('matWidthR');
    width = Math.round((width) * 10) / 10;
    if (width > MAX_MAT_WIDTH) 
    else if (width < MIN_MAT_WIDTH) 
    matWidth.value = width;
    matWidthR.value = width;
}
function setInputEventListeners() {
    const frameWidth = document.getElementById('frameWidth');
    frameWidth.addEventListener('change', e => {
        updateFrameWidth(frameWidth.value);
    });
    frameWidth.addEventListener('input', e => {
        frameWidthR.value=frameWidth.value
    });
    document.getElementById('frameWidthR').addEventListener('input', );

    const matWidth = document.getElementById('matWidth');
    matWidth.addEventListener('change', e => {
        updateMatWidth(matWidth.value);
    });
    matWidth.addEventListener('input', e => {
        matWidthR.value=matWidth.value
    });
    document.getElementById('matWidthR').addEventListener('input', );
}

loadArtwork();
setInputEventListeners();
preSetConfiguratorParameters();
setCartNumber();
