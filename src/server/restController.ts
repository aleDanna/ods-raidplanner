import persistenceService from "./services/persistence-service"
import bodyParser from "body-parser";

export default (app) => {

    console.log("initializing rest controller...");

    app.use('/rest', (req, res, next) => {
        req.session.userId = 1;
        next();
    })
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())


    app.get("/rest/getRaids", (req, res) => {
        console.log("service called!")
        persistenceService.getAllowedEvents(req.session.userId)
            .then(allowedRaids => res.send(allowedRaids))
            .catch(err => res.send(err))
    });

    app.get("/rest/subscribedRaids", (req, res) => {
        persistenceService.getSubscribedRaids(req.session.userId)
            .then(raidIds => res.send(raidIds))
            .catch(err => res.send(err))
    });

    app.post("/rest/subscribe", (req, res) => {
        const {event, characterId} = req.body
        const user = {
            id: req.session.userId,
            characterId: characterId
        }
        const result = persistenceService.addSubscription(event, user);
        res.send(result);
    });
}

