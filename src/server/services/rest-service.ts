import { restServerHost } from '@core/configs/connection.config';
import { UserProps } from '@core/datatypes/UserProps';
import { EventScheduleProps } from '@core/datatypes/EventScheduleProps';
import { SubscriptionProps } from '@core/datatypes/SubscriptionProps';
import { RaidSearchFilterProps } from '@core/datatypes/RaidSearchFilterProps';
import { LoginProps } from '@core/datatypes/LoginProps';
import { CharacterProps } from '@core/datatypes/CharacterProps';

const host = restServerHost();

async function executeRestCall(url, method, body?) {
  const params = {
    method: method,
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  };

  // @ts-ignore
  const result = await fetch(`${host}${url}`, params);
  return result.ok ? await result.json().catch(e => result.status) : result.status;
}

const userEndpoint = '/users';
const raidEndpoint = '/raids';
const credentialEndpoint = '/credential';
const characterEndpoint = '/characters';

export const UserRestService = {
  getUser: async (username: string) => {
    return executeRestCall(`${userEndpoint}/findUser/${username}`, 'GET');
  },
  getRoles: async () => {
    return executeRestCall(`${userEndpoint}/roles`, 'GET');
  },
  updateUser: async (user: UserProps) => {
    return executeRestCall(`${userEndpoint}/updateUser`, 'PUT', user);
  },
  findByEsoUsername: async (esoUsername: string) => {
    return executeRestCall(`${userEndpoint}/findByEsoUsername/${esoUsername}`, 'GET');
  },
  getEsoUsername: async (userId: number) => {
    return executeRestCall(`${userEndpoint}/esoUsername/${userId}`, 'GET');
  }
};

export const RaidRestService = {
  getRaid: async (raidId: number) => {
    return executeRestCall(`${raidEndpoint}/${raidId}`, 'GET');
  },
  getRaidGroups: async () => {
    return executeRestCall(`${raidEndpoint}/raidGroups`, 'GET');
  },
  scheduleEvent: async (event: EventScheduleProps) => {
    return executeRestCall(`${raidEndpoint}/schedule`, 'POST', event);
  },
  deleteRaid: async (raidId: number) => {
    return executeRestCall(`${raidEndpoint}/deleteEvent/${raidId}`, 'DELETE');
  },
  updateSubscriptions: async (subscriptions: Array<SubscriptionProps>) => {
    return executeRestCall(`${raidEndpoint}/updateSubscriptions`, 'PUT', subscriptions);
  },
  getRaidsByFilter: async (filters: RaidSearchFilterProps) => {
    return executeRestCall(`${raidEndpoint}/getRaidsByFilter`, 'POST', filters);
  },
  subscribeToRaid: async (raidId: number, characterId: number) => {
    return executeRestCall(`${raidEndpoint}/subscribe/${raidId}/${characterId}`, 'GET');
  },
  unsubscribe: async (raidId: number, userId: number) => {
    return executeRestCall(`${raidEndpoint}/unsubscribe/${raidId}/${userId}`, 'DELETE');
  },
  getSubscribedRaids: async (userId: number) => {
    return executeRestCall(`${raidEndpoint}/subscribedRaids/${userId}`, 'GET');
  },
};

export const CredentialRestService = {
  authenticate: (login: LoginProps) => {
    return executeRestCall(`${credentialEndpoint}/authenticate`, 'POST', login);
  },
  register: async (user: UserProps) => {
    return executeRestCall(`${credentialEndpoint}/register`, 'POST', user);
  }
};

export const CharacterRestService = {
  getRoles: async () => {
    return executeRestCall(`${characterEndpoint}/roles`, 'GET');
  },
  saveCharacter: async (character: CharacterProps) => {
    return executeRestCall(`${characterEndpoint}/save`, 'POST', character);
  },
  updateCharacter: async (character: CharacterProps) => {
    return executeRestCall(`${characterEndpoint}/update`, 'PUT', character);
  },
  deleteCharacter: async (characterId: number) => {
    return executeRestCall(`${characterEndpoint}/delete/${characterId}`, 'DELETE');
  },
};
