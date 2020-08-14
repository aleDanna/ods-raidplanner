import express from 'express';
import helmet from 'helmet';
import path from 'path';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import expressSession from 'express-session';

import 'isomorphic-fetch';
import './exitHandler';

import { assetsParser } from './middlewares/assetsParser';
import { getRequire } from './lib/utils';
import { router } from './router';
import { apiController } from '@server/controllers/apiController';
import { adminController } from '@server/controllers/adminController';
import { authController } from '@server/controllers/authController';
import { pingController } from '@server/controllers/pingController';

import { appHost, getDbConnection } from '@core/configs/connection.config';

const isProduction = process.env.NODE_ENV === 'production';
const host = appHost();
const port = process.env.PORT || 3001;
const app = express();

const SECRET = 'ods-raidplanner';

app.disable('x-powered-by');
app.set('trust proxy', 1);

app.use(helmet());

const corsOptions = {
  origin: host,
  credentials: true
};

app.use(cors(corsOptions));

if (isProduction) {
  // In real app better to use nginx for static assets
  const httpHeaders = { maxAge: 31536000, redirect: false, lastModified: true };
  app.use(express.static(path.resolve(process.cwd(), 'dist'), httpHeaders));
}

if (!isProduction) {
  const webpackConfig = getRequire()(path.resolve(process.cwd(), 'webpack.config'));
  const webpack = require('webpack');
  const compiler = webpack(webpackConfig);
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');

  app.use(
    webpackDevMiddleware(compiler, {
      publicPath: webpackConfig.output.publicPath,
      serverSideRender: true,
      stats: 'errors-only',
      logLevel: 'error'
    })
  );
  app.use(webpackHotMiddleware(compiler, { log: console.log }));
}

app.use(assetsParser(isProduction));
app.use(/^(?!\/?(api|auth|admin|ping)).+$/, router);
app.use((err: string, req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (!isProduction) {
    return res.status(500).send(err);
  }

  return res.sendStatus(500);
});

app.use(cookieParser(SECRET));

const pgSession = require('connect-pg-simple')(expressSession);
const sessionPool = require('pg').Pool;

app.use(expressSession({
  store: new pgSession({
    pool: new sessionPool(getDbConnection())
  }),
  secret: SECRET,
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    secure: isProduction
  }
}));

app.use('/auth', authController);
app.use('/api', apiController);
app.use('/admin', adminController);
app.use('/ping', pingController);

app.listen(port, () => {
  console.info(`✅✅✅ Server is running at ${host} ✅✅✅`);
});
