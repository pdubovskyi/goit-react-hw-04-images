import { useState, useEffect } from 'react';

import Searchbar from 'components/Searchbar/Searchbar';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import { onSearchImages } from 'components/Api/Api';
import Modal from 'components/Modal/Modal';
import ImageDetails from 'components/ImageDetails/ImageDetails';

const SearchImage = () => {
  const [search, setSearch] = useState('');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [imageDetails, setImageDetails] = useState(null);

  useEffect(() => {
    if (search) {
      const fetchImages = async () => {
        try {
          setLoading(true);
          const data = await onSearchImages(search, page);
          setItems(prevItems => [...prevItems, ...data.hits]);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };
      fetchImages();
    }
  }, [search, page, setLoading, setItems, setError, setLoading]);

  const searchImages = ({ search }) => {
    setSearch(search);
    setItems([]);
    setPage(1);
  };

  const showImage = data => {
    setImageDetails(data);
    setShowModal(true);
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const closeModal = () => {
    setShowModal(false);
    setImageDetails(null);
  };

  return (
    <>
      {loading && <p>...Loading</p>}
      {error && <p>Something goes wrong</p>}
      <Searchbar onSubmit={searchImages} />
      <ImageGallery items={items} showImage={showImage} />
      {Boolean(items.length) && <button onClick={loadMore}>Load more</button>}
      {showModal && (
        <Modal close={closeModal}>
          <ImageDetails {...imageDetails} />
        </Modal>
      )}
    </>
  );
};
// class SearchImage extends Component {
//   state = {
//     search: '',
//     items: [],
//     loading: false,
//     error: null,
//     page: 1,
//     showModal: false,
//     imageDetails: null,
//   };

//   searchImages = ({ search }) => {
//     this.setState({ search, items: [], page: 1 });
//   };

//   componentDidUpdate(prevProps, prevState) {
//     const { search, page } = this.state;
//     if (prevState.search !== search || prevState.page !== page) {
//       this.setState({ loading: true });

//       searchImages(search, page)
//         .then(data =>
//           this.setState(({ items }) => ({
//             items: [...items, ...data.hits],
//           }))
//         )
//         .catch(error => {
//           this.setState({ error: error.message });
//         })
//         .finally(() => {
//           this.setState({ loading: false });
//         });
//     }
//   }

//   loadMore = () => {
//     this.setState(({ page }) => ({ page: page + 1 }));
//     console.log('click');
//   };

//   showImage = ({ largeImageURL }) => {
//     this.setState({
//       imageDetails: {
//         largeImageURL,
//       },
//       showModal: true,
//     });
//   };

//   closeModal = () => {
//     this.setState({
//       showModal: false,
//       imageDetails: null,
//     });
//   };

//   render() {
//     const { items, loading, error, showModal, imageDetails } = this.state;
//     const { searchImages, loadMore, showImage, closeModal } = this;

//     return (
//       <>
//         {loading && <p>...Loading</p>}
//         {error && <p>Something goes wrong</p>}
//         <Searchbar onSubmit={searchImages} />
//         <ImageGallery items={items} showImage={showImage} />
//         {Boolean(items.length) && <button onClick={loadMore}>Load more</button>}
//         {showModal && (
//           <Modal close={closeModal}>
//             <ImageDetails {...imageDetails} />
//           </Modal>
//         )}
//       </>
//     );
//   }
// }

export default SearchImage;
