import { formatISODateString } from '@core/common/dateUtils';
import { Container } from 'react-bootstrap';
import * as React from 'react';

import styles from './RaidCard.scss';
import { getGroupValue } from '@core/common/dataUtils';

export const RaidCard = ({ event }) => {
  return (
    <Container fluid="md" className={styles.content}>      
      <span>Evento: {getGroupValue(event.raidGroup.name).description}</span>
      <span>Data: {formatISODateString(event.startDate, 'dd-MM')}</span>
      <span>Ora: {formatISODateString(event.startDate, 'hh:mm')}</span>
      <span>Day: {formatISODateString(event.startDate, 'iii')}</span>
      <span>Iscrizioni: {event.subscriptions.length}</span>
    </Container>
  );
};
