import React from 'react';
// Styles
import styled from 'styled-components';
import getDiscogsData from '../../utils/getdata';
import Results from './results';
import { processData } from '../../utils/filter-funcs';
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
      originalData: [],
      releaseData: [],
      pagination: null,
      genre: '',
      format: '',
      country: '',
    };
    this.changeGenre = this.changeGenre.bind(this);
    this.changeFormat = this.changeFormat.bind(this);
    this.changeCountry = this.changeCountry.bind(this);
    this.prevResults = this.prevResults.bind(this);
    this.nextResults = this.nextResults.bind(this);
    this.page = 1;
  }

  componentDidMount() {
    this.getNewData();
  }

  buildQuery() {
    const { genre, format, country } = this.state;
    let query = '';
    if (genre && genre !== '--') {
      query += `genre=${genre},`;
    }
    if (format && format !== '--') {
      query += `format=${format},`;
    }
    if (country && country !== '--') {
      query += `country=${country},`;
    }
    return query;
  }

  getNewData() {
    const query = this.buildQuery();
    getDiscogsData(
      data => {
        const processedData = processData(data.results);
        this.setState({
          originalData: data.results,
          releaseData: processedData,
          pagination: data.pagination,
        });
        console.log('state after req', this.state);
      },
      query,
      this.page
    );
  }

  changeGenre(e) {
    this.setState({ genre: e.target.value }, () => {
      this.getNewData();
    });
  }

  changeFormat(e) {
    this.setState({ format: e.target.value }, () => {
      this.getNewData();
    });
  }

  changeCountry(e) {
    this.setState({ country: e.target.value }, () => {
      this.getNewData();
    });
  }

  prevResults() {
    if (this.page > 1) {
      this.page -= 1;
      this.getNewData();
    }
  }

  nextResults() {
    const { pagination } = this.state;
    if (this.page < pagination.pages) {
      this.page += 1;
      this.getNewData();
    }
  }

  render() {
    const { releaseData } = this.state;
    const { pagination } = this.state;
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
        <FilterField>
          <Label text="Country" forVal={appConstants.COUNTRIES_STR} />
          <Select
            selectOptions={appConstants.COUNTRIES}
            changeCB={this.changeCountry}
            id={appConstants.COUNTRIES_STR}
          />
        </FilterField>
        {releaseData && releaseData.length > 0 ? (
          <>
            <Results releaseData={releaseData} />
            <Pagination
              prevResults={this.prevResults}
              nextResults={this.nextResults}
              prevDisabled={this.page === 1}
              nextDisabled={this.page === pagination.pages}
            />
          </>
        ) : (
          <h2>No results</h2>
        )}
      </FilterWrapper>
    );
  }
}
