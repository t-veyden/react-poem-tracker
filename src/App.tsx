// @ts-nocheck
import React from 'react';
import {Route, Switch} from 'react-router-dom';

import HomeView from './views/home';
import Purgatory from './views/purgatory';

import {poems} from './temp-data';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path={'/'} component={HomeView}/>
        <Route
          exact
          path={'/purgatory'}
          render={(props) => <Purgatory {...props} data={poems}/>}
        />
      </Switch>
    </div>
  );
}

export default App;
