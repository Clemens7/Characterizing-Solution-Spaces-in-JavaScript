import { render, getPrintSizes, calculatePrice, getTotalFrameSize } from './frame.js';

export const renderImg = 
export const renderLabel = object => {
  const imgLabel = document.getElementById('image-label');
  const artist = document.createElement('span');
  artist.classList.add('artist');
  artist.innerText = object.artistDisplayName;
  imgLabel.appendChild(artist);
  const title = document.createElement('span');
  title.classList.add('title');
  title.innerText = object.title;
  imgLabel.appendChild(title);
  const date = document.createElement('span');
  date.classList.add('date');
  date.innerText = object.objectDate;
  imgLabel.appendChild(date);
  return imgLabel;
};
export const renderPrintSizes = ;
export const renderTotalSize = ;
export const renderPrice = artwork => {
  price.innerText = `€ ${calculatePrice(artwork.printSize, artwork.frameStyle, artwork.frameWidth, artwork.matWidth).toFixed(2)}`;
};