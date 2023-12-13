import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import './styles.css';
import { Searchbar } from './searchbar';
import { ImageGallery } from './imageGallery';
import { Button } from './button';
import { Loader } from './loader';
import { fetchPicture } from 'api';
import { ModalWindow } from './modal';

Modal.setAppElement('#root');

const App = () => {
  const [picture, setPicture] = useState('');
  const [page, setPage] = useState(1);
  const [picArray, setPicArray] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [largeImage, setLargeImage] = useState('');

  useEffect(() => {
    if (!picture) return;

    const fetchImages = async () => {
      setIsLoading(true);

      const res = await fetchPicture(picture, page);
      /* setPicArray(page === 1 ? res.hits : [...picArray, ...res.hits]); */
      setPicArray(prevPicArray =>
        page === 1 ? res.hits : [...prevPicArray, ...res.hits]
      );
      setIsLoading(false);
    };

    fetchImages();
  }, [picture, page]);

  const modalOpen = image => {
    setIsOpen(true);
    setLargeImage(image);
  };

  const modalClose = () => {
    setIsOpen(false);
  };

  const formSubmit = event => {
    event.preventDefault();
    const value = event.target.elements[1].value;
    setPicture(value);
    setPage(1);
    setPicArray([]);
  };

  const handleClick = () => {
    setPage(prev => prev + 1);
  };

  return (
    <>
      <Searchbar onSubmit={formSubmit} />
      <ImageGallery picArray={picArray} modalOpen={modalOpen} />
      {Boolean(picArray.length) && <Button handleClick={handleClick} />}
      <Loader isLoading={isLoading} />
      <ModalWindow
        isOpen={isOpen}
        closeModal={modalClose}
        largeImage={largeImage}
      />
    </>
  );
};

export default App;
