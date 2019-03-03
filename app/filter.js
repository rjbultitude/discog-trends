import React from 'react';

class Filter extends React.Component {
  constructor(props) {
    super();
    this.state;
  }

  componentDidMount() {
    getDiscogsData((data) => {
      console.log(data);
      this.setState({discogsData: data});
    });
  }

  createOptions() {
    return this.state.discogsData.map((item, i) => {
      return React.createElement('option', {key: `opt-${i}`}, item);
    });
  }

  render() {
    return (
      React.createElement('select', {}, this.createOptions)
    );
  }
}
