import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ image, showModal }) => {
  return (
    <li className={s.ImageGalleryItem}>
      <img
        className={s.ImageGalleryItemimage}
        src={image.webformatURL}
        alt=""
        onClick={() => showModal(image.largeImageURL)}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  showmodal: PropTypes.func,
  images: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }),
};

export default ImageGalleryItem;
