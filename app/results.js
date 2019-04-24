import React from 'react';
import PropTypes from 'prop-types';

// Could be a functional component
export default class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  createTitleLinks(title, url) {
    return (
      <a href={`${url}`} target="_blank">
        {title}
      </a>
    );
  }

  createCells() {
    return this.props.discogsData.map((item, i) => {
      return (
        <tr key={`li-${i}`}>
          {React.createElement('td', {}, this.createTitleLinks(item.title, item.url))}
          {React.createElement('td', {}, item.demand)}
        </tr>
      );
    });
  }

  createHeaders() {
    const keys = Object.keys(this.props.discogsData[0]);
    return (
      <tr>
        {keys.map((key) => {
          if (key !== 'url') {
            return React.createElement('th', {key}, key);
          }
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
      return (
        <React.Fragment>
          {this.props.discogsData && Array.isArray(this.props.discogsData) ?
            this.createTable()
            : React.createElement('h2', {}, 'Loading...')}
        </React.Fragment>
      );
  }
}

Results.propTypes = {
  discogsData: PropTypes.arrayOf(PropTypes.instanceOf(Object)).isRequired,
};
