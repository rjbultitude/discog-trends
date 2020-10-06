import React from 'react';
import ReactDOM from 'react-dom';
import { createGlobalStyle } from 'styled-components';
import Filter from './components/filter/filter';

const GlobalStyle = createGlobalStyle`
  html {
    font-size: 1em;
  }

  body {
    font-family: 'Franklin Gothic', sans-serif;
  }

  #root {
    max-width: 1024px;
    margin: 0 auto;
  }

  h1 {
    font-weight: 200;
    font-size: 2.2rem;
    margin: 0;
  }

  h1, h2 {
    font-family: 'Saira Extra Condensed', sans-serif;
    font-weight: 200;
  }

  h2 {
    font-size: 2rem;
    line-height: 2rem;
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
      <p>
        What&lsquo;s hot and what&lsquo;s not in the physical music marketplace
      </p>
      <Filter />
    </>
  );
};

const root = document.getElementById('root');
ReactDOM.render(<App />, root);
