import React, { useState } from 'react';
import { Alert, Button, Container, Form, Jumbotron, Row } from 'react-bootstrap';
import { addTimeStringToDate, formatISODateString } from '@core/common/dateUtils';
import restClient from '@core/services/restClient';

import styles from './ScheduleEvent.scss';
import { ODSModal } from '@core/ui/atoms/ConfirmationModal/ODSModal';
import { EmptyModalProps } from '@core/datatypes/ModalProps';

import {
  DifferentDayEventCreationModalContent,
  EventCreatedModalContent
} from '@core/ui/templates/EventCreationModalContents';
import { getGroupValue } from '@core/common/dataUtils';
import { EventScheduleProps } from '@core/datatypes/EventScheduleProps';
import { EmptyRaidGroup, RaidGroupProps } from '@core/datatypes/RaidGroupProps';

export const ScheduleEvent = ({ raidGroups }) => {
  const START_TIME_DEFAULT_VALUE = '21:30';
  const END_TIME_DEFAULT_VALUE = '00:30';
  const RECURRENT_DEFAULT_VALUE = false;
  const EVENT_DATE_DEFAULT_VALUE = formatISODateString(new Date().toISOString(), 'yyyy-MM-dd');

  const [selectedRaidGroup, setSelectedRaidGroup] = useState(-1);
  const [eventDate, setEventDate] = useState(EVENT_DATE_DEFAULT_VALUE);
  const [startTime, setStartTime] = useState(START_TIME_DEFAULT_VALUE);
  const [endTime, setEndTime] = useState(END_TIME_DEFAULT_VALUE);
  const [recurrent, setRecurrent] = useState(RECURRENT_DEFAULT_VALUE);
  const [showServerErrorAlert, setShowServerErrorAlert] = useState(false);

  const [modalProps, setModalProps] = useState(EmptyModalProps);

  const openModal = modalType => {
    const changeEndDateAndScheduleEvent = () => {
      const startDate = addTimeStringToDate(eventDate, startTime);
      const date = new Date(eventDate);
      date.setDate(date.getDate() + 1);
      const eventEndDate = formatISODateString(date.toISOString(), 'yyyy-MM-dd');
      const newEndDate = addTimeStringToDate(eventEndDate, endTime);
      saveRaid(startDate, newEndDate);
    };

    let title, content, confirmButtonText, closeButtonText, confirmAction;
    switch (modalType) {
      case 'DIFFERENT_DAY_MODAL':
        title = 'Creazione evento';
        content = <DifferentDayEventCreationModalContent />;
        confirmButtonText = 'Conferma';
        closeButtonText = 'Annulla';
        confirmAction = changeEndDateAndScheduleEvent;
        break;
      case 'EVENT_CREATED_MODAL':
        title = 'Evento creato!';
        content = <EventCreatedModalContent />;
        confirmButtonText = 'OK';
        // tslint:disable-next-line:no-empty
        confirmAction = () => {};
        break;
      default:
        console.error('tipo di modale sconosciuta');
    }

    setModalProps({
      modalShow: true,
      title: title,
      content: content,
      confirmButtonText: confirmButtonText,
      closeButtonText: closeButtonText,
      confirmAction: confirmAction,
      confirmButtonVariant: 'success',
      displayConfirm: true,
      reset: () => setModalProps(EmptyModalProps)
    });
  };

  const validator = {
    invalidDate: () => {
      const today = new Date();
      today.setHours(0);
      today.setMinutes(0);
      today.setSeconds(0);
      return new Date(eventDate) < today;
    },
    invalidRaidGroup: () => {
      return selectedRaidGroup === EmptyRaidGroup.id;
    }
  };

  async function saveRaid(startDate: any, endDate: any) {
    const eventToSave: EventScheduleProps = {
      raid: {
        startDate: startDate,
        endDate: endDate,
        raidGroup: {
          id: selectedRaidGroup
        }
      },
      recurrent: recurrent
    };
    setModalProps(EmptyModalProps);
    const event = await restClient.scheduleEvent(eventToSave, () => {
      setShowServerErrorAlert(true);
    });

    if (event) {
      setShowServerErrorAlert(false);
      setSelectedRaidGroup(EmptyRaidGroup.id);
      setEventDate(EVENT_DATE_DEFAULT_VALUE);
      setStartTime(START_TIME_DEFAULT_VALUE);
      setEndTime(END_TIME_DEFAULT_VALUE);
      setRecurrent(RECURRENT_DEFAULT_VALUE);

      openModal('EVENT_CREATED_MODAL');
    }
  }

  const submit = evt => {
    const startDate = addTimeStringToDate(eventDate, startTime);
    const endDate = addTimeStringToDate(eventDate, endTime);

    if (new Date(endDate) < new Date(startDate)) {
      openModal('DIFFERENT_DAY_MODAL');
    } else {
      saveRaid(startDate, endDate);
    }
    evt.preventDefault();
    evt.stopPropagation();
  };

  const handleRaidGroupChange = evt => {
    const raidGroup = evt.target.value;
    setSelectedRaidGroup(raidGroup);
  };

  const handleDateChange = evt => {
    const date = evt.target.value;
    setEventDate(date);
  };

  return (
    <Container className={styles.container}>
      {modalProps && modalProps.modalShow && <ODSModal {...modalProps} />}
      <Alert variant="danger" show={showServerErrorAlert}>
        Si é verificato un errore
      </Alert>
      <Row className="justify-content-center">
        <Jumbotron className={styles.jumbotron}>
          <Form noValidate onSubmit={submit}>
            <Form.Group controlId="raidGroup">
              <Form.Label>Tipo evento: </Form.Label>
              <Form.Control
                required
                id="raidGroupForm"
                as="select"
                value={selectedRaidGroup}
                onChange={handleRaidGroupChange}>
                <option key={0}>{EmptyRaidGroup.name}</option>
                {raidGroups.map((value: RaidGroupProps) => {
                  return (
                    <option key={value.id} value={value.id}>
                      {getGroupValue(value.name!).description}
                    </option>
                  );
                })}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="dateTime">
              <Form.Label>Data evento: </Form.Label>
              <Form.Control
                type="date"
                value={eventDate}
                onChange={handleDateChange}
                isInvalid={validator.invalidDate()}
              />
              <Form.Control type="time" value={startTime} onChange={evt => setStartTime(evt.target.value)} />
              <Form.Control type="time" value={endTime} onChange={evt => setEndTime(evt.target.value)} />
              <Form.Group controlId="formBasicCheckbox">
                <Form.Check
                  type="checkbox"
                  label="Evento ricorrente"
                  checked={recurrent}
                  onChange={() => setRecurrent(!recurrent)}
                />
              </Form.Group>
              <Form.Control.Feedback type="invalid">Data non valida</Form.Control.Feedback>
            </Form.Group>
            <Button disabled={validator.invalidDate() || validator.invalidRaidGroup()} variant="primary" type="submit">
              Crea evento
            </Button>
          </Form>
        </Jumbotron>
      </Row>
    </Container>
  );
};
