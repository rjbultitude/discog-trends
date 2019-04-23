import React from 'react';
import ReactDOM from 'react-dom';
import {getDiscogsData} from './getdata.js';
import {filterData, getCassettes, getVinyl, getCD, getDemand} from './filter-funcs.js';
import Results from './results.js';

const CASS_STRING = 'Cassette';
const VINYL_STRING = 'Vinyl';
const CD_STRING = 'CD';
const FORMATS = ['--', CASS_STRING, VINYL_STRING, CD_STRING];
const GENRES = ['--', 'Electronic', 'Jazz', 'Stage & Screen', 'Rock', 'Funk / Soul', 'Pop'];

export default class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      discogsData: [],
      originalData: [],
      genre: '',
      format: ''
    };
    this.changeGenre = this.changeGenre.bind(this);
    this.changeFormat = this.changeFormat.bind(this);
  }

  componentDidMount() {
    getDiscogsData((data) => {
      this.setState({originalData: data});
      console.log(this.state)
    });
  }

  updateFilter(genreString, formatString) {
    if (formatString === CASS_STRING) {
      return filterData(this.state.originalData, genreString, getCassettes, getDemand);
    } else if (formatString === VINYL_STRING) {
      return filterData(this.state.originalData, genreString, getVinyl, getDemand);
    } else if (formatString === CD_STRING) {
      return filterData(this.state.originalData, genreString, getCD, getDemand);
    } else {
      return [];
    }
  }

  change() {
    let newData = this.updateFilter(this.state.genre, this.state.format);
    console.log('newData', newData);
    this.setState({discogsData: newData});
  }

  changeGenre(e) {
    this.setState({'genre': e.target.value});
    console.log('this.state', this.state);
    this.change();
  }

  changeFormat(e) {
    this.setState({'format': e.target.value});
    console.log('this.state', this.state);
    this.change();
  }

  createOptions(optionsArr) {
    return optionsArr.map((item, i) => {
      return React.createElement('option', {key: `opt-${i}`}, item);
    });
  }

  render() {
    return (
      <React.Fragment>
        {React.createElement('label', {}, 'Genre')}
        {React.createElement('select', {
          onChange: (e) => {
            this.changeGenre(e);
          }
        }, this.createOptions(GENRES))}
        {React.createElement('label', {}, 'Format')}
        {React.createElement('select', {
          onChange: (e) => {
            this.changeFormat(e);
          }
        }, this.createOptions(FORMATS))}
        {this.state.discogsData && this.state.discogsData.length > 0 ?
          <Results discogsData={this.state.discogsData} />
          : null}
      </React.Fragment>
    );
  }
}
