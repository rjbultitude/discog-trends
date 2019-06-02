import React from 'react';
import {getDiscogsData} from '../../utils/getdata.js';
import {filterData, getCassettes, getVinyl, getCD, getDemand} from '../../utils/filter-funcs.js';
import Results from './results.js';
// Styles
import styled from 'styled-components';
import {colours, padding} from '../../utils/theme.js';
// Components
import Label from '../label/label.js';
import Select from '../select/select.js';
import * as appConstants from '../../utils/constants.js';

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
    if (this.state.format === appConstants.CASS_STRING) {
      return filterData(this.state.originalData, this.state.genre, getCassettes, getDemand);
    } else if (this.state.format === appConstants.VINYL_STRING) {
      return filterData(this.state.originalData, this.state.genre, getVinyl, getDemand);
    } else if (this.state.format === appConstants.CD_STRING) {
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

  render() {
    return (
      <FilterWrapper>
        <FilterField>
          <Label text='Genre' forVal={appConstants.GENRES_STR} />
          <Select selectOptions={appConstants.GENRES} changeCB={this.changeGenre} id={appConstants.GENRES_STR} />
        </FilterField>
        <FilterField>
          <Label text='Format' forVal={appConstants.FORMATS_STR} />
          <Select selectOptions={appConstants.FORMATS} changeCB={this.changeFormat} id={appConstants.FORMATS_STR} />
          </FilterField>
          {this.state.discogsData && this.state.discogsData.length > 0 ?
            <Results discogsData={this.state.discogsData} />
            : null}
      </FilterWrapper>
    );
  }
}
