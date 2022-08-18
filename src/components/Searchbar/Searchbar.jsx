import PropTypes from 'prop-types';
import s from './Searchbar.module.css';
import { useState } from 'react';

const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleInput = ({ target }) => {
    setQuery(target.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (query.trim() === '') {
      alert('Please enter the right value');
    }
    onSubmit(query);
    setQuery('');
  };

  return (
    <header className={s.Searchbar}>
      <form onSubmit={handleSubmit} className="s.SearchForm">
        <input
          className={s.SearchFormInput}
          type="text"
          value={query}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleInput}
        />
        <button type="submit" className={'button'}>
          <span className="button-label">Search</span>
        </button>
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
