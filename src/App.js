import './App.css';
import Main from './Project4/Main'

import React, { Component } from 'react';


class App extends Component {
  // eslint-disable-next-line
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className= "App">
          <Main/>
        </div>
    );
  }
}

export default App;
