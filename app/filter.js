import React from 'react';
import ReactDOM from 'react-dom';
import {getDiscogsData} from './getdata.js';
import {filterData, getCassettes, getVinyl, getCD, getDemand} from './filter-funcs.js';
import Results from './results.js';
// Styles
import styled from 'styled-components';
import {colours, padding} from './theme.js';
// Components
import Label from './components/label.js';

// Constants
const CASS_STRING = 'Cassette';
const VINYL_STRING = 'Vinyl';
const CD_STRING = 'CD';
const FORMATS = ['--', CASS_STRING, VINYL_STRING, CD_STRING];
const GENRES = ['--', 'Electronic', 'Jazz', 'Stage & Screen', 'Rock', 'Funk / Soul', 'Pop'];

const FilterWrapper = styled.div`padding: ${padding}`;
const FilterField = styled.div`padding: ${padding}`;

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
    this.change = this.change.bind(this);
  }

  componentDidMount() {
    getDiscogsData((data) => {
      this.setState({originalData: data});
      console.log(this.state)
    });
  }

  updateFilter() {
    console.log('this.state.format', this.state.format);
    console.log('this.state.genre', this.state.genre);
    if (this.state.format === CASS_STRING) {
      return filterData(this.state.originalData, this.state.genre, getCassettes, getDemand);
    } else if (this.state.format === VINYL_STRING) {
      return filterData(this.state.originalData, this.state.genre, getVinyl, getDemand);
    } else if (this.state.format === CD_STRING) {
      return filterData(this.state.originalData, this.state.genre, getCD, getDemand);
    } else {
      return [];
    }
  }

  change() {
    let newData = this.updateFilter();
    console.log('newData', newData);
    this.setState({discogsData: newData});
  }

  changeGenre(e) {
    this.setState({'genre': e.target.value}, () => {
      console.log('this.state', this.state);
      this.change();
    });
  }

  changeFormat(e) {
    this.setState({'format': e.target.value}, () => {
      console.log('this.state', this.state);
      this.change();
    });
  }

  createOptions(optionsArr) {
    return optionsArr.map((item, i) => {
      return React.createElement('option', {key: `opt-${i}`}, item);
    });
  }

  render() {
    return (
      <FilterWrapper>
        <FilterField>
          <Label text='Genre' />
          {React.createElement('select', {
            onChange: (e) => {
              this.changeGenre(e);
            }
          }, this.createOptions(GENRES))}
        </FilterField>
        <FilterField>
          <Label text='Format' />
          {React.createElement('select', {
            onChange: (e) => {
              this.changeFormat(e);
            }
          }, this.createOptions(FORMATS))}
          </FilterField>
          {this.state.discogsData && this.state.discogsData.length > 0 ?
            <Results discogsData={this.state.discogsData} />
            : null}
      </FilterWrapper>
    );
  }
}