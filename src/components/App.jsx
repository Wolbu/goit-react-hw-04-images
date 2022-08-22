import { useState, useEffect } from 'react';
import s from './App.module.css';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import api from '../API/pixabay-api';
import Modal from './Modal/Modal';
import Loader from './Loader/Loader';

const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modalImageURL, setModalImageURL] = useState('');

  useEffect(() => {
    if (query === '') {
      return;
    }
    setLoading(true);
    api
      .fetchImages(query, page)
      .then(res => res.json())
      .then(data => {
        if (data.totalHits === 0) {
          alert('No results found');
          setError('No results found');
          setLoading(false);
        }
        setImages([...images, ...data.hits]);
      })
      .catch(err => {
        setError({ err });
        alert(error);
      })
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, page]);

  const handleFormSubmit = searchQuery => {
    if (searchQuery !== query) {
      setQuery(searchQuery);
      setImages([]);
    }
    return;
  };
  // Load More
  const onLoadMore = () => {
    setPage(page + 1);
  };

  const openModal = imageURL => {
    setModalImageURL(imageURL);
  };

  const closeModal = () => {
    setModalImageURL('');
  };

  return (
    <div className={s.App}>
      {modalImageURL && (
        <Modal images={modalImageURL} closeModal={closeModal} />
      )}
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageGallery images={images} showModal={openModal} />
      {loading && <Loader />}
      {images.length > 0 && !loading && <Button onLoadMore={onLoadMore} />}
    </div>
  );
};

export { App };
