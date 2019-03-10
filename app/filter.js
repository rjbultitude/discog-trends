import React from 'react';
import ReactDOM from 'react-dom';
import {getDiscogsData} from './getdata.js';
import {filterData, getCassettes, getVinyl, getCD} from './filter-funcs.js';
import Results from './results.js';

const CASS_STRING = 'Cassette';
const VINYL_STRING = 'Vinyl';
const CD_STRING = 'CD';
const formats = ['--', CASS_STRING, VINYL_STRING, CD_STRING];

export default class Filter extends React.Component {
  constructor(props) {
    super();
    this.state = {};
  }

  componentDidMount() {
    getDiscogsData((data) => {
      //const filteredData = filterData(data, getCassettes);
      this.setState({discogsData: [], originalData: data});
    });
  }

  updateFilter(formatString) {
    if (formatString === CASS_STRING) {
      return filterData(this.state.originalData, getCassettes);
    } else if (formatString === VINYL_STRING) {
      return filterData(this.state.originalData, getVinyl);
    } else if (formatString === CD_STRING) {
      return filterData(this.state.originalData, getCD);
    } else {
      return [];
    }
  }

  change(event) {
    let newData = this.updateFilter(event.target.value);
    console.log('newData', newData);
    this.setState({discogsData: newData});
  }

  createOptions() {
    return formats.map((item, i) => {
      return React.createElement('option', {key: `opt-${i}`}, item);
    });
  }

  createFilter() {
    return React.createElement('select', {onChange: (e) => {this.change(e)}}, this.createOptions())
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
