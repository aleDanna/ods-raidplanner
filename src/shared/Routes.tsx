import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import './styles/base.css';
import {RaidsPage} from "@shared/pages/RaidsPage";

function Loading() {
    return <h3>Loading...</h3>;
}

function RouteCollection() {

  return (
    <Switch>
        <Route exact path="/rp/raids/:mode" component={RaidsPage} />
    </Switch>
  );
}

export default RouteCollection;
