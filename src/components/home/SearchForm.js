import React from 'react';

const SearchForm = ({ fetchTracks, searchTrack }) => {
  return (
    <form className="search-form" onSubmit={fetchTracks}>
      <input 
        className="search-form__input" 
        type="text" 
        onChange={searchTrack} 
        placeholder="Введите название исполнителя или трека"
      />
      <button className="search-form__button">Поиск</button>
    </form>
  )
}

export default SearchForm;
