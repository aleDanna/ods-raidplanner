
export default {
    getAvailableRaidGroups() {
        return fetch(`http://127.0.0.1:9000/rest/getRaids`, {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Accept': 'application/json'
            }
        })
    },
    subscribe(event, characterId) {
        return fetch('http://localhost:9000/rest/subscribe', {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': 'http://localhost:9000',
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                event: event,
                characterId: characterId,
            })
        });
    },
    getSubscribedRaids() {
        return fetch(`http://127.0.0.1:9000/rest/subscribedRaids`, {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Accept': 'application/json'
            }
        })
    }
}
