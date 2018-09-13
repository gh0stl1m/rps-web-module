// External libraries
import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// Components
import MainPage from './components/MainPage';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" component={MainPage}/>
        </Switch>
      </BrowserRouter>
    );
  };
};

export default App;
