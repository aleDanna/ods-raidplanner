import { UserProps } from '@core/datatypes/UserProps';
import { appHost } from '@core/configs/connection.config';
import { RaidSearchFilterProps } from '@core/datatypes/RaidSearchFilterProps';
import { CharacterProps } from '@core/datatypes/CharacterProps';

const host = appHost();

const executeRestCall = (url, method, body?, errorCallback?) => {
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
        if (errorCallback) {
          errorCallback(res.status);
          return null;
        } else {
          window.location.href = '/error';
          return null;
        }
      }
    });
};

export default {
  getAvailableRaids() {
    return executeRestCall(`/api/getRaids`, 'GET');
  },
  subscribe(eventId: string, characterId: string, errorCallback?: Function) {
    return executeRestCall(`/api/subscribe`, 'POST', {
      eventId: eventId,
      characterId: characterId
    }, errorCallback);
  },
  unsubscribe(eventId: string, errorCallback?: Function) {
    return executeRestCall(`/api/unsubscribe/${eventId}`, 'DELETE', null, errorCallback);
  },
  getRaidGroups() {
    return executeRestCall(`/admin/raidGroups`, 'GET');
  },
  scheduleEvent(event: any, errorCallback: Function) {
    return executeRestCall(`/admin/schedule`, 'POST', {
      raid: event
    }, errorCallback);
  },
  getEsoUsername(userId: number) {
    return executeRestCall(`/api/getEsoUsername/${userId}`, 'GET');
  },
  getRaidDetails(eventId: string) {
    return executeRestCall(`/api/raidDetails/${eventId}`, 'GET');
  },
  updateUserDetails(userData: any, errorCallback: Function) {
    return executeRestCall(`/api/updateUser`, 'PUT', {
      userData: userData
    }, errorCallback);
  },
  checkAvailableUsername(username: string) {
    return executeRestCall(`/auth/checkUsername/${username}`, 'GET');
  },
  checkAvailableESOUsername(username: string) {
    return executeRestCall(`/auth/checkEsoUsername/${username}`, 'GET');
  },
  getRoles() {
    return executeRestCall(`/api/allRoles`, 'GET');
  },
  updateCharacter(character: CharacterProps, errorCallback: Function) {
    return executeRestCall(`/api/updateCharacter`, 'PUT', character, errorCallback);
  },
  deleteCharacter(characterId: string, errorCallback: Function) {
    return executeRestCall(`/api/deleteCharacter/${characterId}`, 'DELETE', null, errorCallback);
  },
  saveCharacter(character: CharacterProps, errorCallback: Function) {
    return executeRestCall(`/api/saveCharacter`, 'POST', character, errorCallback);
  },
  getRaidsByFilter(filters: RaidSearchFilterProps, errorCallback?: Function) {
    return executeRestCall(`/api/getRaidsByFilter`, 'POST', {
      filters: filters
    }, errorCallback);
  },
  deleteEvent(eventId: number, errorCallback: Function) {
    return executeRestCall(`/admin/deleteEvent/${eventId}`, 'DELETE', null, errorCallback);
  },
  registerUser(user: any) {
    return executeRestCall(`/auth/register`, 'POST', {
      userData: user
    });
  },
  getUserRoles() {
    return executeRestCall(`/admin/allUserRoles`, 'GET');
  },
  findUser(username: string, errorCallback: Function) {
    return executeRestCall(`/admin/findUser/${username}`, 'GET', null, errorCallback);
  },
  updateUser(user: UserProps) {
    return executeRestCall(`/admin/updateUser`, 'PUT', {
      userData: user
    });
  },
  login(credentials: { password: string; username: string }, errorCallback: Function) {
    return executeRestCall(`/auth/login`, 'POST', credentials, errorCallback);
  },
  logout() {
    return executeRestCall(`/auth/logout`, 'GET');
  },
  recoverSession() {
    return executeRestCall('/auth/recoverSession', 'GET');
  },
  saveRaidGrouping(groups: Array<Array<any>>, errorCallback: Function) {
    return executeRestCall(`/admin/saveRaidGrouping`, 'PUT', {
      groups: groups
    }, errorCallback);

  }
};
