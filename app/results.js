import React from 'react';

export default class Results extends React.Component {
  constructor(props) {
    super();
    this.state = {};
    console.log('results props', this.props);
  }

  componentDidMount() {
    this.setState({discogsData: this.props.discogsData});
  }

  createList() {
    return this.state.discogsData.map((item, i) => {
      return React.createElement('li', {key: `li-${i}`}, item);
    });
  }

  render() {
      return (
        <div className="results-wrapper">
          {this.state.discogsData ?
            React.createElement('ul', {}, this.createList())
            : React.createElement('h2', {}, 'Loading...')}
        </div>
      );
  }
}
