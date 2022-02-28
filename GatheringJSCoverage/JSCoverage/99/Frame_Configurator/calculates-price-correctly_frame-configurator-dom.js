import * as Frame from './frame.js';

export class FrameConfiguratorDocumentContainer {
    constructor(previewContainerId='preview-container', previewImageId='preview-image', imageLabelId='image-label') {
        this.previewContainer = document.getElementById(previewContainerId);
        if(!this.previewContainer) 
        this.previewImage = document.getElementById(previewImageId);
        if(!this.previewImage) 
        this.imageLabel = document.getElementById(imageLabelId);
        if(!this.imageLabel) 
    }

    setArtwork(artwork, frameConfig) {
        this.previewImage.setAttribute('src', artwork.primaryImageSmall);
        this.renderArtwork(frameConfig);
        this.setArtworkLabel(artwork);
        this.setPrintSizes();
    }

    setArtworkLabel(artwork) {
        let artistDisplayName = document.createElement('span');
        artistDisplayName.setAttribute('style', "font-weight: bold; display: block");
        artistDisplayName.innerHTML = artwork.artistDisplayName;

        let title = document.createElement('span');
        title.setAttribute('style', "font-style: italic");
        title.innerHTML = artwork.title;

        let objectDate = document.createElement('span');
        objectDate.innerHTML = `, ${artwork.objectDate}`;

        this.imageLabel.innerHTML = '';
        this.imageLabel.appendChild(artistDisplayName);
        this.imageLabel.appendChild(title);
        this.imageLabel.appendChild(objectDate);
    }

    setPrintSizes() {
        let printSizes = Frame.getPrintSizes(this.previewImage);
        let printSizeLabelS = document.getElementById('print-size-s-label');
        printSizeLabelS.innerHTML = `Small<br>${printSizes.S[0] / 10} × ${printSizes.S[1] / 10} cm`;
        let printSizeLabelM = document.getElementById('print-size-m-label');
        printSizeLabelM.innerHTML = `Medium<br>${printSizes.M[0] / 10} × ${printSizes.M[1] / 10} cm`;
        let printSizeLabelL = document.getElementById('print-size-l-label');
        printSizeLabelL.innerHTML = `Large<br>${printSizes.L[0] / 10} × ${printSizes.L[1] / 10} cm`;
    }

    renderArtwork(frameConfig) {
        Frame.render(this.previewImage, this.previewContainer, frameConfig.printSize, frameConfig.frameStyle, frameConfig.frameWidth, frameConfig.matColor, frameConfig.matWidth);
        this.setPrice(frameConfig);
        this.setTotalSize(frameConfig);
    }

    setPrice(frameConfig) {
        let price = Frame.calculatePrice(frameConfig.printSize, frameConfig.frameStyle,
            frameConfig.frameWidth, frameConfig.matWidth);
        let priceElem = document.getElementById('price');
        priceElem.innerHTML = `€ ${price.toFixed(2)}`;
    }

    setTotalSize(frameConfig) {
        let printSizes = Frame.getPrintSizes(this.previewImage);
        let printSizeWidth = printSizes[frameConfig.printSize][0];
        let printSizeHeight = printSizes[frameConfig.printSize][1];
    
        let totalWidth = (printSizeWidth + frameConfig.frameWidth + frameConfig.matWidth) / 10;
        let totalHeight = (printSizeHeight + frameConfig.frameWidth + frameConfig.matWidth) / 10;

        let totalSize = document.getElementById('total-size');
        totalSize.innerHTML = `${totalWidth} × ${totalHeight} cm`;
    }
}