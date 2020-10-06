// filter hooks
import React, { useState, useEffect } from 'react';

// Styles
import styled from 'styled-components';
import getDiscogsData from '../../utils/getdata';
import Results from './results';
import { processData, sortByRank } from '../../utils/filter-funcs';
import { padding } from '../../utils/theme';
// Components
import Label from '../label/label';
import Select from '../select/select';
import Pagination from '../pagination/pagination';
import Search from '../search/search';
import * as appConstants from '../../utils/constants';

const BP_MEDIUM = '720px';

const FilterResultsWrapper = styled.main`
  display: flex;
  flex-direction: column;

  @media all and (min-width: ${BP_MEDIUM}) {
    flex-direction: row;
  }
`;

const FilterWrapper = styled.section`
  display: flex;
  flex-basis: 100%;

  @media all and (min-width: ${BP_MEDIUM}) {
    flex-basis: 30%;
    flex-direction: column;
    margin-right: ${padding};
  }
`;

const FilterFieldset = styled.div`
  align-items: flex-start;
  border: 1px solid gray;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
  margin-top: ${padding};
  padding: ${padding};

  & + div {
    border-left: 0 none;
  }

  h2 {
    flex-basis: 100%;
    margin: 0;
  }

  @media all and (min-width: ${BP_MEDIUM}) {
    & + div {
      border-left: 1px solid gray;
    }
  }
`;
const ResultsWrapper = styled.section`
  display: flex;
  flex-direction: column;
  flex-basis: 100%;
  margin-top: ${padding};

  @media all and (min-width: ${BP_MEDIUM}) {
    flex-basis: 70%;
  }
`;
const FilterField = styled.div`
  box-sizing: border-box;
  flex-basis: 30%;
  padding: ${padding};
  margin: 0 auto;

  select {
    min-width: 200px;
  }
`;

export function buildQuery({ genre, format, country, title, artist }) {
  let query = '';
  const BLANK = '--';
  // TODO refactor
  if (genre && genre !== BLANK) {
    query += `genre=${genre},`;
  }
  if (format && format !== BLANK) {
    query += `format=${format},`;
  }
  if (country && country !== BLANK) {
    query += `country=${country},`;
  }
  if (title) {
    query += `release_title=${title},`;
  }
  if (artist) {
    query += `artist=${artist}`;
  }
  return query;
}

const useFilter = () => {
  const [genre, setGenre] = useState('');
  const [format, setFormat] = useState('');
  const [country, setCountry] = useState('');
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [releaseData, setReleaseData] = useState([]);
  const [pagination, setPagination] = useState({ pages: 1 });
  const [sortOrderDemand, setSortOrderDemand] = useState('');
  const [sortOrderScarcity, setSortOrderScarcity] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [invalidSearch, setInvalidSearch] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  function getNewData() {
    const query = buildQuery({ genre, format, country, title, artist });
    setLoading(true);
    getDiscogsData(
      (data) => {
        if (data === 'error') {
          setError(true);
          return;
        }
        console.log('data', data);
        const processedData = processData(data.results);
        setReleaseData(processedData);
        setPagination(data.pagination);
        setLoading(false);
      },
      query,
      currentPage
    );
  }

  const changeGenre = (e) => {
    setGenre(e.target.value);
  };

  const changeFormat = (e) => {
    setFormat(e.target.value);
  };

  const changeCountry = (e) => {
    setCountry(e.target.value);
  };

  function titleSearch(titleStr) {
    if (titleStr) {
      setTitle(titleStr);
    } else {
      setInvalidSearch(true);
    }
  }

  function artistSearch(artistStr) {
    if (artistStr) {
      setArtist(artistStr);
    } else {
      setInvalidSearch(true);
    }
  }

  function toggleDemand() {
    let order;
    if (sortOrderDemand === 'asc') {
      order = 'desc';
    } else {
      order = 'asc';
    }
    const sortedByDemand = sortByRank(releaseData, 'demand', order);
    setReleaseData(sortedByDemand);
    setSortOrderDemand(order);
  }

  function toggleScarcity() {
    let order;
    if (sortOrderScarcity === 'asc') {
      order = 'desc';
    } else {
      order = 'asc';
    }
    const sortedByScarcity = sortByRank(releaseData, 'scarcity', order);
    setReleaseData(sortedByScarcity);
    setSortOrderScarcity(order);
  }

  function prevResults() {
    if (currentPage > 1) {
      setCurrentPage(() => currentPage - 1);
    }
  }

  function nextResults() {
    if (currentPage < pagination.pages) {
      setCurrentPage(() => currentPage + 1);
    }
  }

  // componentDidMount/componentDidUpdate
  useEffect(() => {
    getNewData();
  }, [currentPage, genre, format, country, title, artist]);

  return (
    <>
      {error === true ? (
        <h2>No data. Bad connection</h2>
      ) : (
        <FilterResultsWrapper>
          <FilterWrapper>
            <FilterFieldset>
              <h2>Filter</h2>
              <FilterField>
                <Label text="Genre" forVal={appConstants.GENRES_STR} />
                <Select
                  selectOptions={appConstants.GENRES}
                  changeCB={changeGenre}
                  id={appConstants.GENRES_STR}
                />
              </FilterField>
              <FilterField>
                <Label text="Format" forVal={appConstants.FORMATS_STR} />
                <Select
                  selectOptions={appConstants.FORMATS}
                  changeCB={changeFormat}
                  id={appConstants.FORMATS_STR}
                />
              </FilterField>
              <FilterField>
                <Label text="Country" forVal={appConstants.COUNTRIES_STR} />
                <Select
                  selectOptions={appConstants.COUNTRIES}
                  changeCB={changeCountry}
                  id={appConstants.COUNTRIES_STR}
                />
              </FilterField>
            </FilterFieldset>
            <FilterFieldset>
              <h2>Search</h2>
              <Label text="Artist" forVal="artistSearch" />
              <Search id="artistsSearch" changeCB={artistSearch} />
              <Label text="Title" forVal="titleSearch" />
              <Search id="titleSearch" changeCB={titleSearch} />
              {invalidSearch === true ? <p>Bad character</p> : null}
            </FilterFieldset>
          </FilterWrapper>
          <ResultsWrapper>
            {releaseData && releaseData.length > 0 ? (
              <>
                {loading === true ? <h2>Loading</h2> : null}
                <Results
                  releaseData={releaseData}
                  toggleScarcityCB={toggleScarcity}
                  scarcityOrder={sortOrderScarcity}
                  toggleDemandCB={toggleDemand}
                  demandOrder={sortOrderDemand}
                />
                <Pagination
                  prevResults={prevResults}
                  nextResults={nextResults}
                  prevDisabled={currentPage === 1}
                  nextDisabled={currentPage === pagination.pages}
                  currentPage={currentPage}
                  numPages={pagination.pages}
                />
              </>
            ) : (
              <h2>No results</h2>
            )}
          </ResultsWrapper>
        </FilterResultsWrapper>
      )}
    </>
  );
};

export default useFilter;
