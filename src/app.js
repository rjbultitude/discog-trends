import React from 'react';
import ReactDOM from 'react-dom';
import { createGlobalStyle } from 'styled-components';
import Filter from './components/filter/filter';
import { padding, typography } from './utils/theme';

const GlobalStyle = createGlobalStyle`
  html {
    font-size: 1em;
  }

  body {
    background-image: url('./images/records.jpg');
    background-attachment: fixed;
    background-size: cover;
    font-family: 'Franklin Gothic', sans-serif;
    margin: ${padding};
  }

  div, form, fieldset, span, main, article, section {
    box-sizing: border-box;
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
    font-size: ${typography.titleSize};
    line-height: 2rem;
  }

  .page__header {
    background-color: rgba(255, 255, 255, 0.9);
    padding: ${padding};
    margin-bottom: ${padding};
    display: flex;
  }

  .page__header h1 {
    align-items: center;
    background-color: white;
    display: flex;
    flex-basis: 30%;
    justify-content: space-between;
    padding: 0 ${padding};
  }

  .page__header__icon {
    background-image: url("./images/record.png");
    background-size: contain;
    background-position: center;
    display: inline-block;
    width: 2.5rem;
    height: 2.5rem;
  }

  .page__header__strapline {
    flex-basis: 70%;
    text-align: right;
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
      <header className="page__header">
        <h1>
          <span className="page__header__text">Discogs Trends</span>
          <span className="page__header__icon" />
        </h1>
        <p className="page__header__strapline">
          What&lsquo;s hot and what&lsquo;s not in the physical music
          marketplace
        </p>
      </header>
      <Filter />
    </>
  );
};

const root = document.getElementById('root');
ReactDOM.render(<App />, root);
