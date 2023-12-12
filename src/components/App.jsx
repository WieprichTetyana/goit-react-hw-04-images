import React, { Component } from 'react';
import Modal from 'react-modal';
import './styles.css';
import { Searchbar } from './searchbar';
import { ImageGallery } from './imageGallery';
import { Button } from './button';
import { Loader } from './loader';
import { fetchPicture } from './api';
import { ModalWindow } from './modal';

Modal.setAppElement('#root');

export class App extends Component {
  state = {
    picture: '',
    page: 1,
    picArray: [],
    isLoading: false,
    isOpen: false,
    largeImage: '',
  };

  modalOpen = image => {
    this.setState({
      isOpen: true,
      largeImage: image,
    });
  };

  modalClose = () => {
    this.setState({
      isOpen: false,
    });
  };

  componentDidUpdate(prevProps, prevState) {
    console.log('componentDidUpdate', prevState, this.state);
    if (
      prevState.picture !== this.state.picture ||
      prevState.page !== this.state.page
    ) {
      fetchPicture(this.state.picture, this.state.page).then(res => {
        this.setState({
          picArray:
            this.state.page === 1
              ? res.hits
              : [...prevState.picArray, ...res.hits],
          isLoading: false,
        });
      });
    }
  }

  formSubmit = event => {
    event.preventDefault();
    const value = event.target.elements[1].value;
    this.setState({
      picture: value,
      isLoading: true,
      page: 1,
      picArray: [],
    });
  };

  handleClick = () => {
    this.setState(prev => ({
      page: prev.page + 1,
    }));
  };

  render() {
    return (
      <>
        <Searchbar onSubmit={this.formSubmit} />
        <ImageGallery
          picArray={this.state.picArray}
          modalOpen={this.modalOpen}
        />
        {Boolean(this.state.picArray.length) && (
          <Button handleClick={this.handleClick} />
        )}
        <Loader isLoading={this.state.isLoading} />
        <ModalWindow
          isOpen={this.state.isOpen}
          closeModal={this.modalClose}
          largeImage={this.state.largeImage}
        />
      </>
    );
  }
}
