import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import './styles/base.css';

import {RaidsPage} from "@shared/pages/RaidsPage";


function RouteCollection() {

  return (
    <Switch>
        <Route exact path="/raids/:mode" component={RaidsPage} />
    </Switch>
  );
}

export default RouteCollection;
