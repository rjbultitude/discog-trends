import React from 'react';
import ReactDOM from 'react-dom';
import { createGlobalStyle } from 'styled-components';
import Filter from './components/filter/filter';

const GlobalStyle = createGlobalStyle`
  html {
    @import url('https://fonts.googleapis.com/css?family=Saira+Extra+Condensed');

    font-size: 1em;
  }

  body {
    font-family: 'Franklin Gothic', sans-serif;
  }

  #root {
    max-width: 920px;
    margin: 0 auto;
  }

  h1 {
    font-family: 'Saira Extra Condensed', sans-serif;
    text-transform: uppercase;
    font-weight: normal;
    font-size: 2.2rem;
  }

  h2 {
    font-weight: 200;
  }

  select,
  option,
  input {
    font-size: 1rem;
  }
`;

const App = () => {
  return (
    <>
      <GlobalStyle />
      <h1>Discogs Trends</h1>
      <Filter />
    </>
  );
};

const root = document.getElementById('root');
ReactDOM.render(<App />, root);
