import persistenceService from "../services/persistence-service"
import express from "express";
import bodyParser from "body-parser";

export default () => {

    console.log("initializing admin rest controller...");
    let router = express.Router();
    router.use(bodyParser.urlencoded({ extended: false }))
    router.use(bodyParser.json())

    router.use('*', (req, res, next) => {
        if (req["session"].user && req["session"].user.role === "ADMIN") {
            console.log("Admin api service called: ", new Date());
            next();
        }
        else {
            res.sendStatus(401);
        }
    });

    router.get('/raidGroups', function (req, res) {
        persistenceService.getRaidGroups()
            .then(raidGroups => {
                res.send(raidGroups);
            })
    });

    router.post('/schedule', function (req, res) {
        persistenceService.saveEvent(req.body.raid)
            .then(() => {
                res.sendStatus(200);
            })
    });

    router.delete('/deleteEvent/:eventId', function (req, res) {
        persistenceService.deleteEvent(req.params.eventId)
            .then(() => {
                res.sendStatus(200);
            })
    });


    router.get('/findUser/:username', function (req, res) {
        persistenceService.getUserByUsername(req.params.username)
            .then(raidGroups => {
                res.send(raidGroups);
            })
    });

    router.get('/allUserRoles', (req, res) => {
        //TODO migrate in future as typo table on db
        res.send(["DEFAULT", "ADMIN"]);
    });

    router.put("/updateUser", (req, res) => {
        const {id, rank, role, credentials_id} = req.body.userData;
        persistenceService.updateRoleCredentials(credentials_id, role)
            .then(() => {
                persistenceService.updateRank(id, rank)
                    .then(() => {
                        res.sendStatus(200);
                    })
            })
    })

    return router;
}
