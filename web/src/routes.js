import React from 'react';
import {IndexRoute, Route} from 'react-router';
import {
    App,
    Home,
    UserSearch,
    NotFound,
  } from 'containers';

export default () => {
  return (
    <Route path="/" component={App}>
      { /* Home (main) route */ }
      <IndexRoute component={Home}/>
      <Route path="search" component={UserSearch}/>
      { /* Catch all route */ }
      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
};
