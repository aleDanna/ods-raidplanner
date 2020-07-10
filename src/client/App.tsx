import * as React from 'react';
import {BrowserRouter, withRouter} from 'react-router-dom';

import StandardRoutes from '@shared/StandardRoutes';
import DefaultRoutes from '@shared/DefaultRoutes';

import {NavBar} from "@shared/components/NavBar/NavBar";
import sessionStorageService from "@shared/services/sessionStorageService";

export default (
    <>
        <BrowserRouter forceRefresh={true}>
            <NavBar />
            {sessionStorageService.get("loggedUser") &&
            <StandardRoutes />
            }
            {!sessionStorageService.get("loggedUser") &&
            <DefaultRoutes />
            }
        </BrowserRouter>
    </>
);
