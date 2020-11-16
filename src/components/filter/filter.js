// filter hooks
import React, { useState, useEffect } from 'react';

// Styles
import styled from 'styled-components';
import getDiscogsData from '../../utils/getdata';
import Results from '../results/results';
import { processData, sortByRank } from '../../utils/filter-funcs';
import { breakPoints, colours, padding } from '../../utils/theme';
// Components
import Label from '../label/label';
import Select from '../select/select';
import Pagination from '../pagination/pagination';
import Search from '../search/search';
import * as appConstants from '../../utils/constants';

const filterWidth = '200px';

const FilterResultsWrapper = styled.main`
  display: flex;
  flex-direction: column;

  @media all and (min-width: ${breakPoints.medium}) {
    flex-direction: row;
  }
`;

const FilterForm = styled.section`
  display: flex;
  flex-basis: 100%;
  margin-bottom: ${padding.normal};

  @media all and (min-width: ${breakPoints.medium}) {
    flex-basis: ${filterWidth};
    flex-direction: column;
    margin-right: ${padding.normal};
  }
`;

const FilterFieldset = styled.div`
  align-items: flex-start;
  background-color: ${colours.lightGreyAlpha};
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
  padding: ${padding.normal};

  & + div {
    border-left: 1px solid ${colours.darkGrey};
  }

  h2 {
    flex-basis: 100%;
    margin: 0;
  }

  @media all and (min-width: ${breakPoints.medium}) {
    & + div {
      border-left: 0 none;
      border-top: 1px solid ${colours.darkGrey};
    }
  }
`;
const ResultsWrapper = styled.section`
  display: flex;
  flex-direction: column;
  flex-basis: 100%;

  @media all and (min-width: ${breakPoints.medium}) {
    flex-basis: calc(100% - ${filterWidth});
  }
`;
const FilterField = styled.div`
  box-sizing: border-box;
  padding: ${padding.normal} 0 0;
  margin: 0;
`;

export function buildQuery(queryArgs) {
  let query = '';
  const BLANK = '--';
  Object.keys(queryArgs).forEach((queryArgKey, index) => {
    const queryArgVal = queryArgs[queryArgKey];
    if (queryArgVal && queryArgVal !== BLANK) {
      query += `&${queryArgKey}=${queryArgVal}`;
      if (index - 1 !== Object.keys(queryArgs).length) {
        query += ',';
      }
    }
  });
  return query;
}

const useFilter = () => {
  const [genre, setGenre] = useState('');
  const [format, setFormat] = useState('');
  const [country, setCountry] = useState('');
  const [track, setTrack] = useState('');
  const [artist, setArtist] = useState('');
  const [releaseData, setReleaseData] = useState([]);
  const [pagination, setPagination] = useState({ pages: 1 });
  const [sortOrderDemand, setSortOrderDemand] = useState('');
  const [sortOrderScarcity, setSortOrderScarcity] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [invalidTrackSearch, setInvalidTrackSearch] = useState(null);
  const [invalidArtistSearch, setInvalidArtistSearch] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  function toggleDemand() {
    let order;
    if (sortOrderDemand === appConstants.ASC) {
      order = appConstants.DESC;
    } else {
      order = appConstants.ASC;
    }
    const sortedByDemand = sortByRank(releaseData, appConstants.DEMAND, order);
    setReleaseData(sortedByDemand);
    setSortOrderDemand(order);
  }

  function toggleScarcity() {
    let order;
    if (sortOrderScarcity === appConstants.ASC) {
      order = appConstants.DESC;
    } else {
      order = appConstants.ASC;
    }
    const sortedByScarcity = sortByRank(
      releaseData,
      appConstants.SCARCITY,
      order
    );
    setReleaseData(sortedByScarcity);
    setSortOrderScarcity(order);
  }

  function getNewData() {
    const query = buildQuery({ genre, format, country, track, artist });
    setLoading(true);
    getDiscogsData(
      (data) => {
        if (data === 'error') {
          setError(true);
          return;
        }
        console.log('data', data);
        const processedData = processData(data.results);
        const sortedByDemand = sortByRank(
          processedData,
          appConstants.DEMAND,
          appConstants.ASC
        );
        setReleaseData(sortedByDemand);
        setSortOrderDemand(appConstants.ASC);
        // setReleaseData(processedData);
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

  function trackSearch(trackStr) {
    if (trackStr) {
      setTrack(trackStr);
      setInvalidArtistSearch(false);
    }
    if (trackStr === null) {
      setInvalidTrackSearch(true);
    } else {
      setInvalidTrackSearch(false);
    }
  }

  function artistSearch(artistStr) {
    if (artistStr) {
      setArtist(artistStr);
      setInvalidArtistSearch(false);
    }
    if (artistStr === null) {
      setInvalidArtistSearch(true);
    } else {
      setInvalidArtistSearch(false);
    }
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
  }, [currentPage, genre, format, country, track, artist]);

  return (
    <>
      {error === true ? (
        <h2>No data. Bad connection</h2>
      ) : (
        <FilterResultsWrapper>
          <FilterForm>
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
              <FilterField>
                <Label text="Artist" forVal="artistSearch" />
                <Search id="artistsSearch" changeCB={artistSearch} />
                {invalidArtistSearch === true ? <p>Bad character</p> : null}
              </FilterField>
              <FilterField>
                <Label text="Track" forVal="trackSearch" />
                <Search id="trackSearch" changeCB={trackSearch} />
                {invalidTrackSearch === true ? <p>Bad character</p> : null}
              </FilterField>
            </FilterFieldset>
          </FilterForm>
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
