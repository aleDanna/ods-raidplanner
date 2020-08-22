import * as React from 'react';
import { getGroupValue } from '@core/common/dataUtils';

export const UserSubscribeModalContent = ({ event, subscriptions }) => {
  return (
    <>
      <p>{`Confermare l'iscrizione all'evento ${getGroupValue(event.raidGroup.name).description}
       del ${event.startDate}?`}</p>
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

export const UserUnsubscribeModalContent = ({ event }) => {
  return (
    <>
      <p>{`Sei giá iscritto all'evento ${getGroupValue(event.raidGroup.name).description} del ${event.startDate}`}</p>
      <p>Vuoi annullare l'iscrizione?</p>
    </>
  );
};

export const UserNotAllowedToRegister = () => {
  return (<p>Non sei abilitato a registrarti a questo evento</p>);
};
