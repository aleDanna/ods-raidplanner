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

        persistenceService.removeSubscription(eventId, userId)
            .then(() => {
                res.sendStatus(200);
            })
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
    })

    return router;
}
