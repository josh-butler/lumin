import React from 'react';
import {IndexRoute, Redirect, Route} from 'react-router';
import {
    App,
    Home,
    Report,
    NotFound
} from 'containers';

export default () => {
  return (
    <Route path="/" component={App}>
      { /* Home (main) route */ }
      <IndexRoute component={Home}/>
      <Redirect from="/search" to="/" />
      <Route path="/report/:id" component={Report}/>
      { /* Catch all route */ }
      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
};
