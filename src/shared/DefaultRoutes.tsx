import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import './styles/base.css';
import {RaidsPage} from "@shared/pages/RaidsPage";
import {LoginPage} from "@shared/pages/LoginPage";
import {ScheduleEventPage} from "@shared/pages/ScheduleEventPage";
import {RaidPage} from "@shared/pages/RaidPage";
import {UserProfilePage} from "@shared/pages/UserProfilePage";
import {CharactersPage} from "@shared/pages/CharactersPage";
import {EventSearchPage} from "@shared/pages/EventSearchPage";
import {HomePage} from "@shared/pages/HomePage";
import {SignUpPage} from "@shared/pages/SignUpPage";

function RouteCollection() {

  return (
    <Switch>
        <Route exact path="/rp/login" component={LoginPage} />
        <Route exact path="/rp/signup" component={SignUpPage} />
    </Switch>
  );
}

export default RouteCollection;
