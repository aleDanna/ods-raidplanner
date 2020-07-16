import * as React from 'react';
import {Container, Alert, Col, Row, Media} from 'react-bootstrap';

import { ODSModal } from '@core/ui/atoms/ConfirmationModal/ODSModal';
import { calculateSubscriptions } from '@core/common/dataUtils';
import { UserSubscribeModalContent, UserUnsubscribeModalContent } from '@core/ui/templates/RaidsCalendarModalContents';
import restClient from '@core/services/restClient';
import sessionStorageService from '@core/services/sessionStorageService';
import { useState } from 'react';
import windowUtils from '@core/common/windowUtils';
import { EventProps } from '@core/datatypes/EventProps';
import { EmptyModalProps } from '@core/datatypes/ModalProps';

import styles from './RaidCalendar.scss';
import RaidTransformer from "@core/features/transformers/raidTransformer";

export const RaidCalendar = ({ history }) => {
  const [characterMissingShow, setCharacterMissingShow] = useState(false);
  const [modalProps, setModalProps] = useState(EmptyModalProps);
  const [events, setEvents] = useState(new Array<EventProps>());

  const openModal = event => {
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

  const formatEvents = (events: Array<EventProps>) => {
    return events.map(item => {
      return {
        title: item.title,
        start: item.start,
        end: null,
        extendedProps: {
          internalEvent: item,
        },
        description: item.description
      }
    })
  }

  const eventInfo = (calendarEvent) => {
    const eventInfo = calendarEvent.event._def.extendedProps.internalEvent;
    return (
      <Row className={styles.iconContainer}
           key={eventInfo.id}>
        <Col md={2}>
          <Media>
            <img
              src={require(`../../../assets/images/icons/${eventInfo.icon}.jpg`)}
              style={{ width: '25px', height: '25px' }}
            />
          </Media>
        </Col>
        <Col md={10}>
          <span><strong>{calendarEvent.event.title}</strong></span>
        </Col>
      </Row>
    );
  };

  const onMonthChange = (dateInfo) => {
    restClient.getRaidsByFilter({
      startDateFilter: dateInfo.startStr,
      endDateFilter: dateInfo.endStr,
      maxRank: sessionStorageService.get('loggedUser').rank
    })
      .then(data => {
        return restClient.getSubscribedRaids()
          .then(ids => {
            const subscribedEvents = ids.map(row => {return row.raid_ref; });
            const events = RaidTransformer.transform(data);
            events.forEach(event => {
              event.subscribed = subscribedEvents.indexOf(event.id) > -1;
            });
            setEvents(events);
          });
      });
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
