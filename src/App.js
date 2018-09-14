// External libraries
import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// Components
import MainPage from './components/MainPage';
import SetupGame from './components/SetupGame';
import UserStatistics from './components/UserStatistics';
import GamePlay from './components/GamePlay';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/game/:roomId/player/:playerId" component={GamePlay}/>
          <Route path="/user/:userId/statistics" component={UserStatistics}/>
          <Route path="/game/setup" component={SetupGame}/>
          <Route path="/" component={MainPage}/>
        </Switch>
      </BrowserRouter>
    );
  };
};

export default App;
