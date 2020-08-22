import express from 'express';
import bodyParser from 'body-parser';
import { CharacterRestService, RaidRestService, UserRestService } from '@server/services/rest-service';

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

apiController.get('/raidDetails/:raidId', async (req, res) => {
  const result = await RaidRestService.getRaid(req.params.raidId);
  res.send(result);
});

apiController.get('/subscribedRaids', async (req, res) => {
  const result = await RaidRestService.getSubscribedRaids(res.locals.user.id);
  res.send(result);
});

apiController.post('/subscribe', async (req, res) => {
  const { eventId, characterId } = req.body;
  console.log(req.body);
  const result = await RaidRestService.subscribeToRaid(eventId, characterId);
  res.send(result);
});

apiController.delete('/unsubscribe/:raidId', async (req, res) => {
  const raidId = req.params.raidId;
  const userId = res.locals.user.id;
  await RaidRestService.unsubscribe(raidId, userId);
  res.sendStatus(200);
});

apiController.get('/allRoles', async (req, res) => {
  const result = await CharacterRestService.getRoles();
  res.send(result);
});

apiController.put('/updateCharacter', async (req, res) => {
  const character = req.body;

  const updatedCharacter = await CharacterRestService.updateCharacter(character);
  if (updatedCharacter) {
    console.log(res.locals.user.username);
    req.session!.user = await UserRestService.getUser(res.locals.user.credential.username);
    res.send(req.session!.user);
  }
});

apiController.delete('/deleteCharacter/:characterId', (req, res) => {
  CharacterRestService.deleteCharacter(req.params.characterId)
    .then(async () => {
      res.locals.user = await UserRestService.getUser(res.locals.user.credential.username);
      res.send(res.locals.user);
    });
});

apiController.put('/updateUser', async (req, res) => {
  const user = req.body.userData;
  const result = await UserRestService.updateUser(user);
  req.session!.user = result;
  req.session!.save(() => {
    res.send(result);
  });
});

apiController.post('/saveCharacter', async (req, res) => {
  const character = req.body;
  const savedCharacter = await CharacterRestService.saveCharacter(character);

  if (savedCharacter) {
    console.log(res.locals.user.username);
    req.session!.user = await UserRestService.getUser(res.locals.user.credential.username);
    res.send(req.session!.user);
  }
});

apiController.post('/getRaidsByFilter', async (req, res) => {
  const filters = req.body.filters;
  const result = await RaidRestService.getRaidsByFilter(filters);
  res.send(result);
});

apiController.get('/getEsoUsername/:userId', async (req, res) => {
  const result = await UserRestService.getEsoUsername(req.params.userId);
  res.send(result);
});
