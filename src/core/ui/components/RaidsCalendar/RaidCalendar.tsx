import * as React from 'react';
import { Container, Alert, Col, Row, Media } from 'react-bootstrap';

import { ODSModal } from '@core/ui/atoms/ConfirmationModal/ODSModal';
import { calculateSubscriptions, getGroupValue } from '@core/common/dataUtils';
import { UserSubscribeModalContent, UserUnsubscribeModalContent } from '@core/ui/templates/RaidsCalendarModalContents';
import restClient from '@core/services/restClient';
import sessionStorageService from '@core/services/sessionStorageService';
import { useState } from 'react';
import windowUtils from '@core/common/windowUtils';
import { RaidProps } from '@core/datatypes/RaidProps';
import { EmptyModalProps } from '@core/datatypes/ModalProps';

import styles from './RaidCalendar.scss';

export const RaidCalendar = ({ history }) => {
  const userData = sessionStorageService.get('loggedUser');
  const [characterMissingShow, setCharacterMissingShow] = useState(false);
  const [modalProps, setModalProps] = useState(EmptyModalProps);
  const [events, setEvents] = useState(new Array<RaidProps>());

  const openModal = event => {

    const isSubscribed = event.subscriptions.filter(
      subscription => subscription.character.userId === userData.id).length > 0;

    const subscribe = () => {
      const characterId = sessionStorageService.get('selectedCharacter');
      if (characterId) {
        setCharacterMissingShow(false);
        restClient.subscribe(event.id, characterId).then(() => {
          windowUtils.reload();
        });
      } else {
        setCharacterMissingShow(true);
        windowUtils.scrollTop();
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
      title: getGroupValue(event.raidGroup.name).description,
      content: isSubscribed ? (
        <UserUnsubscribeModalContent event={event} />
      ) : (
        <UserSubscribeModalContent
          event={event}
          subscriptions={calculateSubscriptions(event.subscriptions.length)}
        />
      ),
      detailsActionText: 'Dettagli evento',
      confirmButtonText: isSubscribed ? 'Rimuovi iscrizione' : 'Iscriviti',
      closeButtonText: 'Annulla',
      detailsAction: () => eventDetails(event.id),
      confirmAction: isSubscribed ? unsubscribe : subscribe,
      confirmButtonVariant: isSubscribed ? 'danger' : 'success',
      reset: () => setModalProps(EmptyModalProps)
    });
  };

  const formatEvents = (eventList: Array<RaidProps>) => {
    return eventList.map(item => {
      return {
        title: getGroupValue(item.raidGroup.name!).description,
        start: item.startDate,
        end: null,
        extendedProps: {
          internalEvent: item,
        },
        description: 'FIX THIS!!!'
      };
    });
  };

  const eventInfo = (calendarEvent) => {
    const event = calendarEvent.event._def.extendedProps.internalEvent;
    return (
      <Row className={styles.iconContainer}
           key={event.id}>
        <Col md={2}>
          <Media>
            <img
              src={require(`../../../assets/images/icons/${event.raidGroup.imageName}.jpg`)}
              style={{ width: '25px', height: '25px' }}
            />
          </Media>
        </Col>
        <Col md={2}>
          <span><strong>{getGroupValue(event.raidGroup.name).description}</strong></span>
        </Col>
      </Row>
    );
  };

  async function onMonthChange(dateInfo: any) {

      const today = dateInfo.start;
      const next2Weeks = dateInfo.end;
      next2Weeks.setDate(next2Weeks.getDate() + 14);

      const result = await restClient.getRaidsByFilter({
        startDateFilter: today,
        endDateFilter: next2Weeks
      });

      setEvents(result);
  }

  const FullCalendar = require('@fullcalendar/react').default;
  const dayGridPlugin = require('@fullcalendar/daygrid').default;
  return (
    <Container className={styles.container}>
      {modalProps && modalProps.modalShow && <ODSModal {...modalProps} />}
      <Alert variant="danger" show={characterMissingShow}>
        Seleziona un personaggio!
      </Alert>
      <FullCalendar
        plugins={[ dayGridPlugin ]}
        events={formatEvents(events)}
        initialView="dayGridMonth"
        eventContent={eventInfo}
        eventClick={(e) => openModal(e.event._def.extendedProps.internalEvent)}
        height={700}
        width={700}
        datesSet={onMonthChange}
      />
    </Container>
  );
};
