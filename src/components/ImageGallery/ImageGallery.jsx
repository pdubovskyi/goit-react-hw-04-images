import PropTypes from 'prop-types';

import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

const ImageGallery = ({ items, showImage }) => {
  return (
    <>
      <ImageGalleryItem items={items} showImage={showImage} />
    </>
  );
};

export default ImageGallery;

ImageGallery.propTypes = {
  items: PropTypes.array.isRequired,
  showImage: PropTypes.func.isRequired,
};
