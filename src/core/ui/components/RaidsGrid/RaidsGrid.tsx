import * as React from 'react';
import { Col, Container, Row, Media, Button, Alert } from 'react-bootstrap';
import sessionStorageService from '@core/services/sessionStorageService';
import restClient from '@core/services/restClient';
import windowUtils from '@core/common/windowUtils';
import { useState } from 'react';
import { RaidCard } from '@core/ui/atoms/RaidCard/RaidCard';

import styles from './RaidsGrid.scss';
import { isMobile } from 'react-device-detect';

export const RaidsGrid = ({ events, history }) => {
  const [characterMissingShow, setCharacterMissingShow] = useState(false);

  const groupBy = (array, key) => {
    return array.reduce((result, currentValue) => {
      (result[currentValue[key]] = result[currentValue[key]] || []).push(currentValue);
      return result;
    }, {});
  };

  const subscribe = eventId => {
    const characterId = sessionStorageService.get('selectedCharacter');
    if (characterId) {
      setCharacterMissingShow(false);
      restClient.subscribe(eventId, characterId).then(() => {
        windowUtils.reload();
      });
    } else {
      setCharacterMissingShow(true);
    }
  };

  const unsubscribe = eventId => {
    restClient.unsubscribe(eventId).then(() => {
      windowUtils.reload();
    });
  };

  const eventDetails = eventId => {
    history.push(`/raid/${eventId}`);
  };

  const events2group = groupBy(events, 'title');

  const generateGroups = () => {
    const fragments = [];
    const groupRow = (title, imageName, eventList) => {
      return (
        <Row>
          <Col md={2} xs={12} className={styles.summaryColumn}>
            <Container className={styles.summaryContent}>
              <Row>{title}</Row>
              <Row>
                <Media>
                  <img src={require(`../../../assets/images/icons/${imageName}.jpg`)} />
                </Media>
              </Row>
            </Container>
          </Col>
          <Col>
            <Container fluid>
              <Row className={`${isMobile && 'justify-content-center'}`}>
                {eventList.map((value, _) => {
                  return (
                    <Col key={value.id} md="auto" xs={6} className={styles.raidgridEvent}>
                      <RaidCard event={value} />
                      {value.subscribed ? (
                        <Button variant="danger" size="sm" block onClick={() => unsubscribe(value.id)}>
                          Rimuovi iscrizione
                        </Button>
                      ) : (
                        <Button variant="success" size="sm" block onClick={() => subscribe(value.id)}>
                          Iscriviti
                        </Button>
                      )}
                      <Button variant="secondary" size="sm" block onClick={() => eventDetails(value.id)}>
                        Dettagli evento
                      </Button>
                    </Col>
                  );
                })}
              </Row>
            </Container>
          </Col>
        </Row>
      );
    };

    // tslint:disable-next-line:forin
    for (const title in events2group) {
      const raids = events2group[title];
      const imageName = raids[0].icon;
      // @ts-ignore
      fragments.push(groupRow(title, imageName, raids));
    }

    // @ts-ignore
    return fragments.reduce((result, current) => {
      return (
        <>
          {result}
          <hr className="mt-3 mb-3" />
          {current}
        </>
      );
    }, <></>);
  };

  return (
    <Container className={styles.container}>
      {events.length === 0 && (
        <Alert variant="warning">
          Non ci sono eventi disponibili nelle prossime due settimane.
          {isMobile && 'Usa la versione Desktop per accedere al calendario'}
        </Alert>
      )}
      <Alert variant="danger" show={characterMissingShow}>
        Seleziona un personaggio!
      </Alert>
      {generateGroups()}
    </Container>
  );
};
