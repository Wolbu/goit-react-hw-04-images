import { Component } from 'react';
import s from './App.module.css';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import api from '../API/pixabay-api';
import Modal from './Modal/Modal';
import Loader from './Loader/Loader';

class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    loading: false,
    error: null,
    showModal: false,
    modalImageURL: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;

    if (query !== prevState.query || prevState.page !== page) {
      this.setState({ loading: true });

      api
        .fetchImages(query, page)
        .then(res => res.json())
        .then(data => {
          if (data.totalHits === 0) {
            alert('No results found');
            this.setState({
              error: 'No results found',
              loading: false,
            });
          }
          this.setState(prevState => ({
            images: [...prevState.images, ...data.hits],
          }));
        })
        .catch(error => this.setState({ error }))
        .finally(() => this.setState({ loading: false }));
    }
  }

  handleFormSubmit = searchQuery => {
    const { query } = this.state;
    if (searchQuery !== query) {
      this.setState({ query: searchQuery, images: [] });
    }
    return;
  };

  onLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  openModal = imageURL => {
    this.setState({ modalImageURL: imageURL });
  };

  closeModal = () => {
    this.setState({ modalImageURL: '' });
  };

  render() {
    const { images, loading, modalImageURL } = this.state;
    return (
      <div className={s.App}>
        {modalImageURL && (
          <Modal images={modalImageURL} closeModal={this.closeModal} />
        )}
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery images={images} showModal={this.openModal} />
        {loading && <Loader />}
        {images.length > 0 && !loading && (
          <Button onLoadMore={this.onLoadMore} />
        )}
      </div>
    );
  }
}

export { App };
