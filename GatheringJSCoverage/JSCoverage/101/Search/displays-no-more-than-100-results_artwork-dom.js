import * as DomBuilder from './dom-builder.js';
export class GalleryContainer {
  constructor(results) {
    this.galleryContainer = document.getElementById("gallery");
    if (!this.galleryContainer) 
  }
  clear() {
    this.galleryContainer.innerHTML = '';
  }

  addArtworkToGallery(artwork) {
    console.log(`Adding ${artwork.objectID} to gallery`);
    const spanContainerElement = createSpanContainer(artwork);
    const linkContainerElement = createLinkContainer(artwork, spanContainerElement);
    const artworkContainerElement = createArtworkContainer(linkContainerElement);
    this.galleryContainer.appendChild(artworkContainerElement);

    function createArtworkContainer(linkElement) {
      let divElement = DomBuilder.container('div', [linkElement]);
      divElement.setAttribute("class", "thumb");
      return divElement;
    }

    function createLinkContainer(artwork, spanContainer) {
      let imageElement = document.createElement('img');
      imageElement = DomBuilder.setAttributes(imageElement, {
        src: artwork.primaryImageSmall,
        alt: artwork.title,
        id: `object-image-${artwork.objectID}`
      });
      let linkElement = DomBuilder.container('a', [imageElement, spanContainer]);
      linkElement = DomBuilder.setAttributes(linkElement, {
        href: `./config.html?objectID=${artwork.objectID}`,
        id: artwork.objectID
      });
      return linkElement;
    }

    function createSpanContainer(artwork) {
      let spanElement1 = DomBuilder.createTextElement("span", artwork.artistDisplayName);
      spanElement1.setAttribute("class", "artist");
      let spanElement2 = DomBuilder.createTextElement("span", artwork.title);
      spanElement2.setAttribute("class", "title");
      let spanElement3 = DomBuilder.createTextElement("span", ", " + artwork.objectDate);
      spanElement3.setAttribute("class", "date");
      let divElement = DomBuilder.container('div', [spanElement1, spanElement2, spanElement3]);
      divElement.setAttribute("class", "museum-label");
      return divElement;
    }
  }
}