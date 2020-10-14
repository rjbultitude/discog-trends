import React, { useEffect, useState } from 'react';
import FilterFieldsetStyled from '../filter-fieldset/filter-fieldset';
import FilterFieldStyled from '../filter-field/filter-field';
import Label from '../label/label';
import SearchField from './search';

function titleSearch({ titleStr, setTitle, setInvalidTitleSearch }) {
  if (titleStr) {
    setTitle(titleStr);
  } else {
    setInvalidTitleSearch(true);
  }
}

function artistSearch({ artistStr, setArtist, setInvalidArtistSearch }) {
  if (artistStr) {
    setArtist(artistStr);
  } else {
    setInvalidArtistSearch(true);
  }
}

function dispatchSearch() {
  // TODO
}

const SearchForm = () => {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [invalidTitleSearch, setInvalidTitleSearch] = useState(null);
  const [invalidArtistSearch, setInvalidArtistSearch] = useState(null);

  useEffect(() => {
    getNewData();
  }, [title, artist]);

  return (
    <FilterFieldsetStyled>
      <h2>Search</h2>
      <FilterFieldStyled>
        <Label text="Artist" forVal="artistSearch" />
        <SearchField
          id="artistsSearch"
          changeCB={(artistStr) => {
            artistSearch({ artistStr, setArtist, setInvalidArtistSearch });
          }}
        />
        {invalidArtistSearch === true ? <p>Bad character</p> : null}
      </FilterFieldStyled>
      <FilterFieldStyled>
        <Label text="Title" forVal="titleSearch" />
        <SearchField
          id="titleSearch"
          changeCB={(titleStr) => {
            titleSearch({ titleStr, setTitle, setInvalidTitleSearch });
          }}
        />
        {invalidTitleSearch === true ? <p>Bad character</p> : null}
      </FilterFieldStyled>
      <button onClick={dispatchSearch}>Search</button>
    </FilterFieldsetStyled>
  );
};

export default SearchForm;
