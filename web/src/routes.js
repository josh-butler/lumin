import React from 'react';
import {IndexRoute, Route} from 'react-router';
import {
    App,
    UserSearch,
    Profiles,
    NotFound,
  } from 'containers';

export default () => {
  return (
    <Route path="/" component={App}>
      { /* Home (main) route */ }
      <IndexRoute component={UserSearch}/>

      <Route path="profiles/:query/:page" component={Profiles}/>
      { /* Catch all route */ }
      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
};
