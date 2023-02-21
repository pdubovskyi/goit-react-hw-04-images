const ImageDetails = ({ largeImageURL }) => {
  console.log(largeImageURL);
  return <img src={largeImageURL} alt="" />;
};

export default ImageDetails;
