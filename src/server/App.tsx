import * as React from 'react';
import { StaticRouter } from 'react-router-dom';

import StandardRoutes from '@shared/StandardRoutes';
import DefaultRoutes from '@shared/DefaultRoutes';

interface Props {
  url: string;
  routerContext: Object;
  modules: string[];
}

export function App({ url, routerContext, modules }: Props) {
  return (
    <StaticRouter location={url} context={routerContext}>
      <StandardRoutes />
      <DefaultRoutes />
    </StaticRouter>
  );
}
