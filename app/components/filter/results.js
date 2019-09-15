import React from 'react';
import PropTypes from 'prop-types';

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

// Could be a functional component
export default class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  createCells() {
    const { discogsData } = this.props;
    return discogsData.map(item => {
      const uKey = getKeyFromRelease(item);
      return (
        <tr key={`li-${uKey}`}>
          {React.createElement(
            'td',
            {},
            createTitleLinks(item.title, item.url)
          )}
          {React.createElement('td', {}, item.demand)}
        </tr>
      );
    });
  }

  createHeaders() {
    const { discogsData } = this.props;
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

  createTable() {
    return (
      <table>
        {React.createElement('thead', {}, this.createHeaders())}
        {React.createElement('tbody', {}, this.createCells())}
      </table>
    );
  }

  render() {
    const { discogsData } = this.props;
    return (
      <>
        {discogsData && Array.isArray(discogsData)
          ? this.createTable()
          : React.createElement('h2', {}, 'Loading...')}
      </>
    );
  }
}

Results.propTypes = {
  discogsData: PropTypes.arrayOf(PropTypes.instanceOf(Object)).isRequired,
};
