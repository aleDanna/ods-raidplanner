import * as React from 'react';
import {BrowserRouter} from 'react-router-dom';

import Routes from '@shared/Routes';
import {NavBar} from "@shared/components/NavBar/NavBar";
import sessionStorageService from "@shared/services/sessionStorageService";
import {Login} from "@shared/components/Login/Login";
import createHistory from 'history/createBrowserHistory';

export default (
    <>
        <BrowserRouter forceRefresh={true}>
            <NavBar />
            {sessionStorageService.get("loggedUser") &&
                <Routes />
            }
            {!sessionStorageService.get("loggedUser") &&
                <Login history={createHistory()}/>
            }
        </BrowserRouter>
    </>
);
