import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Routes from '@shared/Routes';
import {Header} from "@shared/components/Header/Header";
import {Footer} from "@shared/components/Footer/Footer";

export default (
    <>
        <Header />
        <BrowserRouter>
            <Routes />
        </BrowserRouter>
        <Footer />
    </>
);
