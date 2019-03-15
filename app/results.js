import React from 'react';

export default class Results extends React.Component {
  constructor(props) {
    super();
    this.state = {};
  }

  createCells() {
    return this.props.discogsData.map((item, i) => {
      return (
        <tr key={`li-${i}`}>
          {React.createElement('td', {}, item.title)}
          {React.createElement('td', {}, item.demand)}
        </tr>
      );
    });
  }

  createHeaders() {
    const keys = Object.keys(this.props.discogsData[0]);
    console.log('keys', keys);
    return keys.map((key) => {
      return React.createElement('th', {key}, key);
    });
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
        <div className="results-wrapper">
          {this.props.discogsData && Array.isArray(this.props.discogsData) ?
            this.createTable()
            : React.createElement('h2', {}, 'Loading...')}
        </div>
      );
  }
}
