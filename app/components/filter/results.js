import React from 'react';
import PropTypes from 'prop-types';

// Could be a functional component
export default class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.title;
    this.url;
  }

  createTitleLinks() {
    return (
      <a href={`${this.url}`} target="_blank" rel="noopener noreferrer">
        {this.title}
      </a>
    );
  }

  createCells() {
    const { discogsData } = this.props;
    return discogsData.map((item, i) => {
      this.title = item.title;
      this.url = item.url;
      return (
        <tr key={`li-${i}`}>
          {React.createElement('td', {}, this.createTitleLinks())}
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
