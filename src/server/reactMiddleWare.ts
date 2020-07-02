import { NextFunction, Request, Response } from 'express';
import * as React from 'react';
import { renderToNodeStream } from 'react-dom/server';

import { App } from './App';
import { getFooter, getHeader } from './template';

const fePort = process.env.FE_PORT as string;
const isDev = process.env.NODE_ENV !== 'production';

function reactMiddleWare(req: Request, res: Response, next: NextFunction) {
  res.write(getHeader({ isDev, fePort, title: 'ODS Raidplanner' }));

  if (!__ISOMORPHIC__) {
    // If not isomorphic, end the response here and let the
    // client code do its thing
    res.end(
      getFooter({ fePort, scripts: ['client.js'], serverRendered: false })
    );
  } else {
    const routerContext = {};
    const modules: string[] = [];
    const stream = renderToNodeStream(
      React.createElement(App, {
        modules,
        routerContext,
        url: req.url,
      })
    );
    stream.pipe(
      res,
      {
        end: false,
      }
    );

    stream.on('end', () => {
      res.end(
        getFooter({
          fePort,
          scripts: ['client.js'],
          serverRendered: true,
        })
      );
    });
  }
}

export default reactMiddleWare;

declare var __ISOMORPHIC__: boolean;
