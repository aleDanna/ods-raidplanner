import persistenceService from "../services/persistence-service"
import express from "express";
import bodyParser from "body-parser";

export default () => {

    console.log("initializing api rest controller...");
    let router = express.Router();
    router.use(bodyParser.urlencoded({ extended: false }))
    router.use(bodyParser.json())

    router.use('*', (req, res, next) => {
        if (req["session"].user) {
            console.log("Rest api service called: ", new Date());
            next();
        }
        else {
            res.sendStatus(401);
        }
    });

    router.get("/getRaids", (req, res) => {
        persistenceService.getAllowedEvents(req["session"].user.id)
            .then(allowedRaids => res.send(allowedRaids))
            .catch(err => res.send(err))
    });

    router.get("/subscribedRaids", (req, res) => {
        persistenceService.getSubscribedRaids(req["session"].user.id)
            .then(raidIds => res.send(raidIds))
            .catch(err => res.send(err))
    });

    router.post("/subscribe", (req, res) => {
        const {eventId, characterId} = req.body
        const user = {
            id: req["session"].user.id,
            characterId: characterId
        }
        persistenceService.addSubscription(eventId, user)
            .then(() => {
                res.sendStatus(200);
            })
    });

    router.delete("/unsubscribe/:eventId", (req, res) => {
        const eventId = req.params.eventId
        const userId = req["session"].user.id

        persistenceService.getSubscribedCharacter(eventId, userId)
            .then((character => {
                persistenceService.removeSubscription(eventId, character.id)
                    .then(() => {
                        res.sendStatus(200);
                    })
            }))
    });

    router.get("/subscriptionsFor/:eventId", (req, res) => {
        persistenceService.getSubscriptionsByEventId(req.params.eventId)
            .then(subscriptions => {
                res.send(subscriptions);
            })
    });

    router.get("/raidDetails/:eventId", (req, res) => {
        persistenceService.getRaid(req.params.eventId)
            .then(raid => {
                res.send(raid);
            })
    });

    router.get("/checkUsername/:username", (req, res) => {
        persistenceService.getUserByUsername(req.params.username)
            .then(user => {
                res.send({
                    isValid: user === null || user.id === req['session'].user.id
                });
            })
    });

    router.get("/checkEsoUsername/:username", (req, res) => {
        persistenceService.getUserByESOUsername(req.params.username)
            .then(userId => {
                res.send({
                    isValid: userId === null || userId === req['session'].user.id
                });
            })
    });

    router.get("/allRoles", (req, res) => {
        persistenceService.getRoles()
            .then(roles => {
                res.send(roles);
            })
    });

    router.put("/updateCharacter", (req, res) => {

        const {characterId, name, roleId } = req.body;

        persistenceService.updateCharacter(characterId, name, roleId)
            .then(() => {
                persistenceService.getCharacters(req['session'].user.id)
                    .then(characters => {
                        req['session'].user.characters = characters;
                        res.send(req['session'].user);
                    })
            });

    });

    router.delete("/deleteCharacter/:characterId", (req, res) => {

        persistenceService.deleteCharacter(req.params.characterId)
            .then(() => {
                persistenceService.getCharacters(req['session'].user.id)
                    .then(characters => {
                        req['session'].user.characters = characters;
                        res.send(req['session'].user);
                    })
            });
    });


    router.put("/updateUser", (req, res) => {
        const actualUser = Object.create(req['session'].user);

        for (let key in req.body.userData) {
            actualUser[key] = req.body.userData[key];
        }

        persistenceService.updateUser(actualUser)
            .then(() => {
                persistenceService.updateUsername(req['session'].user.username, actualUser.username)
                    .then(() => {
                        persistenceService.getCharacters(req['session'].user.id)
                            .then(characters => {
                                req['session'].user.characters = characters;
                                res.send(req['session'].user);
                            })
                    });
            })

    });

    router.post("/saveCharacter", (req, res) => {
        const {name, roleId} = req.body
        const userId = req["session"].user.id;

        persistenceService.addCharacter(userId, name, roleId)
            .then(() => {
                persistenceService.getCharacters(req['session'].user.id)
                    .then(characters => {
                        req['session'].user.characters = characters;
                        res.send(req['session'].user);
                    })
            })
    });

    router.post("/getRaidsByFilter", (req, res) => {
        const {startDateFilter, endDateFilter, groupFilter} = req.body.filters

        persistenceService.getRaidsByFilter(startDateFilter, endDateFilter, groupFilter)
            .then((data) => {
                res.send(data);
            });
    });

    return router;
}
