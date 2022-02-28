export class Painting {
  constructor(
    objectID,
    artistDisplayName,
    title,
    objectDate,
    primaryImage,
    primaryImageSmall
  ) {
    this.objectID = objectID;
    this.artistDisplayName = artistDisplayName;
    this.title = title;
    this.objectDate = objectDate;
    this.primaryImage = primaryImage;
    this.primaryImageSmall = primaryImageSmall;
  }
}

/**
 *  Extending Painting with its FrameConfig for Cart
 */
export class PaintingithFrameConfig extends Painting {
  
}
