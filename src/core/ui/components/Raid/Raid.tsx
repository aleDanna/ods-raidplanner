import * as React from 'react';
import { useEffect, useState } from 'react';
import { Alert, Button, Col, Container, Jumbotron, Media, Row } from 'react-bootstrap';
import { calculateSubscriptions, getGroupValue } from '@core/common/dataUtils';
import sessionStorageService from '@core/services/sessionStorageService';
import subscriptionRestClient from '@core/services/restClient';
import windowUtils from '@core/common/windowUtils';

import styles from './Raid.scss';
import { EmptyUserProps } from '@core/datatypes/UserProps';
import { UserCard } from '@core/ui/atoms/UserCard/UserCard';
import { formatISODateString } from '@core/common/dateUtils';

export const Raid = ({ raid, history }) => {
  const [userData, setUserData] = useState(EmptyUserProps);
  const [serverErrorAlertShow, setServerErrorAlertShow] = useState(false);

  const onServerError = () => {
      setServerErrorAlertShow(true);
  };

  useEffect(() => {
    const userSession = sessionStorageService.get('loggedUser');
    if (userSession) {
      setUserData(userSession);
    }
  }, []);

  const [characterMissingShow, setCharacterMissingShow] = useState(false);

  const subscribe = () => {
    const characterId = sessionStorageService.get('selectedCharacter');
    if (characterId) {
      setCharacterMissingShow(false);
      subscriptionRestClient.subscribe(raid.id, characterId, onServerError).then(() => {
        windowUtils.reload();
        setServerErrorAlertShow(false);
      });
    } else {
      setCharacterMissingShow(true);
      windowUtils.scrollTop();
    }
  };

  const unsubscribe = () => {
    subscriptionRestClient.unsubscribe(raid.id, onServerError).then(() => {
      windowUtils.reload();
    });
  };

  const goToGroups = () => {
    history.push({
      pathname: `/raid/${raid.id}/groups`,
      state: { subscriptions: raid.subscriptions}
    });
  };

  return (
    <>
      <Alert variant="danger" show={serverErrorAlertShow} >
        Si é verificato un errore
      </Alert>
      <Container fluid className={styles.container}>
        <Alert variant="danger" show={characterMissingShow}>
          Seleziona un personaggio!
        </Alert>
        <Row className={`${styles.rowDetails} justify-content-center`}>
          <Jumbotron className={styles.jumbotron}>
            <Row className={`${styles.rowDetails} justify-content-center`}>
              <Media>
                <img src={require(`../../../assets/images/icons/${raid.raidGroup.imageName}.jpg`)} />
              </Media>
            </Row>
            <Row className={`${styles.rowDetails} justify-content-center`}>
              <Col md={3}>
                <span className={styles.basicLabel}>Evento: </span>
              </Col>
              <Col md={{ span: 8, offset: 1 }}>
                <span className={styles.basicLabel}>
                  <strong>{getGroupValue(raid.raidGroup.name).description}</strong></span>
              </Col>
            </Row>
            <Row className={`${styles.rowDetails} justify-content-center`}>
              <Col md={3}>
                <span className={styles.basicLabel}>Data: </span>
              </Col>
              <Col md={{ span: 8, offset: 1 }}>
                <span className={styles.basicLabel}><strong>{
                  formatISODateString(raid.startDate, 'dd-MM HH:mm')}</strong></span>
              </Col>
            </Row>
            <Row className={`${styles.rowDetails} justify-content-center`}>
              <Col md={3}>
                <span className={styles.basicLabel}>Iscrizioni: </span>
              </Col>
              <Col md={{ span: 8, offset: 1 }}>
                <span className={styles.basicLabel}><strong>{raid.subscriptions.length}</strong></span>
              </Col>
            </Row>
            <Row className={`${styles.rowDetails} justify-content-center`}>
              <Col md={3}>
                <span className={styles.basicLabel}>Gruppi: </span>
              </Col>
              <Col md={{ span: 8, offset: 1 }}>
              <span className={styles.basicLabel}><strong>
                {calculateSubscriptions(raid.subscriptions.length).groups}
              </strong></span>
              </Col>
            </Row>
          </Jumbotron>
        </Row>

        {raid.subscriptions.length > 0 &&
        <Row className="justify-content-center">
          <Col md={12}>
            <span className={styles.basicLabel}><strong>Iscrizioni</strong></span>
          </Col>
          {raid.subscriptions.map(subscription => {
            return (
              <Col md={3} key={subscription.esoUsername}>
                <UserCard esoUsername={subscription.esoUsername}
                          characterName={subscription.character.name}
                          role={subscription.character.role}/>
              </Col>
            );
          })}
        </Row>
        }
        <Row className={`${styles.rowDetails} justify-content-center`}>
          <Col md={12}>
            {raid.subscriptions.filter(subscription =>
              subscription.esoUsername === userData.esoUsername).length === 0 ? (
              <Button variant="success" onClick={subscribe}>
                Iscriviti
              </Button>
            ) : (
              <Button variant="danger" onClick={unsubscribe}>
                Annulla iscrizione
              </Button>
            )}
            {userData.credential.role === 'ADMIN' && (
              <Button variant="primary" onClick={goToGroups}>
                Gruppi
              </Button>)}
          </Col>
        </Row>
      </Container>
    </>
  );
};
