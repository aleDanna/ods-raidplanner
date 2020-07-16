import persistenceService from '../services/persistence-service';
import express from 'express';
import bodyParser from 'body-parser';

export const apiController = express.Router();

console.log('initializing api rest controller...');

apiController.use((req, res, next) => {
  const userSession = req.session!.user;
  console.log('Rest api service called: ', new Date());
  if (userSession) {
    res.locals.user = userSession;
    next();
  } else {
    res.sendStatus(401);
  }
});

apiController.use(bodyParser.urlencoded({ extended: false }));
apiController.use(bodyParser.json());

apiController.get('/getRaids', (req, res) => {
  persistenceService
    .getAllowedEvents(res.locals.user.id)
    .then(allowedRaids => res.send(allowedRaids))
    .catch(err => res.send(err));
});

apiController.get('/subscribedRaids', (req, res) => {
  persistenceService
    .getSubscribedRaids(res.locals.user.id)
    .then(raidIds => res.send(raidIds))
    .catch(err => res.send(err));
});

apiController.post('/subscribe', (req, res) => {
  const { eventId, characterId } = req.body;
  const user = {
    id: res.locals.user.id,
    characterId: characterId
  };
  persistenceService.addSubscription(eventId, user).then(() => {
    res.sendStatus(200);
  });
});

apiController.delete('/unsubscribe/:eventId', (req, res) => {
  const eventId = req.params.eventId;
  const userId = res.locals.user.id;

  console.log('unsubscribing...', eventId, userId);
  persistenceService.getSubscribedCharacter(eventId, userId).then(character => {
    persistenceService.removeSubscription(eventId, character.id).then(() => {
      res.sendStatus(200);
    });
  });
});

apiController.get('/subscriptionsFor/:eventId', (req, res) => {
  persistenceService.getSubscriptionsByEventId(req.params.eventId).then(subscriptions => {
    res.send(subscriptions);
  });
});

apiController.get('/raidDetails/:eventId', (req, res) => {
  persistenceService.getRaid(req.params.eventId).then(raid => {
    res.send(raid);
  });
});

apiController.get('/allRoles', (req, res) => {
  persistenceService.getRoles().then(roles => {
    res.send(roles);
  });
});

apiController.put('/updateCharacter', (req, res) => {
  const { characterId, name, roleId } = req.body;
  persistenceService.updateCharacter(characterId, name, roleId).then(() => {
    persistenceService.getCharacters(res.locals.user.id).then(characters => {
      res.locals.user.characters = characters;
      res.send(res.locals.user);
    });
  });
});

apiController.delete('/deleteCharacter/:characterId', (req, res) => {
  persistenceService.deleteCharacter(req.params.characterId).then(() => {
    persistenceService.getCharacters(res.locals.user.id).then(characters => {
      res.locals.user.characters = characters;
      res.send(res.locals.user);
    });
  });
});

apiController.put('/updateUser', (req, res) => {
  const actualUser = res.locals.user;
  const userUpdated = Object.create(actualUser);

  // tslint:disable-next-line:forin
  for (const key in req.body.userData) {
    userUpdated[key] = req.body.userData[key];
  }
  persistenceService.updateUser(userUpdated).then(() => {
    persistenceService.updateUsername(actualUser.username, userUpdated.username).then(() => {
      persistenceService.getCharacters(actualUser.id).then(characters => {
        userUpdated.characters = characters;
        req.session!.user = userUpdated;
        req.session!.save(() => {
          res.send(userUpdated);
        })
      });
    });
  });
});

apiController.post('/saveCharacter', (req, res) => {
  const { name, roleId } = req.body;
  const userId = res.locals.user.id;

  persistenceService.addCharacter(userId, name, roleId).then(() => {
    persistenceService.getCharacters(res.locals.user.id).then(characters => {
      res.locals.user.characters = characters;
      res.send(res.locals.user);
    });
  });
});

apiController.post('/getRaidsByFilter', (req, res) => {
  persistenceService.getRaidsByFilter(req.body.filters).then(data => {
    res.send(data);
  });
});
