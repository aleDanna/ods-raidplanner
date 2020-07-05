
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
    }
}
