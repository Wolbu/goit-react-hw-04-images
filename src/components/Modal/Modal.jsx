import PropTypes from 'prop-types';
import s from './Modal.module.css';
import { useEffect } from 'react';

const Modal = ({ images, closeModal }) => {
  useEffect(() => {
    window.addEventListener('keydown', handleKeydown);

    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  });

  const handleKeydown = e => {
    if (e.code === 'Escape') {
      closeModal();
    }
  };

  const handleBackdrop = e => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <div className={s.Overlay} onClick={handleBackdrop}>
      <div className={s.Modal}>
        <img src={images} alt="" />
      </div>
    </div>
  );
};

export default Modal;

Modal.propTypes = {
  images: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};
