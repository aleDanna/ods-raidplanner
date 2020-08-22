import express from 'express';
import bodyParser from 'body-parser';
import { CredentialRestService, UserRestService } from '@server/services/rest-service';

export const authController = express.Router();

console.log('initializing auth controller...');
authController.use(bodyParser.urlencoded({ extended: false }));
authController.use(bodyParser.json());

authController.use((req, res, next) => {
  console.log('Authentication service called: ', new Date());
  next();
});

authController.post('/login', async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const response = await CredentialRestService.authenticate({
    username: username,
    password: password
  });

  if (response.id) {
    req.session!.user = response;
    req.session!.save(() => {
      console.log('session saved!');
      res.send(req.session!.user);
    });
  } else {
    res.sendStatus(response.status);
  }

});

authController.get('/logout', (req, res) => {
  req.session!.destroy(() => console.log('session removed!'));
  delete req.session;
  res.sendStatus(200);
});

authController.get('/recoverSession', (req, res) => {
  const userSession = req.session!.user;
  userSession ? res.send(userSession) : res.sendStatus(204);
});

authController.get('/checkUsername/:username', async (req, res) => {
  const result = await UserRestService.getUser(req.params.username);
  res.send({
    isValid: result === null
  });
});

authController.get('/checkEsoUsername/:username', async (req, res) => {
  const result = await UserRestService.findByEsoUsername(req.params.username);
  res.send({
    isValid: result === null
  });
});

authController.post('/register', async (req, res) => {
  console.log(req.body);
  const {username, password, name, surname, esoUsername} = req.body.userData;
  const result = await CredentialRestService.register({
    name: name as string,
    surname: surname as string,
    esoUsername: esoUsername as string,
    rank: 1,
    credential: {
      username: username as string,
      password: password as string,
      role: 'DEFAULT'
    }
  });
  res.send(result);
});
