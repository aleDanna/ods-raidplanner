import {Client} from "pg"
import {dbConnection} from "../../database/connection.config";


async function executeQuery(query, singleResult){
    const client = new Client(dbConnection);
    client.connect();
    return await client.query(query)
        .then(res => {
            if (singleResult) {
                return res.rows[0] || null
            }
            else {
                return res.rows || []
            }
        })
        .catch(err => {
            console.error(err.stack);
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

        return executeQuery(query, false);

    },

    addSubscription(event, user) {
        const client = new Client(dbConnection);
        client.connect();
        const query = `INSERT INTO raid_subscriptions (character_ref, user_ref, raid_ref)
                        VALUES (${user.characterId}, ${user.id}, ${event.eventId})`;

        return executeQuery(query, true);
    },
    getSubscribedRaids(userId) {
        const allowedRaidsQuery = `SELECT rs.raid_ref 
                                   FROM raids r, raid_subscriptions rs
                                   WHERE r.id = rs.raid_ref 
                                     AND rs.user_ref = ${userId}
                                     AND r.start_date >= cast(date_trunc('month', current_date) as date)`;

        return executeQuery(allowedRaidsQuery, false);
    },
    authenticate(username, password) {
        const query = `SELECT u.id, u.name, u.surname, u.eso_username, u.rank, c.username
                                   FROM users u, credentials c
                                   WHERE c.username = '${username}'
                                     AND c.password = '${password}'
                                     AND u.credentials_ref = c.id`;

        return executeQuery(query, true);
    },

    getCharacters(userId) {
        const query = `SELECT c.id as character_id, c.name as character_name, r.id as role_id, r.name as role_name
                                   FROM characters c, roles r
                                   WHERE c.user_ref = ${userId}
                                     AND c.role_ref = r.id`;

        return executeQuery(query, false);
    }
}
