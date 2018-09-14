// External libraries
import React, { PureComponent } from 'react';

class GamePlay extends PureComponent {
  constructor(props) {
    super(props);
  }
  // Life cycle methods
  componentDidMount() {
    console.log('MATCH: ', this.props.match);
    console.log('MATCH PARAMS: ', this.props.match.params);
  }
  render() {
    return (
      <div>
        Game play component
      </div>
    );
  };
};

export default GamePlay;
