import { Client } from 'pg';
import { getDbConnection } from '@core/configs/connection.config';

async function executeQuery(query: string, singleResult: boolean) {
  const client = new Client(getDbConnection());
  client.connect();
  return await client
    .query(query)
    .then(res => {
      if (singleResult) {
        return res.rows[0] || null;
      } else {
        return res.rows || [];
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
  getAllowedEvents(userId: any) {
    const query = `SELECT r.id, r.start_date, r.end_date, 
                            (SELECT count(*) FROM raid_subscriptions rs 
                            WHERE rs.raid_ref = r.id) as subscriptions, 
                            rg.name, rg.image_name, rg.id as group_id 
                                   FROM raids r, raid_groups rg, users u
                                   WHERE r.group_ref = rg.id 
                                     AND u.id = ${userId}
                                     AND r.start_date >= cast(date_trunc('month', current_date) as date)
                                     AND rg.rank <= u.rank`;

    return executeQuery(query, false);
  },

  addSubscription(eventId: any, user: any) {
    const query = `INSERT INTO raid_subscriptions (character_ref, raid_ref)
                        VALUES (${user.characterId}, ${eventId})`;

    return executeQuery(query, true);
  },
  getSubscribedRaids(userId: any) {
    const allowedRaidsQuery = `SELECT rs.raid_ref 
                                   FROM raids r, raid_subscriptions rs, characters c
                                   WHERE r.id = rs.raid_ref 
                                     AND rs.character_ref = c.id
                                     AND c.user_ref = ${userId}
                                     AND r.start_date >= cast(date_trunc('month', current_date) as date)`;

    return executeQuery(allowedRaidsQuery, false);
  },
  authenticate(username: any, password: any) {
    const query = `SELECT u.id, u.name, u.surname, u.eso_username as esoUsername, u.rank, c.username, c.role
                                   FROM users u, credentials c
                                   WHERE c.username = '${username}'
                                     AND c.password = '${password}'
                                     AND u.credentials_ref = c.id`;

    return executeQuery(query, true);
  },

  getCharacters(userId: any) {
    const query = `SELECT c.id as characterId, c.name as characterName, r.id as roleId, r.name as roleName
                                   FROM characters c, roles r
                                   WHERE c.user_ref = ${userId}
                                     AND c.role_ref = r.id`;

    return executeQuery(query, false);
  },
  getRaidGroups() {
    const query = `SELECT * FROM raid_groups`;
    return executeQuery(query, false);
  },
  saveEvent(event: any) {
    const save = eventToSave => {
      const query = `INSERT INTO raids (start_date, end_date, group_ref) 
                            VALUES ('${eventToSave.startDate}', '${eventToSave.endDate}', ${eventToSave.raidGroup})`;
      return executeQuery(query, true);
    };
    // if (event.recurrent) {
    //     //TODO save for next year every week
    // }
    return save(event);
  },
  getRaid(eventId: any) {
    const query = `SELECT r.id, r.start_date, r.end_date, rg.name as title
                        FROM raids r, raid_groups rg
                        WHERE r.id = ${eventId}`;
    return executeQuery(query, true);
  },
  getSubscriptionsByEventId(eventId: any) {
    const query = `SELECT u.id, u.eso_username, c.name as character_name, r.name as role_name
                       FROM users u, characters c, roles r, raid_subscriptions rs 
                       WHERE rs.raid_ref = ${eventId} 
                         AND c.user_ref = u.id
                         AND c.id = rs.character_ref
                         AND r.id = c.role_ref`;
    return executeQuery(query, false);
  },
  removeSubscription(eventId: any, characterId: any) {
    const query = `DELETE 
                       FROM raid_subscriptions rs
                       WHERE rs.raid_ref = ${eventId} 
                         AND rs.character_ref = ${characterId}`;
    return executeQuery(query, true);
  },
  getSubscribedCharacter(eventId: any, userId: any) {
    const query = `SELECT c.id
                       FROM users u, characters c, raid_subscriptions rs 
                       WHERE rs.raid_ref = ${eventId} 
                         AND c.id = rs.character_ref
                         AND c.user_ref = ${userId}`;
    return executeQuery(query, true);
  },
  getUserByUsername(username: any) {
    const query = `SELECT u.id, u.name, u.surname, u.eso_username, u.rank, c.username, 
                                c.role, c.id as credentials_id
                                   FROM users u, credentials c
                                   WHERE c.username = '${username}'
                                     AND u.credentials_ref = c.id`;

    return executeQuery(query, true);
  },
  getUserByESOUsername(esoUsername: any) {
    const query = `SELECT u.id
                       FROM users u
                       WHERE u.eso_username = '${esoUsername}'`;
    return executeQuery(query, true);
  },
  updateUser(user: any) {
    const query = `UPDATE users u
                       SET name = '${user.name}', 
                           surname = '${user.surname}',
                           eso_username = '${user.eso_username}',
                           rank = '${user.rank}'
                       WHERE u.id = ${user.id}`;
    return executeQuery(query, true);
  },
  updateUsername(oldUsername: any, username: any) {
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
  updateCharacter(characterId: any, name: any, roleId: any) {
    const query = `UPDATE characters c
                       SET name = '${name}', 
                           role_ref = '${roleId}'
                       WHERE c.id = ${characterId}`;
    return executeQuery(query, true);
  },

  deleteCharacter(characterId: any) {
    const childQuery = `DELETE
                            FROM raid_subscriptions rs
                            WHERE rs.character_ref = ${characterId}`;
    return executeQuery(childQuery, true).then(() => {
      const query = `DELETE 
                       FROM characters c
                       WHERE c.id = ${characterId}`;
      return executeQuery(query, true);
    });
  },
  addCharacter(userId: any, name: any, roleId: any) {
    const query = `INSERT INTO characters (name, role_ref, user_ref) 
                            VALUES ('${name}', ${roleId}, ${userId})`;
    return executeQuery(query, true);
  },
  getRaidsByFilter(startDateFilter: any, endDateFilter: any, groupFilter: any) {
    let additionalConditions = '';
    if (startDateFilter) {
      additionalConditions = additionalConditions + `AND r.start_date::date >= '${startDateFilter}'::date `;
    }
    if (endDateFilter) {
      additionalConditions = additionalConditions + `AND r.start_date::date <= '${endDateFilter}'::date `;
    }
    if (groupFilter) {
      additionalConditions = additionalConditions + `AND ${groupFilter} = rg.id`;
    }

    const query = `SELECT r.id, r.start_date, r.end_date, 
                            (SELECT count(*) FROM raid_subscriptions rs 
                            WHERE rs.raid_ref = r.id) as subscriptions, 
                            rg.name, rg.image_name, rg.id as group_id 
                                   FROM raids r, raid_groups rg
                                   WHERE r.group_ref = rg.id
                                   ${additionalConditions}`;

    return executeQuery(query, false);
  },
  deleteEvent(eventId: any) {
    const childQuery = `DELETE
                            FROM raid_subscriptions rs
                            WHERE rs.raid_ref = ${eventId}`;
    return executeQuery(childQuery, true).then(() => {
      const query = `DELETE 
                       FROM raids r
                       WHERE r.id = ${eventId}`;
      return executeQuery(query, true);
    });
  },
  saveCredentials(username: any, password: any, role: any) {
    const query = `INSERT INTO credentials (username, password, role) 
                            VALUES ('${username}', '${password}', '${role}'); 
                            SELECT currval('credentials_seq');`;
    return executeQuery(query, true);
  },
  saveUser(name: any, surname: any, esoUsername: any, rank: any, username: any) {
    const query = `INSERT INTO users (name, surname, eso_username, rank, credentials_ref) 
                            VALUES ('${name}', '${surname}', '${esoUsername}', 
                            ${rank}, (SELECT id FROM credentials WHERE username = '${username}'))`;
    return executeQuery(query, true);
  },
  updateRoleCredentials(credentialsId: any, role: any) {
    const query = `UPDATE credentials c
                       SET role = '${role}' 
                       WHERE c.id = ${credentialsId}`;
    return executeQuery(query, true);
  },
  updateRank(id: any, rank: any) {
    const query = `UPDATE users u
                       SET rank = ${rank} 
                       WHERE u.id = ${id}`;
    return executeQuery(query, true);
  }
};
