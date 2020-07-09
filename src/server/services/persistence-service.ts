import {Client} from "pg"
import {dbConnection} from "../../database/connection.config";


async function executeQuery(query, singleResult) {
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
        const query = `SELECT r.id, r.start_date, r.end_date, 
                            (SELECT count(*) FROM raid_subscriptions rs 
                            WHERE rs.raid_ref = r.id) as subscriptions, 
                            rg.name, rg.image_name 
                                   FROM raids r, raid_groups rg, users u
                                   WHERE r.group_ref = rg.id 
                                     AND u.id = ${userId}
                                     AND r.start_date >= cast(date_trunc('month', current_date) as date)
                                     AND rg.rank <= u.rank`;

        return executeQuery(query, false);

    },

    addSubscription(eventId, user) {
        const client = new Client(dbConnection);
        client.connect();
        const query = `INSERT INTO raid_subscriptions (character_ref, raid_ref)
                        VALUES (${user.characterId}, ${eventId})`;

        return executeQuery(query, true);
    },
    getSubscribedRaids(userId) {
        const allowedRaidsQuery = `SELECT rs.raid_ref 
                                   FROM raids r, raid_subscriptions rs, characters c
                                   WHERE r.id = rs.raid_ref 
                                     AND rs.character_ref = c.id
                                     AND c.user_ref = ${userId}
                                     AND r.start_date >= cast(date_trunc('month', current_date) as date)`;

        return executeQuery(allowedRaidsQuery, false);
    },
    authenticate(username, password) {
        const query = `SELECT u.id, u.name, u.surname, u.eso_username, u.rank, c.username, c.role
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
    },
    getRaidGroups() {
        const query = `SELECT * FROM raid_groups`;
        return executeQuery(query, false);
    },
    saveEvent(event) {
        const save = (event) => {
            const query = `INSERT INTO raids (start_date, end_date, group_ref) 
                            VALUES ('${event.startDate}', '${event.endDate}', ${event.raidGroup})`
            return executeQuery(query, true);
        }
        // if (event.recurrent) {
        //     //TODO save for next year every week
        // }
        return save(event);
    },
    getRaid(eventId) {
        const query = `SELECT r.id, r.start_date, r.end_date, rg.name as title
                        FROM raids r, raid_groups rg
                        WHERE r.id = ${eventId}`;
        return executeQuery(query, true);
    },
    getSubscriptionsByEventId(eventId) {
        const query = `SELECT u.id, u.eso_username, c.name as character_name, r.name as role_name
                       FROM users u, characters c, roles r, raid_subscriptions rs 
                       WHERE rs.raid_ref = ${eventId} 
                         AND c.user_ref = u.id
                         AND c.id = rs.character_ref
                         AND r.id = c.role_ref`;
        return executeQuery(query, false);
    },
    removeSubscription(eventId, characterId) {
        const query = `DELETE 
                       FROM raid_subscriptions rs
                       WHERE rs.raid_ref = ${eventId} 
                         AND rs.character_ref = ${characterId}`;
        return executeQuery(query, true);
    },
    getSubscribedCharacter(eventId, userId) {
        const query = `SELECT c.id
                       FROM users u, characters c, raid_subscriptions rs 
                       WHERE rs.raid_ref = ${eventId} 
                         AND c.id = rs.character_ref
                         AND c.user_ref = ${userId}`;
        return executeQuery(query, true);
    },
    getUserByUsername(username) {
        const query = `SELECT u.id, u.name, u.surname, u.eso_username, u.rank, c.username, c.role
                                   FROM users u, credentials c
                                   WHERE c.username = '${username}'
                                     AND u.credentials_ref = c.id`;

        return executeQuery(query, true);
    },
    getUserByESOUsername(eso_username) {
        const query = `SELECT u.id
                       FROM users u
                       WHERE u.eso_username = '${eso_username}'`;
        return executeQuery(query, true);
    },
    updateUser(user) {
        const query = `UPDATE users u
                       SET name = '${user.name}', 
                           surname = '${user.surname}',
                           eso_username = '${user.eso_username}',
                           rank = '${user.rank}'
                       WHERE u.id = ${user.id}`;
        return executeQuery(query, true);
    },
    updateUsername(oldUsername, username) {
        const query = `UPDATE credentials c
                       SET username = '${username}'
                       WHERE c.username = '${oldUsername}'`;
        return executeQuery(query, true);
    },
    getRoles() {
        const query = `SELECT *
                       FROM roles`;
        return executeQuery(query, false);
    },
    updateCharacter(characterId, name, roleId) {
        const query = `UPDATE characters c
                       SET name = '${name}', 
                           role_ref = '${roleId}'
                       WHERE c.id = ${characterId}`;
        return executeQuery(query, true);
    },

    deleteCharacter(characterId: any) {
        const query = `DELETE 
                       FROM characters c
                       WHERE c.id = ${characterId}`;
        return executeQuery(query, true);
    },
    addCharacter(userId, name, roleId) {
        const query = `INSERT INTO characters (name, role_ref, user_ref) 
                            VALUES ('${name}', ${roleId}, ${userId})`
        return executeQuery(query, true);
    }
}
