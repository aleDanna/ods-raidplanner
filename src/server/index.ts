import express from 'express';
import cors from 'cors';
import expressSession from "express-session";

import reactMiddleWare from './reactMiddleWare';
import restController from './restController';
const app = express();

app.use(cors())
app.options('*', cors())

const session =
app.use(expressSession({
  secret: 'ods-raidplanner',
  resave:true,
  saveUninitialized:true,
  cookie: { maxAge: 60000 }
}));

type MiddleWares = Array<{
  route: string;
  when: 'pre' | 'post';
  middleWare: (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => void;
}>;

function mountMiddleWares(middlewares: MiddleWares) {
  middlewares
    .filter(m => m.when === 'pre')
    .forEach(m => app.use(m.route, m.middleWare));
  app.use('/rp', reactMiddleWare);

  restController(app);
  // app.use(session({
  //   store: {},
  //   secret: process.env.REDISSECRET,
  //   resave: false,
  //   saveUninitialized: false
  // }));

  middlewares
    .filter(m => m.when === 'post')
    .forEach(m => app.use(m.route, m.middleWare));
}

export function start(middlewares: MiddleWares) {
  mountMiddleWares(middlewares);
}

export default app;
