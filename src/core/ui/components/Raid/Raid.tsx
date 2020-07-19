import * as React from 'react';
import { useEffect, useState } from 'react';
import { Alert, Button, Col, Container, Jumbotron, Media, Row } from 'react-bootstrap';
import { calculateSubscriptions } from '@core/common/dataUtils';
import sessionStorageService from '@core/services/sessionStorageService';
import subscriptionRestClient from '@core/services/restClient';
import windowUtils from '@core/common/windowUtils';

import styles from './Raid.scss';
import { EmptyUserProps } from '@core/datatypes/UserProps';

export const Raid = ({ raid }) => {
  const [userData, setUserData] = useState(EmptyUserProps);

  useEffect(() => {
    const loadUser = async () => {
      const userSession = sessionStorageService.get('loggedUser');
      if (userSession) {
        setUserData(userSession);
      }
    };
    loadUser();
  }, []);

  const [characterMissingShow, setCharacterMissingShow] = useState(false);

  const subscribe = () => {
    const characterId = sessionStorageService.get('selectedCharacter');
    if (characterId) {
      setCharacterMissingShow(false);
      subscriptionRestClient.subscribe(raid.id, characterId).then(() => {
        windowUtils.reload();
      });
    } else {
      setCharacterMissingShow(true);
      windowUtils.scrollTop();
    }
  };

  const unsubscribe = () => {
    subscriptionRestClient.unsubscribe(raid.id).then(() => {
      windowUtils.reload();
    });
  };

  return (
    <Container fluid className={styles.container}>
      <Alert variant="danger" show={characterMissingShow}>
        Seleziona un personaggio!
      </Alert>
      <Row className={`${styles.rowDetails} justify-content-center`}>
        <Jumbotron className={styles.jumbotron}>
          <Row className={`${styles.rowDetails} justify-content-center`}>
            <Media>
              <img src={require(`../../../assets/images/icons/${raid.icon}.jpg`)} />
            </Media>
          </Row>
          <Row className={`${styles.rowDetails} justify-content-center`}>
            <Col md={6}>
              <span className={styles.basicLabel}>Evento: </span>
            </Col>
            <Col md={6}>
              <span className={styles.basicLabel}><strong>{raid.title}</strong></span>
            </Col>
          </Row>
          <Row className={`${styles.rowDetails} justify-content-center`}>
            <Col md={6}>
              <span className={styles.basicLabel}>Data: </span>
            </Col>
            <Col md={6}>
              <span className={styles.basicLabel}><strong>{raid.start}</strong></span>
            </Col>
          </Row>
          <Row className={`${styles.rowDetails} justify-content-center`}>
            <Col md={6}>
              <span className={styles.basicLabel}>Iscrizioni: </span>
            </Col>
            <Col md={6}>
              <span className={styles.basicLabel}><strong>{raid.subscriptions.length}</strong></span>
            </Col>
          </Row>
          <Row className={`${styles.rowDetails} justify-content-center`}>
            <Col md={6}>
              <span className={styles.basicLabel}>Gruppi: </span>
            </Col>
            <Col md={6}>
              <span className={styles.basicLabel}><strong>
                {calculateSubscriptions(raid.subscriptions.length).groups}
              </strong></span>
            </Col>
          </Row>
          <Row className={`${styles.rowDetails} justify-content-center`}>
            <Col md={12}>
              <span className={styles.basicLabel}>Utenti iscritti: </span>
            </Col>
          </Row>
            {raid.subscriptions.map(user => {
              return (
                <Row className={`justify-content-center`}
                     key={user.eso_username}>
                    <span className={styles.userLabel}><strong>
                      {user.eso_username} - {user.character_name} ({user.role_name})
                    </strong></span>
                </Row>
              );
            })}
          <Row className={`${styles.rowDetails} justify-content-center`}>
            <Col md={12}>
              {raid.subscriptions.filter(item => item.eso_username === userData.esousername).length === 0 ? (
                <Button variant="success" onClick={subscribe}>
                  Iscriviti
                </Button>
              ) : (
                <Button variant="danger" onClick={unsubscribe}>
                  Annulla iscrizione
                </Button>
              )}
            </Col>
          </Row>
        </Jumbotron>
      </Row>
    </Container>
  );
};
