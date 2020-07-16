import * as React from 'react';
import { Container, Col, Row, Alert } from 'react-bootstrap';
import DayPicker from 'react-day-picker';
import { isSameDay } from 'date-fns';
import { ODSModal } from '@core/ui/atoms/ConfirmationModal/ODSModal';
import { calculateSubscriptions } from '@core/common/dataUtils';
import { UserSubscribeModalContent, UserUnsubscribeModalContent } from '@core/ui/templates/RaidsCalendarModalContents';
import restClient from '@core/services/restClient';
import sessionStorageService from '@core/common/sessionStorageService';
import { useState } from 'react';
import windowUtils from '@core/common/windowUtils';
import { EventProps } from '@core/datatypes/EventProps';
import { EmptyModalProps } from '@core/datatypes/ModalProps';

import styles from './RaidCalendar.scss';

export const RaidCalendar = ({ events, history }) => {
  const [characterMissingShow, setCharacterMissingShow] = useState(false);
  const [modalProps, setModalProps] = useState(EmptyModalProps);

  const openModal = event => {
    console.log('modal open for ', event);
    const subscribe = () => {
      const characterId = sessionStorageService.get('selectedCharacter');
      if (characterId) {
        setCharacterMissingShow(false);
        restClient.subscribe(event.id, characterId).then(() => {
          windowUtils.reload();
        });
      } else {
        setCharacterMissingShow(true);
      }
    };

    const unsubscribe = () => {
      restClient.unsubscribe(event.id).then(() => {
        windowUtils.reload();
      });
    };

    const eventDetails = eventId => {
      history.push(`/raid/${eventId}`);
    };

    setModalProps({
      modalShow: true,
      title: event.title,
      content: event.subscribed ? (
        <UserUnsubscribeModalContent description={event.description} />
      ) : (
        <UserSubscribeModalContent
          description={event.description}
          subscriptions={calculateSubscriptions(event.subscriptions)}
        />
      ),
      detailsActionText: 'Dettagli evento',
      confirmButtonText: event.subscribed ? 'Rimuovi iscrizione' : 'Iscriviti',
      closeButtonText: 'Annulla',
      detailsAction: () => eventDetails(event.id),
      confirmAction: event.subscribed ? unsubscribe : subscribe,
      confirmButtonVariant: event.subscribed ? 'danger' : 'success',
      reset: () => setModalProps(EmptyModalProps)
    });
  };

  const renderDay = (day: Date) => {
    const list = events.filter((item: any) => {
      return isSameDay(new Date(item.start), day);
    });

    return (
      <Container>
        <Row>
          <Col md className={styles.cellDay}>
            {day.getDate()}
          </Col>
        </Row>
        <Container fluid>
          <Row className={styles.icons}>
            {list.map((value: EventProps, index) => {
              return (
                <Col md={4} key={index}>
                  <div onClick={() => openModal(value)} className={styles.iconContainer}>
                    <img
                      src={require(`../../../assets/images/icons/${value.icon}.jpg`)}
                      style={{ width: '60px', height: '60px' }}
                    />
                  </div>
                </Col>
              );
            })}
          </Row>
        </Container>
      </Container>
    );
  };

  return (
    <Container className={styles.container}>
      {modalProps && modalProps.modalShow && <ODSModal {...modalProps} />}
      <Alert variant="danger" show={characterMissingShow}>
        Seleziona un personaggio!
      </Alert>
      <DayPicker canChangeMonth={false} renderDay={renderDay} />
    </Container>
  );
};
