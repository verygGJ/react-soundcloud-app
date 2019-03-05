import React from 'react';

const SearchForm = ({ fetchTracks, searchTrack }) => {
  return (
    <form className="search-form" onSubmit={fetchTracks}>
      <input 
        className="search-form__input" 
        type="text" 
        onChange={searchTrack} 
        placeholder="Enter the name of the artist or track"
      />
      <button className="search-form__button">Search</button>
    </form>
  )
}

export default SearchForm;
