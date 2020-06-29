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
        const {event, characterId} = req.body
        const user = {
            id: req["session"].user.id,
            characterId: characterId
        }
        const result = persistenceService.addSubscription(event, user);
        res.send(result);
    });

    return router;
}
