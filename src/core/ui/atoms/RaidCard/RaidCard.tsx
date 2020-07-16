import { formatISODateString } from '@core/common/dateUtils';
import { Container } from 'react-bootstrap';
import * as React from 'react';

import styles from './RaidCard.scss';

export const RaidCard = ({ event }) => {
  return (
    <Container fluid="md" className={styles.content}>
      <span>Evento: {event.title}</span>
      <span>Data: {formatISODateString(event.start, 'dd-MM')}</span>
      <span>Ora: {formatISODateString(event.start, 'hh:mm')}</span>
      <span>Day: {formatISODateString(event.start, 'iii')}</span>
      <span>Iscrizioni: {event.subscriptions}</span>
    </Container>
  );
};
