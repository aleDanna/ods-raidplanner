import { restServerHost } from '@core/configs/connection.config';
import { UserProps } from '@core/datatypes/UserProps';
import { RaidGroupProps } from '@core/datatypes/RaidGroupProps';
import { RaidProps } from '@core/datatypes/RaidProps';
import { EventScheduleProps } from '@core/datatypes/EventScheduleProps';
import { SubscriptionProps } from '@core/datatypes/SubscriptionProps';
import { RaidSearchFilterProps } from '@core/datatypes/RaidSearchFilterProps';
import { LoginProps } from '@core/datatypes/LoginProps';
import { CharacterRoleProps } from '@core/datatypes/CharacterRoleProps';
import { CharacterProps } from '@core/datatypes/CharacterProps';
import { VauleProps } from '@core/datatypes/VauleProps';

const host = restServerHost();

const executeRestCall = (url, method, body?) => {
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
  return fetch(`${host}${url}`, params)
    .then(res => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error(res.statusText);
      }
    })
    .catch(err => {
      console.log(err);
      return null;
    });
};

const userEndpoint = '/users';
const raidEndpoint = '/raids';
const credentialEndpoint = '/credential';
const characterEndpoint = '/characters';

export const UserRestService = {
  getUser: async (username: string): Promise<UserProps> => {
    const result = await executeRestCall(`${userEndpoint}/findUser/${username}`, 'GET');
    return result as UserProps;
  },
  getRoles: async (): Promise<Array<RaidGroupProps>> => {
    const result = await executeRestCall(`${userEndpoint}/roles`, 'GET');
    return result as Array<RaidGroupProps>;
  },
  updateUser: async (user: UserProps): Promise<UserProps> => {
    const result = await executeRestCall(`${userEndpoint}/updateUser`, 'PUT', user);
    return result as UserProps;
  },
  findByEsoUsername: async (esoUsername: string): Promise<UserProps> => {
    const result = await executeRestCall(`${userEndpoint}/findByEsoUsername/${esoUsername}`, 'GET');
    return result as UserProps;
  },
  getEsoUsername: async (userId: number): Promise<VauleProps> => {
    const result = await executeRestCall(`${userEndpoint}/esoUsername/${userId}`, 'GET');
    return result as VauleProps;
  }
 };

export const RaidRestService = {
  getRaid: async (raidId: number): Promise<RaidProps> => {
    const result = await executeRestCall(`${raidEndpoint}/${raidId}`, 'GET');
    return result as RaidProps;
  },
  getRaidGroups: async (): Promise<Array<RaidGroupProps>> => {
    const result = await executeRestCall(`${raidEndpoint}/raidGroups`, 'GET');
    return result as Array<RaidGroupProps>;
  },
  scheduleEvent: async (event: EventScheduleProps): Promise<RaidProps> => {
    console.log(event);
    const result = await executeRestCall(`${raidEndpoint}/schedule`, 'POST', event);
    return result as RaidProps;
  },
  deleteRaid: async (raidId: number): Promise<Response> => {
    const result = await executeRestCall(`${raidEndpoint}/deleteEvent/${raidId}`, 'DELETE');
    return result as Response;
  },
  updateSubscriptions: async (subscriptions: Array<SubscriptionProps>): Promise<Response> => {
    const result = await executeRestCall(`${raidEndpoint}/updateSubscriptions`, 'PUT', subscriptions);
    return result as Response;
  },
  getRaidsByFilter: async (filters: RaidSearchFilterProps): Promise<Array<RaidProps>> => {
    const result = await executeRestCall(`${raidEndpoint}/getRaidsByFilter`, 'POST', filters);
    return result as Array<RaidProps>;
  },
  subscribeToRaid: async (raidId: number, characterId: number): Promise<SubscriptionProps> => {
    const result = await executeRestCall(`${raidEndpoint}/subscribe/${raidId}/${characterId}`, 'GET');
    return result as SubscriptionProps;
  },
  unsubscribe: async (raidId: number, userId: number): Promise<Response> => {
    const result = await executeRestCall(`${raidEndpoint}/unsubscribe/${raidId}/${userId}`, 'DELETE');
    return result as Response;
  },
  getSubscribedRaids: async (userId: number): Promise<Array<RaidProps>> => {
    const result = await executeRestCall(`${raidEndpoint}/subscribedRaids/${userId}`, 'GET');
    return result as Array<RaidProps>;
  },
};

export const CredentialRestService = {
  authenticate: async (login: LoginProps): Promise<UserProps> => {
    const result = await executeRestCall(`${credentialEndpoint}/authenticate`, 'POST', login);
    return result as UserProps;
  },
  register: async (user: UserProps): Promise<UserProps> => {
    const result = await executeRestCall(`${credentialEndpoint}/register`, 'POST', user);
    return result as UserProps;
  }
};

export const CharacterRestService = {
  getRoles: async (): Promise<Array<CharacterRoleProps>> => {
    const result = await executeRestCall(`${characterEndpoint}/roles`, 'GET');
    return result as Array<CharacterRoleProps>;
  },
  saveCharacter: async (character: CharacterProps): Promise<CharacterProps> => {
    const result = await executeRestCall(`${characterEndpoint}/save`, 'POST', character);
    return result as CharacterProps;
  },
  updateCharacter: async (character: CharacterProps): Promise<CharacterProps> => {
    const result = await executeRestCall(`${characterEndpoint}/update`, 'PUT', character);
    return result as CharacterProps;
  },
  deleteCharacter: async (characterId: number): Promise<Response> => {
    const result = await executeRestCall(`${characterEndpoint}/delete/${characterId}`, 'DELETE');
    return result as Response;
  },
};
