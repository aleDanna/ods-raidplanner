import { Alert, Button, Col, Container, Row } from 'react-bootstrap';
import { EventProps } from '@core/datatypes/EventProps';
import { RaidCard } from '../../atoms/RaidCard/RaidCard';
import * as React from 'react';
import sessionStorageService from '../../../common/sessionStorageService';
import { ContentTitle } from '../ContentTitle/ContentTitle';
import styles from './Home.scss';

export const Home = ({ history, events }) => {
  const userData = sessionStorageService.get('loggedUser');
  const isAdmin = userData.role === 'ADMIN';
  const subscribedEvents = events.filter(event => event.subscribed);

  const eventDetails = eventId => {
    history.push(`/raid/${eventId}`);
  };

  return (
    <>
      <ContentTitle nameTitle="I tuoi eventi" />
      <Container fluid="md" className={styles.container}>
        <Row className="justify-content-md-center">
          {subscribedEvents.length > 0 &&
            subscribedEvents.map((item: EventProps) => {
              return (
                <Col md="auto" key={item.id} xs={6} className={styles.event}>
                  <RaidCard event={item} />
                  <Button variant="primary" size="sm" block onClick={() => eventDetails(item.id)}>
                    Dettagli
                  </Button>
                </Col>
              );
            })}
          {subscribedEvents.length === 0 && (
            <Alert variant="warning">
              Non sei iscritto ad alcun evento. Vai su Raid per iscriverti ad un evento disponibile!
            </Alert>
          )}
        </Row>
      </Container>

      {isAdmin && (
        <>
          <ContentTitle nameTitle="Prossimi eventi" />
          <Container fluid="md" className={styles.container}>
            <Row className="justify-content-md-center">
              {events.map((item: EventProps) => {
                return (
                  <Col key={item.id} md="auto" xs={6} className={styles.event}>
                    <RaidCard event={item} />
                    <Button variant="primary" size="sm" block onClick={() => eventDetails(item.id)}>
                      Dettagli
                    </Button>
                  </Col>
                );
              })}
            </Row>
          </Container>
        </>
      )}
    </>
  );
};
