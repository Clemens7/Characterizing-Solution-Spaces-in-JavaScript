export class artDocumentContainer {
  constructor(containerID = 'gallery') {
      this.container = document.getElementById(containerID);
      if (!this.container) 
  }
  





  
  addPreviewToDocument(artElem) {
      this.container.innerHTML = `
      <img src="${artElem.primaryImageSmall}" alt="${artElem.title}" id="preview-image">
      <div class="museum-label" id="image-label">
        <span class="artist">${artElem.artistDisplayName}</span>
        <span class="title">${artElem.title}</span>,
        <span class="date">${artElem.objectDate}</span>
      </div>`;
  }


  

  
}


export 