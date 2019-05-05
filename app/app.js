import React from 'react';
import ReactDOM from 'react-dom';
import {getDiscogsData} from './getdata.js';
import Filter from './filter.js';
import {createGlobalStyle} from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html {
    font-size: 0.75em;
  }
  body,
  #root {
    height: 100%;
    width: 100%;
  }
  h1 {
    font-size: 2rem;
  }`

const App = () => {
  return (
    <React.Fragment>
      <GlobalStyle />
      <Filter />
    </React.Fragment>
    );
  };

const root = document.getElementById('root');
ReactDOM.render(<App />, root);
