import React from 'react';
import { ImageGalleryItem } from './imageGalleryItem';

export const ImageGallery = ({ picArray, modalOpen }) => {
  return (
    <ul className="gallery">
      {picArray.map(({ id, webformatURL, largeImageURL }) => (
        <ImageGalleryItem
          key={id}
          webformatURL={webformatURL}
          modalOpen={modalOpen}
          largeImageURL={largeImageURL}
        />
      ))}
    </ul>
  );
};
