import persistenceService from '../services/persistence-service';
import express from 'express';
import bodyParser from 'body-parser';

export const adminController = express.Router();

console.log('initializing admin rest controller...');
adminController.use(bodyParser.urlencoded({ extended: false }));
adminController.use(bodyParser.json());

adminController.use((req, res, next) => {
  const userSession = req.session!.user;
  console.log('Admin api service called: ', new Date());
  if (userSession && userSession.role === 'ADMIN') {
    res.locals.user = userSession;
    next();
  } else {
    res.sendStatus(401);
  }
});

adminController.get('/raidGroups', (req, res) => {
  persistenceService.getRaidGroups().then(raidGroups => {
    res.send(raidGroups);
  });
});

adminController.post('/schedule', (req, res) => {
  persistenceService.saveEvent(req.body.raid).then(() => {
    res.sendStatus(200);
  });
});

adminController.delete('/deleteEvent/:eventId', (req, res) => {
  persistenceService.deleteEvent(req.params.eventId).then(() => {
    res.sendStatus(200);
  });
});

adminController.get('/findUser/:username', (req, res) => {
  persistenceService.getUserByUsername(req.params.username).then(raidGroups => {
    res.send(raidGroups);
  });
});

adminController.get('/allUserRoles', (req, res) => {
  // TODO migrate in future as typo table on db
  res.send(['DEFAULT', 'ADMIN']);
});

adminController.put('/updateUser', (req, res) => {
  const { id, rank, role, credentials_id } = req.body.userData;
  persistenceService.updateRoleCredentials(credentials_id, role).then(() => {
    persistenceService.updateRank(id, rank).then(() => {
      res.sendStatus(200);
    });
  });
});
