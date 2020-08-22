import express from 'express';
import bodyParser from 'body-parser';
import { restServerHost } from '@core/configs/connection.config';

export const pingController = express.Router();

console.log('initializing ping rest controller...');
pingController.use(bodyParser.urlencoded({ extended: false }));
pingController.use(bodyParser.json());

setInterval( async function() {
  const url = restServerHost() + '/ping/check';
  await fetch(url);
}, 60000);

pingController.use((req, res, next) => {
  console.log('Ping received from REST server', new Date());
  next();
});

pingController.get('/check', async (req, res) => {
  console.log('Ping process completed correctly');
  res.sendStatus(200);
});
