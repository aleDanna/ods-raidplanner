import * as React from 'react';
import {Route, Switch} from 'react-router-dom';

import './styles/base.css';
import {ScheduleEventPage} from "@shared/pages/ScheduleEventPage";
import {EventSearchPage} from "@shared/pages/EventSearchPage";
import {EditUserPage} from "@shared/pages/EditUserPage";

function RouteCollection() {

  return (
    <Switch>
        <Route exact path="/rp/admin/raids" component={EventSearchPage} />
        <Route exact path="/rp/admin/schedule" component={ScheduleEventPage} />
        <Route exact path="/rp/admin/editUser" component={EditUserPage} />
    </Switch>
  );
}

export default RouteCollection;
