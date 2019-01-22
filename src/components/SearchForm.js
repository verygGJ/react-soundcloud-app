import React from 'react';

class SearchForm extends React.Component {
  render() {
    return (
      <form className="search-form" onSubmit={this.props.fetchTracks}>
        <input className="search-form__input" type="text" onChange={this.props.searchTrack} placeholder="Введите название исполнителя или трека"/>
        <button className="search-form__button">Поиск</button>
      </form>
    )
  }
}

export default SearchForm;
