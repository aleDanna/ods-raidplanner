import * as React from 'react';
import {BrowserRouter, withRouter} from 'react-router-dom';

import StandardRoutes from '@shared/StandardRoutes';
import DefaultRoutes from '@shared/DefaultRoutes';
import AdminRoutes from '@shared/AdminRoutes';

import {NavBar} from "@shared/components/NavBar/NavBar";
import sessionStorageService from "@shared/services/sessionStorageService";

const userData = sessionStorageService.get("loggedUser");
export default (
    <>
        <BrowserRouter forceRefresh={true}>
            <NavBar />
            {userData &&
            <>
                <StandardRoutes />
                {userData.role === "ADMIN" &&
                    <AdminRoutes />
                }
            </>
            }

            {!userData &&
            <DefaultRoutes />
            }
        </BrowserRouter>
    </>
);
