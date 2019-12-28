import React from 'react';
// Styles
import styled from 'styled-components';
import getDiscogsData from '../../utils/getdata';
import {
  filterData,
  getCassettes,
  getVinyl,
  getCD,
} from '../../utils/filter-funcs';
import Results from './results';

import { padding } from '../../utils/theme';
// Components
import Label from '../label/label';
import Select from '../select/select';
import Pagination from '../pagination/pagination';
import * as appConstants from '../../utils/constants';

const FilterWrapper = styled.div`
  padding: ${padding};
`;
const FilterField = styled.div`
  padding: ${padding};
`;

export default class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      discogsData: [],
      originalData: [],
      genre: '',
      format: '',
      pages: null,
    };
    this.changeGenre = this.changeGenre.bind(this);
    this.changeFormat = this.changeFormat.bind(this);
    this.change = this.change.bind(this);
    this.prevResults = this.prevResults.bind(this);
    this.nextResults = this.prevResults.bind(this);
    this.page = 0;
  }

  componentDidMount() {
    const startingPage = 1;
    getDiscogsData(data => {
      this.setState({ originalData: data });
    }, startingPage);
  }

  updateFilter() {
    const { format, originalData, genre } = this.state;
    if (format === appConstants.CASS_STRING) {
      return filterData(originalData, genre, getCassettes);
    }
    if (format === appConstants.VINYL_STRING) {
      return filterData(originalData, genre, getVinyl);
    }
    if (format === appConstants.CD_STRING) {
      return filterData(originalData, genre, getCD);
    }
    return [];
  }

  change() {
    const newData = this.updateFilter();
    console.log('newData', newData);
    this.setState({ discogsData: newData });
  }

  changeGenre(e) {
    this.setState({ genre: e.target.value }, () => {
      this.change();
    });
  }

  changeFormat(e) {
    this.setState({ format: e.target.value }, () => {
      this.change();
    });
  }

  prevResults() {
    if (this.page < this.pagination.pages) {
      this.page += 1;
      getDiscogsData(data => {
        this.setState({ originalData: data });
      }, this.page);
      this.change();
    }
  }

  nextResults() {
    if (this.page > 0) {
      this.page -= 1;
      getDiscogsData(data => {
        this.setState({ originalData: data });
      }, this.page);
    }
  }

  render() {
    const { discogsData } = this.state;
    return (
      <FilterWrapper>
        <FilterField>
          <h2>Filter</h2>
          <Label text="Genre" forVal={appConstants.GENRES_STR} />
          <Select
            selectOptions={appConstants.GENRES}
            changeCB={this.changeGenre}
            id={appConstants.GENRES_STR}
          />
        </FilterField>
        <FilterField>
          <Label text="Format" forVal={appConstants.FORMATS_STR} />
          <Select
            selectOptions={appConstants.FORMATS}
            changeCB={this.changeFormat}
            id={appConstants.FORMATS_STR}
          />
        </FilterField>
        {discogsData && discogsData.length > 0 ? (
          <>
            <Results discogsData={discogsData} />
            <Pagination
              prevResults={this.prevResults}
              nextResults={this.nextResults}
            />
          </>
        ) : null}
      </FilterWrapper>
    );
  }
}
