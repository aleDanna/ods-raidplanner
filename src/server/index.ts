import express from 'express';
import cors from 'cors';
import expressSession from "express-session";

import reactMiddleWare from './reactMiddleWare';
import apiController from './controllers/apiController';
import authController from "./controllers/authController";
import bodyParser from "body-parser";
const app = express();

app.use(cors())
app.options('*', cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(expressSession({
  secret: 'ods-raidplanner',
  resave: true,
  saveUninitialized: true
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
  app.use('/auth', authController());
  app.use('/api', apiController());

  middlewares
    .filter(m => m.when === 'post')
    .forEach(m => app.use(m.route, m.middleWare));
}

export function start(middlewares: MiddleWares) {
  mountMiddleWares(middlewares);
}

export default app;
