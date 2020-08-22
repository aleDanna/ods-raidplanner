import { Alert, Button, Col, Container, Row } from 'react-bootstrap';
import { RaidProps } from '@core/datatypes/RaidProps';
import { RaidCard } from '../../atoms/RaidCard/RaidCard';
import * as React from 'react';
import sessionStorageService from '../../../services/sessionStorageService';
import { ContentTitle } from '../../atoms/ContentTitle/ContentTitle';
import styles from './Home.scss';

export const Home = ({ history, events }) => {
  const userData = sessionStorageService.get('loggedUser');
  const isAdmin = userData.credential.role === 'ADMIN';
  const subscribedEvents = events.filter(event => event.subscriptions.filter(
    subscription => subscription.character.userId === userData.id
  ));

  const eventDetails = eventId => {
    history.push(`/raid/${eventId}`);
  };

  return (
    <>
      <ContentTitle nameTitle="Eventi a cui sei iscritto" />
      <Container fluid="md" className={styles.container}>
        <Row className="justify-content-center">
          {subscribedEvents.length > 0 &&
            subscribedEvents.map((item: RaidProps) => {
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
            <Row className="justify-content-center">
              {events.map((item: RaidProps) => {
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
