import React from 'react';
import ReactDOM from 'react-dom';
import {getDiscogsData} from './getdata.js';

class List extends React.Component {
  constructor(props) {
    super();
    this.state = {discogsData: null};
  }

  componentDidMount() {
    getDiscogsData((data) => {
      console.log(data);
      this.setState({discogsData: data});
    });
  }

  createList() {
    return this.state.discogsData.map((item, i) => {
      return React.createElement('li', {key: `li-${i}`}, item);
    });
  }

  render() {
    if (this.state.discogsData) {
      return (
        React.createElement('ul', {}, this.createList())
      );
    } else {
      return (
        React.createElement('h2', {}, 'Loading...')
      );
    }
  }
}

const root = document.getElementById('root');
ReactDOM.render(<List />, root);

