import React from 'react';
import {IndexRoute, Redirect, Route} from 'react-router';
import {
    App,
    Report,
    NotFound,
    Profiles,
    UserSearch,
} from 'containers';

export default () => {
  return (
    <Route path="/" component={App}>
      { /* Home (main) route */ }
      <IndexRoute component={UserSearch}/>
      <Redirect from="/search" to="/" />
      <Route path="profiles/:query/:page" component={Profiles}/>
      <Route path="report" component={Report}/>
      { /* Catch all route */ }
      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
};
