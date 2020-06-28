import {Client} from "pg"
import {dbConnection} from "../../database/connection.config";


async function executeQuery(query){
    const client = new Client(dbConnection);
    client.connect();
    return await client.query(query)
        .then(res => {
            return res.rows
        })
        .catch(err => {
            throw err.stack
        })
        .finally(() => {
            client.end();
        });
}

export default {
    getAllowedEvents(userId) {
        const query = `SELECT r.id, r.start_date, r.end_date, r.subscriptions, rg.name, rg.image_name 
                                   FROM raids r, raid_groups rg, users u
                                   WHERE r.group_ref = rg.id 
                                     AND u.id = ${userId}
                                     AND r.start_date >= cast(date_trunc('month', current_date) as date)
                                     AND rg.rank <= u.rank`;

        return executeQuery(query);

    },

    addSubscription(event, user) {
        console.log("saving subscription...")
        const client = new Client(dbConnection);
        client.connect();
        const query = `INSERT INTO raid_subscriptions (character_ref, user_ref, raid_ref)
                        VALUES (${user.characterId}, ${user.id}, ${event.eventId})`;

        return executeQuery(query);
    },
    getSubscribedRaids(userId) {
        const allowedRaidsQuery = `SELECT rs.raid_ref 
                                   FROM raids r, raid_subscriptions rs
                                   WHERE r.id = rs.raid_ref 
                                     AND rs.user_ref = ${userId}
                                     AND r.start_date >= cast(date_trunc('month', current_date) as date)`;

        return executeQuery(allowedRaidsQuery);
    }
}
