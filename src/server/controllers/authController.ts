import express from "express";
import persistenceService from "../services/persistence-service"
import bodyParser from "body-parser";

export default () => {
    let router = express.Router();
    router.use(bodyParser.urlencoded({ extended: false }))
    router.use(bodyParser.json())

    router.use('*', (req, res, next) => {
        console.log("Authentication service called: ", new Date());
        next();
    });

    router.post('/', function(req, res) {
        const username = req.body.username;
        const password = req.body.password;
        persistenceService.authenticate(username, password)
            .then(user => {
                if (user) {
                    req["session"].user = user;
                    res.send(user);
                }
                else {
                    res.sendStatus(405);
                }
            })
            .catch(() => res.sendStatus(500));
    });

    router.get('/recoverSession', function (req, res) {
        const userSession = req["session"].user;
        console.log("session...", userSession)
        if (userSession) {
            res.send(userSession)
        }
        else {
            res.sendStatus(204)
        }
    })
    return router;
}
