import * as React from 'react';
import { StaticRouter } from 'react-router-dom';

import Routes from '@shared/Routes';

interface Props {
  url: string;
  routerContext: Object;
  modules: string[];
}

export function App({ url, routerContext, modules }: Props) {
  return (
    <StaticRouter location={url} context={routerContext}>
      <Routes />
    </StaticRouter>
  );
}
