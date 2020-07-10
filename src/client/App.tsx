import * as React from 'react';
import {BrowserRouter, withRouter} from 'react-router-dom';

import Routes from '@shared/Routes';
import {NavBar} from "@shared/components/NavBar/NavBar";
import sessionStorageService from "@shared/services/sessionStorageService";
import {Login} from "@shared/components/Login/Login";
import {LoginPage} from "@shared/pages/LoginPage";

const DefaultLogin = withRouter(LoginPage);

export default (
    <>
        <BrowserRouter forceRefresh={true}>
            <NavBar />
            {sessionStorageService.get("loggedUser") &&
                <Routes />
            }
            {!sessionStorageService.get("loggedUser") &&
                <DefaultLogin />
            }
        </BrowserRouter>
    </>
);
