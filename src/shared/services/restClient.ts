
const executeRestCall = (url, method, body?) => {

    const params = {
        method: method,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }

    return fetch(url, params).then(res => {
        return res.json().catch(_ => res)
    })
}

export default {
    getAvailableRaids() {
        return executeRestCall(`http://localhost:9000/api/getRaids`, 'GET');
    },
    subscribe(eventId, characterId) {
        return executeRestCall(
            'http://localhost:9000/api/subscribe',
            'POST',
            {
                eventId: eventId,
                characterId: characterId,
            })
    },
    unsubscribe(eventId) {
        return executeRestCall(`http://localhost:9000/api/unsubscribe/${eventId}`, 'DELETE');
    },
    getSubscribedRaids() {
        return executeRestCall(`http://localhost:9000/api/subscribedRaids`, 'GET');
    },
    getRaidGroups() {
        return executeRestCall(`http://localhost:9000/admin/raidGroups`, 'GET');
    },
    scheduleEvent(event) {
        return executeRestCall(`http://localhost:9000/admin/schedule`, 'POST',
            {
                raid: event
            });
    },
    getSubscriptionsFor(eventId) {
        return executeRestCall(`http://localhost:9000/api/subscriptionsFor/${eventId}`, 'GET');
    },
    getRaidDetails(eventId) {
        return executeRestCall(`http://localhost:9000/api/raidDetails/${eventId}`, 'GET');
    },
    updateUserDetails(userData) {
        return executeRestCall(`http://localhost:9000/api/updateUser`, 'PUT',
            {
                userData: userData
            });
    },
    checkAvailableUsername(username) {
        return executeRestCall(`http://localhost:9000/auth/checkUsername/${username}`, 'GET');
    },
    checkAvailableESOUsername(username) {
        return executeRestCall(`http://localhost:9000/auth/checkEsoUsername/${username}`, 'GET');
    },
    getRoles() {
        return executeRestCall(`http://localhost:9000/api/allRoles`, 'GET');
    },
    updateCharacter(characterId, newName, newRoleId) {
        return executeRestCall(`http://localhost:9000/api/updateCharacter`, 'PUT',
            {
                characterId: characterId,
                name: newName,
                roleId: newRoleId
            });
    },
    deleteCharacter(characterId) {
        return executeRestCall(`http://localhost:9000/api/deleteCharacter/${characterId}`, 'DELETE');
    },
    saveCharacter(name, role) {
        return executeRestCall(`http://localhost:9000/api/saveCharacter`, 'POST',
            {
                name: name,
                roleId: role
            });
    },
    getRaidsByFilter(filters) {
        return executeRestCall(`http://localhost:9000/api/getRaidsByFilter`, 'POST',
            {
                filters: filters
            });
    },
    deleteEvent(eventId) {
        return executeRestCall(`http://localhost:9000/admin/deleteEvent/${eventId}`, 'DELETE');

    },
    registerUser(user) {
        return executeRestCall(`http://localhost:9000/auth/register`, 'POST',
            {
                userData: user
            });
    },
    getUserRoles() {
        return executeRestCall(`http://localhost:9000/admin/allUserRoles`, 'GET');
    },
    findUser(username) {
        return executeRestCall(`http://localhost:9000/admin/findUser/${username}`, 'GET');
    },
    updateUser(user) {
        return executeRestCall(`http://localhost:9000/admin/updateUser`, 'PUT',
            {
                userData: user
            });
    }
}
