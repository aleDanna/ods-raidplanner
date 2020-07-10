import express from "express";
import persistenceService from "../services/persistence-service"
import bodyParser from "body-parser";

export default () => {
    console.log("initializing auth controller...");
    let router = express.Router();
    router.use(bodyParser.urlencoded({ extended: false }))
    router.use(bodyParser.json())

    router.use('*', (req, res, next) => {
        console.log("Authentication service called: ", new Date());
        next();
    });

    router.post('/login', function(req, res) {
        const username = req.body.username;
        const password = req.body.password;
        persistenceService.authenticate(username, password)
            .then(user => {
                if (user) {
                    persistenceService.getCharacters(user.id)
                        .then(characters => {
                            user.characters = characters;
                            req["session"].user = user;
                            res.send(user);
                        })
                }
                else {
                    res.sendStatus(405);
                }
            })
            .catch(() => res.sendStatus(500));
    });

    router.get('/logout', function(req, res) {
        req['session'].destroy();
        res.send(200);
    });

    router.get('/recoverSession', function (req, res) {
        const userSession = req["session"].user;
        if (userSession) {
            res.send(userSession)
        }
        else {
            res.sendStatus(204)
        }
    });

    router.get("/checkUsername/:username", (req, res) => {
        persistenceService.getUserByUsername(req.params.username)
            .then(user => {
                res.send({
                    isValid: user === null || (req['session'].user && user.id === req['session'].user.id)
                });
            })
    });

    router.get("/checkEsoUsername/:username", (req, res) => {
        persistenceService.getUserByESOUsername(req.params.username)
            .then(userId => {
                res.send({
                    isValid: userId === null || (req['session'].user && userId === req['session'].user.id)
                });
            })
    });

    router.post("/register", (req, res) => {
        console.log(req.body);
        const {username, password, name, surname, esoUsername} = req.body.userData;
        persistenceService.saveCredentials(username, password, "DEFAULT")
            .then(() => {
                persistenceService.saveUser(name, surname, esoUsername, 1, username)
                    .then(() => {
                        res.sendStatus(200);
                    })
            })
    })
    return router;
}
