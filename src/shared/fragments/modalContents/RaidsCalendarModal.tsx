import * as React from "react";

export default {
    userUnsubscribedModalContent (description, currentSubscriptions) {
        return (
            <>
                <p>Confermare l'iscrizione all'evento {description}?</p>
                <p>Utenti attualmente iscritti: {currentSubscriptions}</p>
            </>
        )
    },

    userSubscribedModalContent (description) {
        return (
            <>
                <p>Sei giá iscritto all'evento {description}?</p>
                <p>Vuoi annullare l'iscrizione?</p>
            </>
        )
    }
}
