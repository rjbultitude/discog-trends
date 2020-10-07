import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// Components
import Sort from '../sort/sort';
import * as appConstants from '../../utils/constants';

// Styles
import { colours, padding, typography } from '../../utils/theme';

const TableHeader = styled.th`
  padding: 1rem;
  text-align: left;
  text-transform: capitalize;
  vertical-align: top;

  .table__header__text {
    font-weight: 200;
    font-size: ${typography.titleSize};
    font-family: 'Saira Extra Condensed', sans-serif;
    line-height: 2rem;
  }
`;

const TableRow = styled.tr`
  padding: ${padding.tight};
  background-color: ${colours.veryLightGrey};

  &:nth-child(odd) {
    background-color: ${colours.white};
  }

  a {
    color: black;
    text-decoration: none;
  }

  a:hover,
  a:active,
  a:focus {
    text-decoration: none;
  }

  td {
    padding: ${padding.normal} ${padding.tight};
  }
`;

const ResultsWrapper = styled.div`
  background-color: ${colours.lightGreyAlpha};
`;

const Results = styled.table`
  margin: 0;
  width: 100%;

  button {
    border: 0 none;
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

function createRankedDataChildren(item) {
  const { rank } = item;
  const itemColour = colours.rank[rank - 1] || '';
  const divStyle = {
    backgroundColor: itemColour,
  };
  return (
    <>
      {item.text}
      <div style={divStyle} />
    </>
  );
}

function createCells(data) {
  return data.map((item) => {
    const uKey = getKeyFromRelease(item);
    return (
      <TableRow key={`li-${uKey}`}>
        {React.createElement('td', {}, createTitleLinks(item.title, item.url))}
        {React.createElement('td', {}, createRankedDataChildren(item.demand))}
        {React.createElement('td', {}, createRankedDataChildren(item.scarcity))}
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
    return <span className="table__header__text">{key}</span>;
  }
  return (
    <>
      <span className="table__header__text">{key}</span>
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
      {keys.map((key) => {
        if (key !== 'url') {
          return (
            <TableHeader key={key}>
              {createHeaderContent(key, props)}
            </TableHeader>
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

export default (props) => {
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
