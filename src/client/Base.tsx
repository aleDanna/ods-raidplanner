import * as React from 'react';
import {BrowserRouter} from 'react-router-dom';

import Routes from '@shared/Routes';
import {NavBar} from "@shared/components/NavBar/NavBar";

export default (
    <>
        <BrowserRouter forceRefresh={true}>
            <NavBar />
            <Routes />
        </BrowserRouter>
    </>
);
