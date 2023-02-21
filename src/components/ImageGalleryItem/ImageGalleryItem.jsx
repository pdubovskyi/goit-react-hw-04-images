import PropTypes from 'prop-types';

import styles from './image-gallery.module.css';

const ImageGalleryItem = ({ items, showImage }) => {
  const images = items.map(({ id, webformatURL, largeImageURL }) => {
    return (
      <li onClick={() => showImage({ largeImageURL })} key={id}>
        <img src={webformatURL} alt="" />
      </li>
    );
  });

  return <ul className={styles.gallery}>{images}</ul>;
};

ImageGalleryItem.defaultProps = {
  items: [],
};

ImageGalleryItem.propTypes = {
  items: PropTypes.array.isRequired,
  showImage: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
