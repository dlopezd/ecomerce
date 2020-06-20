import React, { useContext } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom'

import NavBar from './NavBar'
import SearchResult from './SearchResult';

const App = _ => {

  return (
    <>
      <NavBar />
      <Switch>
        <Route exact path='/' component={SearchResult} />
      </Switch>
    </>
  );
}

export default withRouter(App);
