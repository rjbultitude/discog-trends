import React from 'react';
import PropTypes from 'prop-types';

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
  color: white;
`;

const Results = styled.table`
  margin: 0;
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
        {React.createElement('td', {}, item.demand)}
      </TableRow>
    );
  });
}

function createHeaders(data) {
  const keys = Object.keys(data[0]);
  return (
    <tr>
      {keys.map(key => {
        if (key !== 'url') {
          return React.createElement('th', { key }, key);
        }
        return false;
      })}
    </tr>
  );
}

function createTable(data) {
  return (
    <Results>
      {React.createElement('thead', {}, createHeaders(data))}
      {React.createElement('tbody', {}, createCells(data))}
    </Results>
  );
}

export default props => {
  const { releaseData } = props;
  return (
    <ResultsWrapper>
      {releaseData && Array.isArray(releaseData)
        ? createTable(releaseData)
        : React.createElement('h2', {}, 'Loading...')}
    </ResultsWrapper>
  );
};

Results.propTypes = {
  releaseData: PropTypes.arrayOf(PropTypes.instanceOf(Object)),
};
