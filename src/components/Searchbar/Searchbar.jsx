import { useState } from 'react';
import PropTypes from 'prop-types';

import initialState from './initialState.js';

const Searchbar = ({ onSubmit }) => {
  const [state, setState] = useState({ ...initialState });

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setState(prevState => {
      return { ...prevState, [name]: value };
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({ ...state });
    setState({ ...initialState });
  };

  const { search } = state;

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">
        <span>Search</span>
      </button>

      <input
        onChange={handleChange}
        name="search"
        value={search}
        type="text"
        autocomplete="off"
        autofocus
      />
    </form>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;

// class Searchbar extends Component {
//   state = {
//     search: '',
//   };

//   handleChange = ({ target }) => {
//     const { name, value } = target;
//     this.setState({ [name]: value });
//   };

//   handleSubmit = e => {
//     e.preventDefault();
//     const { onSubmit } = this.props;
//     onSubmit({ ...this.state });
//     this.reset();
//   };

//   reset() {
//     this.setState({ search: '' });
//   }

//   render() {
//     const { search } = this.state;
//     const { handleSubmit, handleChange } = this;

//     return (
//       <form onSubmit={handleSubmit}>
//         <button type="submit">
//           <span>Search</span>
//         </button>

//         <input
//           onChange={handleChange}
//           name="search"
//           value={search}
//           type="text"
//           autocomplete="off"
//           autofocus
//         />
//       </form>
//     );
//   }
// }
