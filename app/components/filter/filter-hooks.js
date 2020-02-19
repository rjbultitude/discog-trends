// filter hooks
import { useState, useEffect } from 'react';

const useFilter = () => {
  const [genre, setGenre] = useState('');
  const [format, setFormat] = useState('');
  const [country, setCountry] = useState('');
  const [title, setTitle] = useState('');
  const [originalData, setOriginalData] = useState([]);
  const [releaseData, setReleaseData] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrderDemand, setSortOrderDemand] = useState('');
  const [sortOrderScarcity, setSortOrderScarcity] = useState('');
  const [error, setError] = useState(false);
  const [invalidSearch, setInvalidSearch] = useState(null);

  const changeGenre = e => {
    setGenre(e.target.value);
    getNewData();
  };

  const changeFormat = e => {
    setFormat(e.target.value);
    getNewData();
  };

  const changeCountry = e => {
    setCountry(e.target.value);
    getNewData();
  };

  function titleSearch(title) {
    if (title) {
      setTitle(title);
      getNewData();
    } else {
      setInvalidSearch(true);
    }
  }

  function buildQuery() {
    let query = '';
    if (genre && genre !== '--') {
      query += `genre=${genre},`;
    }
    if (format && format !== '--') {
      query += `format=${format},`;
    }
    if (country && country !== '--') {
      query += `country=${country},`;
    }
    if (title) {
      query += `title=${title}`;
    }
    return query;
  }

  function getNewData() {
    const query = buildQuery();
    getDiscogsData(
      data => {
        if (data === 'error') {
          setError(true);
          return;
        }
        const processedData = processData(data.results);
        setOriginalData(data.results);
        setReleaseData(processedData);
        setPagination(data.pagination);
      },
      query,
      currentPage
    );
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
      setCurrentPage((currentPage -= 1));
      getNewData();
    }
  }

  function nextResults() {
    if (currentPage < pagination.pages) {
      setCurrentPage((currentPage += 1));
      getNewData();
    }
  }

  // componentDidMount
  useEffect(() => {
    getNewData();
  });

  return (
    <>
      {error === true ? (
        <h2>No data. Bad connection</h2>
      ) : (
        <>
          <FilterWrapper>
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
          </FilterWrapper>
          <FilterWrapper>
            <h2>Search</h2>
            <Label text="Title" forVal="titleSearch" />
            <Search id="search" changeCB={titleSearch} />
            {invalidSearch === true ? <p>Bad character</p> : null}
          </FilterWrapper>
          <ResultsWrapper>
            {releaseData && releaseData.length > 0 ? (
              <>
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
                />
              </>
            ) : (
              <h2>No results</h2>
            )}
          </ResultsWrapper>
        </>
      )}
    </>
  );
};

export default useFilter;
