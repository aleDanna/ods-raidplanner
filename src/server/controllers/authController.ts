import express from 'express';
import persistenceService from '../services/persistence-service';
import bodyParser from 'body-parser';

export const authController = express.Router();

console.log('initializing auth controller...');
authController.use(bodyParser.urlencoded({ extended: false }));
authController.use(bodyParser.json());

authController.use((req, res, next) => {
  console.log(req.session);
  console.log('Authentication service called: ', new Date());
  next();
});

authController.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  persistenceService
    .authenticate(username, password)
    .then(user => {
      if (user) {
        persistenceService.getCharacters(user.id).then(characters => {
          user.characters = characters;
          req.session!.user = user;
          req.session!.save(() => {
            console.log('session saved!');
            res.send(req.session!.user);
          });
        });
      } else {
        res.sendStatus(405);
      }
    })
    .catch(() => res.sendStatus(500));
});

authController.get('/logout', (req, res) => {
  req.session!.destroy(() => console.log('session removed!'));
  res.sendStatus(200);
});

authController.get('/recoverSession', (req, res) => {
  const userSession = req.session!.user;
  userSession ? res.send(userSession) : res.sendStatus(204);
});

authController.get('/checkUsername/:username', (req, res) => {
  const userSession = req.session!.user;
  persistenceService.getUserByUsername(req.params.username).then(user => {
    res.send({
      isValid: user === null || (userSession && user.id === userSession.id)
    });
  });
});

authController.get('/checkEsoUsername/:username', (req, res) => {
  const userSession = req.session!.user;
  persistenceService.getUserByESOUsername(req.params.username).then(userId => {
    res.send({
      isValid: userId === null || (userSession && userId === userSession.id)
    });
  });
});

authController.post('/register', (req, res) => {
  console.log(req.body);
  const { username, password, name, surname, esoUsername } = req.body.userData;
  persistenceService.saveCredentials(username, password, 'DEFAULT').then(() => {
    persistenceService.saveUser(name, surname, esoUsername, 1, username).then(() => {
      res.sendStatus(200);
    });
  });
});
