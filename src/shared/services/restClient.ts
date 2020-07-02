
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
    getAvailableRaidGroups() {
        return executeRestCall(`http://localhost:9000/api/getRaids`, 'GET');
    },
    subscribe(event, characterId) {
        return executeRestCall(
            'http://localhost:9000/api/subscribe',
            'POST',
            {
                event: event,
                characterId: characterId,
            })
    },
    getSubscribedRaids() {
        return executeRestCall(`http://localhost:9000/api/subscribedRaids`, 'GET');
    }
}
