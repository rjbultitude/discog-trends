import React from 'react';

export default class Results extends React.Component {
  constructor(props) {
    super();
    this.state = {};
  }

  createList() {
    return this.props.discogsData.map((item, i) => {
      return React.createElement('li', {key: `li-${i}`}, item);
    });
  }

  render() {
      return (
        <div className="results-wrapper">
          {this.props.discogsData && Array.isArray(this.props.discogsData) ?
            React.createElement('ul', {}, this.createList())
            : React.createElement('h2', {}, 'Loading...')}
        </div>
      );
  }
}
