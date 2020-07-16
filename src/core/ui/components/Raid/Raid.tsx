import * as React from 'react';
import { useEffect, useState } from 'react';
import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap';
import { formatISODateString } from '@core/common/dateUtils';
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
    }
  };

  const unsubscribe = () => {
    subscriptionRestClient.unsubscribe(raid.id).then(() => {
      windowUtils.reload();
    });
  };

  return (
    <Container fluid>
      <Container className={styles.container}>
        <Alert variant="danger" show={characterMissingShow}>
          Seleziona un personaggio!
        </Alert>
        <Row className="justify-content-center">
          <Form>
            <Form.Group controlId="title">
              <Row className="justify-content-center">
                <Form.Label column md={4}>
                  <strong>Evento: </strong>
                </Form.Label>
                <Col md={8}>
                  <Form.Control className={styles.detail} plaintext readOnly value={raid.title} />
                </Col>
              </Row>
            </Form.Group>
            <Form.Group controlId="date">
              <Row className="justify-content-center">
                <Form.Label column md={4}>
                  <strong>Data: </strong>
                </Form.Label>
                <Col md={8}>
                  <Form.Control
                    className={styles.detail}
                    plaintext
                    readOnly
                    value={formatISODateString(raid.start_date, 'iii dd-MM hh:mm')}
                  />
                </Col>
              </Row>
            </Form.Group>
            <Form.Group controlId="subscriptions">
              <Row className="justify-content-center">
                <Form.Label column md={4}>
                  <strong>Iscrizioni: </strong>
                </Form.Label>
                <Col md={8}>
                  <Form.Control className={styles.detail} plaintext readOnly value={raid.subscriptions.length} />
                </Col>
              </Row>
            </Form.Group>

            <Form.Group controlId="groups">
              <Row className="justify-content-center">
                <Form.Label column md={4}>
                  <strong>Gruppi: </strong>
                </Form.Label>
                <Col md={8}>
                  <Form.Control
                    className={styles.detail}
                    plaintext
                    readOnly
                    value={calculateSubscriptions(raid.subscriptions.length).groups}
                  />
                </Col>
              </Row>
            </Form.Group>
            <Form.Group controlId="subscriptions-users">
              <Row className="justify-content-center">
                <Form.Label column md={4}>
                  <strong>Utenti iscritti: </strong>
                </Form.Label>
                <Col md={8}>
                  <Form.Control
                    className={`${styles.subscriptions} ${styles.detail}`}
                    as="select"
                    multiple
                    readOnly
                    plaintext>
                    {raid.subscriptions.map(user => {
                      return (
                        <option key={user.id} className={styles.subscriptions}>
                          {user.eso_username} - {user.character_name} ({user.role_name})
                        </option>
                      );
                    })}
                  </Form.Control>
                </Col>
              </Row>
            </Form.Group>
            <Form.Group controlId="submit">
              <Row className="justify-content-center">
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
            </Form.Group>
          </Form>
        </Row>
      </Container>
    </Container>
  );
};
