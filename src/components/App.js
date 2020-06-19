import React, { useContext } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom'


import Content from './list/Content'
import NavBar from './NavBar'

const App = _ => {

  return (
    <>
      <NavBar />
      <Switch>
        <Route exact path='/' component={Content} />
      </Switch>
    </>
  );
}

export default withRouter(App);
