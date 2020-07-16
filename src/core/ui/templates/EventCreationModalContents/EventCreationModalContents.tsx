import React from 'react';

export const DifferentDayEventCreationModalContent = () => {
  return (
    <>
      <p>La data di fine é precedente alla data di inizio.</p>
      <p>Confermando la fine dell'evento slitterá al giorno successivo, confermare?</p>
    </>
  );
};

export const EventCreatedModalContent = () => {
  return <p>L'Evento é stato creato correttamente</p>;
};
