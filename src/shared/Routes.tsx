import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import './styles/base.css';
import {RaidsPage} from "@shared/pages/RaidsPage";
import {LoginPage} from "@shared/pages/LoginPage";
import {ScheduleEventPage} from "@shared/pages/ScheduleEventPage";
import {RaidPage} from "@shared/pages/RaidPage";

function RouteCollection() {

  return (
    <Switch>
        <Route exact path="/rp/raids/:mode" component={RaidsPage} />
        <Route exact path="/rp/raid/:raidId" component={RaidPage} />
        <Route exact path="/rp/login" component={LoginPage} />
        <Route exact path="/rp/admin/schedule" component={ScheduleEventPage} />
    </Switch>
  );
}

export default RouteCollection;
