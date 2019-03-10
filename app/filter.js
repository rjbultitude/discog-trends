import React from 'react';
import ReactDOM from 'react-dom';
import {getDiscogsData} from './getdata.js';
import Results from './results.js';

const formats = ['Cassette', 'Vinyl', 'CD'];

export default class Filter extends React.Component {
  constructor(props) {
    super();
    this.state = {};
  }

  componentDidMount() {
    getDiscogsData((data) => {
      this.setState({discogsData: data});
    });
  }

  createOptions() {
    return formats.map((item, i) => {
      return React.createElement('option', {key: `opt-${i}`}, item);
    });
  }

  createFilter() {
    return React.createElement('select', {}, this.createOptions())
  }

  render() {
    return (
      <div className="filter-wrapper">
        {React.createElement('div', {}, this.createFilter())}
        {this.state.discogsData ?
          <Results discogsData={this.state.discogsData} />
          : null}
      </div>
    );
  }
}
