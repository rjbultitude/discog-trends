import React from 'react';
import PropTypes from 'prop-types';

// Styles
import styled from 'styled-components';
import { colours } from '../../utils/theme';

const TableRow = styled.tr`
  padding: 6px;
  background-color: ${colours.paleBlue};
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
  let catno;
  let releaseURL;
  const hasCatNoProperty = Object.prototype.hasOwnProperty.call(
    release,
    'catno'
  );
  if (hasCatNoProperty) {
    catNo = release.catno.replace(/\s/g, '');
    uKey = catno;
  } else {
    releaseURL = release.url.split('http://www.discogs.com/')[1];
    uKey = releaseURL;
  }
  return uKey;
}

function createCells(discogsData) {
  return discogsData.map(item => {
    const uKey = getKeyFromRelease(item);
    return (
      <tr key={`li-${uKey}`}>
        {React.createElement('td', {}, createTitleLinks(item.title, item.url))}
        {React.createElement('td', {}, item.demand)}
      </tr>
    );
  });
}

function createHeaders(discogsData) {
  const keys = Object.keys(discogsData[0]);
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

function createTable(discogsData) {
  return (
    <>
      {React.createElement('thead', {}, createHeaders(discogsData))}
      {React.createElement('tbody', {}, createCells(discogsData))}
    </>
  );
}

export default props => {
  const { discogsData } = props;
  console.log('props', props);
  console.log('discogsData', discogsData);
  return (
    <Results>
      {discogsData && Array.isArray(discogsData)
        ? createTable(discogsData)
        : React.createElement('h2', {}, 'Loading...')}
    </Results>
  );
};

Results.propTypes = {
  discogsData: PropTypes.arrayOf(PropTypes.instanceOf(Object)),
};
