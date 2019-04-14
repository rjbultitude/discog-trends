import React from 'react';
import ReactDOM from 'react-dom';
import {getDiscogsData} from './getdata.js';
import {filterData, getCassettes, getVinyl, getCD, getDemand} from './filter-funcs.js';
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
      this.setState({discogsData: [], originalData: data});
    });
  }

  updateFilterFormat(formatString) {
    if (formatString === CASS_STRING) {
      return filterData(this.state.originalData, getCassettes, getDemand);
    } else if (formatString === VINYL_STRING) {
      return filterData(this.state.originalData, getVinyl, getDemand);
    } else if (formatString === CD_STRING) {
      return filterData(this.state.originalData, getCD, getDemand);
    } else {
      return [];
    }
  }

  change(event) {
    let newData = this.updateFilterFormat(event.target.value);
    console.log('newData', newData);
    this.setState({discogsData: newData});
  }

  createOptions() {
    return formats.map((item, i) => {
      return React.createElement('option', {key: `opt-${i}`}, item);
    });
  }

  render() {
    return (
      <div className="filter-wrapper">
        {React.createElement('label', {}, 'Format')}
        {React.createElement('select', {onChange: (e) => {this.change(e)}}, this.createOptions())}
        {this.state.discogsData && this.state.discogsData.length > 0 ?
          <Results discogsData={this.state.discogsData} />
          : null}
      </div>
    );
  }
}
