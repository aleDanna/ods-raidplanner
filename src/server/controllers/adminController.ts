import express from 'express';
import bodyParser from 'body-parser';
import { RaidRestService, UserRestService } from '@server/services/rest-service';
import { SubscriptionProps } from '@core/datatypes/SubscriptionProps';

export const adminController = express.Router();

console.log('initializing admin rest controller...');
adminController.use(bodyParser.urlencoded({ extended: false }));
adminController.use(bodyParser.json());

adminController.use((req, res, next) => {
  const userSession = req.session!.user;
  console.log('Admin api service called: ', new Date());
  if (userSession && userSession.credential.role === 'ADMIN') {
    res.locals.user = userSession;
    next();
  } else {
    res.sendStatus(401);
  }
});

adminController.get('/raidGroups', async (req, res) => {
  const result = await RaidRestService.getRaidGroups();
  res.send(result);
});

adminController.post('/schedule', async (req, res) => {
  const event = req.body.raid;

  const result = await RaidRestService.scheduleEvent(event);
  res.send(result);
});

adminController.delete('/deleteEvent/:eventId', async (req, res) => {
  const result = await RaidRestService.deleteRaid(req.params.eventId);
  res.send(result);
});

adminController.get('/findUser/:username', async (req, res) => {
  const result = await UserRestService.getUser(req.params.username);
  res.send(result);
});

adminController.get('/allUserRoles', async (req, res) => {
  const result = await UserRestService.getRoles();
  res.send(result);
});

adminController.put('/updateUser', async (req, res) => {
  const user = req.body.userData;
  const result = await UserRestService.updateUser(user);
  res.send(result);
});

adminController.put('/saveRaidGrouping', async (req, res) => {
  const groups = req.body.groups;
  const dataToSend = new Array<SubscriptionProps>();
  groups.forEach((subscriptions, groupNumber) => {
      subscriptions.forEach(subscription => {
          subscription.groupNumber = groupNumber;
          dataToSend.push(subscription);
        });
    });
  const result = await RaidRestService.updateSubscriptions(dataToSend);
  res.send(result);
});
