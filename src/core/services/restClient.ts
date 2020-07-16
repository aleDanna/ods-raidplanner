import { UserProps } from '@core/datatypes/UserProps';

const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 3001;

const executeRestCall = (url, method, body?) => {
  const params = {
    method: method,
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  };

  // @ts-ignore
  return fetch(`${protocol}://${host}:${port}${url}`, params).then(res => {
    return res.json().catch(_ => res);
  });
};

export default {
  getAvailableRaids() {
    return executeRestCall(`/api/getRaids`, 'GET');
  },
  subscribe(eventId: string, characterId: string) {
    return executeRestCall(`/api/subscribe`, 'POST', {
      eventId: eventId,
      characterId: characterId
    });
  },
  unsubscribe(eventId: string) {
    return executeRestCall(`/api/unsubscribe/${eventId}`, 'DELETE');
  },
  getSubscribedRaids() {
    return executeRestCall(`/api/subscribedRaids`, 'GET');
  },
  getRaidGroups() {
    return executeRestCall(`/admin/raidGroups`, 'GET');
  },
  scheduleEvent(event: any) {
    return executeRestCall(`/admin/schedule`, 'POST', {
      raid: event
    });
  },
  getSubscriptionsFor(eventId: string) {
    return executeRestCall(`/api/subscriptionsFor/${eventId}`, 'GET');
  },
  getRaidDetails(eventId: string) {
    return executeRestCall(`/api/raidDetails/${eventId}`, 'GET');
  },
  updateUserDetails(userData: UserProps) {
    return executeRestCall(`/api/updateUser`, 'PUT', {
      userData: userData
    });
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
  updateCharacter(characterId: string, newName: string, newRoleId: string) {
    return executeRestCall(`/api/updateCharacter`, 'PUT', {
      characterId: characterId,
      name: newName,
      roleId: newRoleId
    });
  },
  deleteCharacter(characterId: string) {
    return executeRestCall(`/api/deleteCharacter/${characterId}`, 'DELETE');
  },
  saveCharacter(name: string, role: string) {
    return executeRestCall(`/api/saveCharacter`, 'POST', {
      name: name,
      roleId: role
    });
  },
  getRaidsByFilter(filters: any) {
    return executeRestCall(`/api/getRaidsByFilter`, 'POST', {
      filters: filters
    });
  },
  deleteEvent(eventId: string) {
    return executeRestCall(`/admin/deleteEvent/${eventId}`, 'DELETE');
  },
  registerUser(user: UserProps) {
    return executeRestCall(`/auth/register`, 'POST', {
      userData: user
    });
  },
  getUserRoles() {
    return executeRestCall(`/admin/allUserRoles`, 'GET');
  },
  findUser(username: string) {
    return executeRestCall(`/admin/findUser/${username}`, 'GET');
  },
  updateUser(user: UserProps) {
    return executeRestCall(`/admin/updateUser`, 'PUT', {
      userData: user
    });
  },
  login(credentials: { password: string; username: string }) {
    return executeRestCall(`/auth/login`, 'POST', credentials);
  },
  logout() {
    return executeRestCall(`/auth/logout`, 'GET');
  }
};
