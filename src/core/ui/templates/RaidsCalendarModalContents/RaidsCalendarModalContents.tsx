import * as React from 'react';

export const UserSubscribeModalContent = ({ description, subscriptions }) => {
  return (
    <>
      <p>Confermare l'iscrizione all'evento {description}?</p>
      <p>
        Utenti attualmente iscritti:
        <strong>
          {subscriptions.subscriptions}/{subscriptions.newGroupStack}
        </strong>
      </p>
      <p>
        Gruppi: <strong>{subscriptions.groups}</strong>
      </p>
      <p>
        {subscriptions.startNewGroupIfSubscribe &&
          `Iscrivendoti inizieranno le iscrizioni per un ${subscriptions.groups + 1}o gruppo, 
                        se non si raggiungono il numero di giocatori necessarie potresti 
                        non partecipare. Confermare comunque?`}
        {subscriptions.completeGroupIfSubscribe &&
          `Iscrivendoti chiuderai le iscrizioni per questo gruppo, continuare?`}
      </p>
    </>
  );
};

export const UserUnsubscribeModalContent = ({ description }) => {
  return (
    <>
      <p>Sei giá iscritto all'evento {description}?</p>
      <p>Vuoi annullare l'iscrizione?</p>
    </>
  );
};
