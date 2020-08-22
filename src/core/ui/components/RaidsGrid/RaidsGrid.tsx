import * as React from 'react';
import { Col, Container, Row, Media, Button, Alert } from 'react-bootstrap';
import sessionStorageService from '@core/services/sessionStorageService';
import restClient from '@core/services/restClient';
import windowUtils from '@core/common/windowUtils';
import { useState } from 'react';
import { RaidCard } from '@core/ui/atoms/RaidCard/RaidCard';

import styles from './RaidsGrid.scss';
import { isMobile } from 'react-device-detect';
import { getGroupValue } from '@core/common/dataUtils';
import { RaidProps } from '@core/datatypes/RaidProps';

export const RaidsGrid = ({ events, history }) => {
  const [characterMissingShow, setCharacterMissingShow] = useState(false);
  const userData = sessionStorageService.get('loggedUser');

  const subscribe = eventId => {
    const characterId = sessionStorageService.get('selectedCharacter');
    if (characterId) {
      setCharacterMissingShow(false);
      restClient.subscribe(eventId, characterId).then(() => {
        windowUtils.reload();
      });
    } else {
      setCharacterMissingShow(true);
      windowUtils.scrollTop();
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

  const events2group = events.reduce((result, event) => {
    (result[event.raidGroup.name] = result[event.raidGroup.name] || []).push(event);
    return result;
  }, {});

  const isSubscribed = (event: RaidProps) => {
    return event.subscriptions!.filter(
      subscription => subscription.character.userId === userData.id).length > 0;
  };

  const generateGroups = () => {
    const fragments = [];
    const groupRow = (type, imageName, eventList) => {
      return (
        <Row>
          <Col md={2} xs={12} className={styles.summaryColumn}>
            <Container className={styles.summaryContent}>
              <Row>{getGroupValue(type).description}</Row>
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
                {eventList.map((event: RaidProps) => {
                  return (
                    <Col key={event.id} md="auto" xs={6} className={styles.raidgridEvent}>
                      <RaidCard event={event} />
                      {userData.rank >= event.raidGroup.rank!! ? isSubscribed(event) ? (
                        <Button variant="danger" size="sm" block onClick={() => unsubscribe(event.id)}>
                          Rimuovi iscrizione
                        </Button>
                      ) : (
                        <Button variant="success" size="sm" block onClick={() => subscribe(event.id)}>
                          Iscriviti
                        </Button>
                      ) : null }
                      <Button variant="secondary" size="sm" block onClick={() => eventDetails(event.id)}>
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
    for (const type in events2group) {
      const raids = events2group[type];
      console.log(events2group);
      console.log(raids);
      const imageName = raids[0].raidGroup.imageName;
      // @ts-ignore
      fragments.push(groupRow(type, imageName, raids));
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
