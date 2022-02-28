import { render, getPrintSizes, calculatePrice, getTotalFrameSize } from './frame.js';

export const renderImg = (img, container, artwork) => {
  render(img, container, artwork.printSize, artwork.frameStyle, artwork.frameWidth, artwork.matColor, artwork.matWidth);
}
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
export const renderPrintSizes = (img, sizeSLabel, sizeMLabel, sizeLLabel) => {
  const sizes = getPrintSizes(img);
  sizeSLabel.innerHTML = `Small<br>${sizes.S[0] / 10} × ${sizes.S[1] / 10} cm`;
  sizeMLabel.innerHTML = `Medium<br>${sizes.M[0] / 10} × ${sizes.M[1] / 10} cm`;
  sizeLLabel.innerHTML = `Large<br>${sizes.L[0] / 10} × ${sizes.L[1] / 10} cm`;
};
export const renderTotalSize = (img, artwork, totalSize) => {
  const { w, h } = getTotalFrameSize(img, artwork.printSize, artwork.frameWidth, artwork.matWidth);
  totalSize.innerText = `${(w / 10).toFixed(1)} × ${(h / 10).toFixed(1)} cm`;
};
export const renderPrice = artwork => {
  price.innerText = `€ ${calculatePrice(artwork.printSize, artwork.frameStyle, artwork.frameWidth, artwork.matWidth).toFixed(2)}`;
};