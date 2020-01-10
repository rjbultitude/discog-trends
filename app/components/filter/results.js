import React from 'react';
import PropTypes from 'prop-types';

// Components
import Sort from '../sort/sort';

// Styles
import styled from 'styled-components';
import { colours } from '../../utils/theme';

const TableRow = styled.tr`
  padding: 6px;
  background-color: ${colours.paleBlue};

  &:nth-child(odd) {
    background-color: ${colours.palePink};
  }

  a {
    color: ${colours.deepPurple};
  }

  a:hover,
  a:active,
  a:focus {
    text-decoration: none;
  }
`;

const ResultsWrapper = styled.div`
  background-color: ${colours.warn};

  h2 {
    color: white;
  }
`;

const Results = styled.table`
  margin: 0;
  width: 100%;

  th {
    text-transform: capitalize;
    padding: 1rem;
  }
`;

function createTitleLinks(title, url) {
  return (
    <a href={`${url}`} target="_blank" rel="noopener noreferrer">
      {title}
    </a>
  );
}

function getKeyFromRelease(release) {
  let uKey;
  let catNo;
  const hasCatNoProperty = Object.prototype.hasOwnProperty.call(
    release,
    'catno'
  );
  if (hasCatNoProperty) {
    catNo = release.catno.replace(/\s/g, '');
    uKey = catNo;
  } else {
    const [, releaseURL] = release.url.split('http://www.discogs.com/');
    uKey = releaseURL;
  }
  return uKey;
}

function createCells(data) {
  return data.map(item => {
    const uKey = getKeyFromRelease(item);
    return (
      <TableRow key={`li-${uKey}`}>
        {React.createElement('td', {}, createTitleLinks(item.title, item.url))}
        {React.createElement('td', {}, item.demand.text)}
        {React.createElement('td', {}, item.scarcity.text)}
      </TableRow>
    );
  });
}

function createHeaderContent(key, props) {
  const {
    toggleDemandCB,
    demandOrder,
    toggleScarcityCB,
    scarcityOrder,
  } = props;
  if (key === 'title') {
    return key;
  }
  return (
    <>
      <span>{key}</span>
      {key === 'demand' ? (
        <Sort
          name="demand"
          toggleCB={toggleDemandCB}
          currentOrder={demandOrder}
        />
      ) : (
        <Sort
          name="scarcity"
          toggleCB={toggleScarcityCB}
          currentOrder={scarcityOrder}
        />
      )}
    </>
  );
}

function createHeaders(props) {
  const { releaseData } = props;
  const keys = Object.keys(releaseData[0]);
  return (
    <tr>
      {keys.map(key => {
        if (key !== 'url') {
          return React.createElement(
            'th',
            { key },
            createHeaderContent(key, props)
          );
        }
        return false;
      })}
    </tr>
  );
}

function createTable(props) {
  const { releaseData } = props;
  return (
    <Results>
      {React.createElement('thead', {}, createHeaders(props))}
      {React.createElement('tbody', {}, createCells(releaseData))}
    </Results>
  );
}

export default props => {
  const { releaseData } = props;
  return (
    <ResultsWrapper>
      {releaseData && Array.isArray(releaseData)
        ? createTable(props)
        : React.createElement('h2', {}, 'Loading...')}
    </ResultsWrapper>
  );
};

Results.propTypes = {
  releaseData: PropTypes.arrayOf(PropTypes.instanceOf(Object)),
};
