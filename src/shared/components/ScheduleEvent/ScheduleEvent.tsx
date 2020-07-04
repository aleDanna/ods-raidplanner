import React, {useState} from "react";
import {Alert, Button, Container, Form, Jumbotron, Modal, Row} from "react-bootstrap";
import {addTimeStringToDate, formatISODateString} from "../../../utils/dateUtils";
import restClient from "@shared/services/restClient";

export const ScheduleEvent = ({raidGroups}) => {
    const START_TIME_DEFAULT_VALUE = "21:30";
    const END_TIME_DEFAULT_VALUE = "00:30";
    const RECURRENT_DEFAULT_VALUE = false;
    const EVENT_DATE_DEFAULT_VALUE = formatISODateString(new Date().toISOString(), "yyyy-MM-dd");
    const EMPTY_RAID_GROUP = "---";

    const [selectedRaidGroup, setSelectedRaidGroup] = useState(EMPTY_RAID_GROUP);
    const [eventDate, setEventDate] = useState(EVENT_DATE_DEFAULT_VALUE);
    const [startTime, setStartTime] = useState(START_TIME_DEFAULT_VALUE);
    const [endTime, setEndTime] = useState(END_TIME_DEFAULT_VALUE);
    const [recurrent, setRecurrent] = useState(RECURRENT_DEFAULT_VALUE);

    const [showDifferentDayModal, setShowDifferentDayModal] = useState(false);
    const [showCreatedEventModal, setShowCreatedEventModal] = useState(false);

    const differentDayModalOptions = {
        show: showDifferentDayModal
    }

    const eventCreatedModalOptions = {
        show: showCreatedEventModal
    }

    const validator = {
        invalidDate:() => {
            const today = new Date();
            today.setHours(0);
            today.setMinutes(0);
            today.setSeconds(0);
            return new Date(eventDate) < today
        },
        invalidRaidGroup: () => {
            return selectedRaidGroup === EMPTY_RAID_GROUP;
        }
    }

    const saveRaid = (startDate, endDate, selectedRaidGroup, recurrent) => {
        const event = {
            startDate: startDate.toLocaleString(),
            endDate: endDate.toLocaleString(),
            raidGroup: selectedRaidGroup,
            recurrent: recurrent
        }
        setShowDifferentDayModal(false);
        restClient.scheduleEvent(event)
            .then(() => {
                setSelectedRaidGroup(EMPTY_RAID_GROUP);
                setEventDate(EVENT_DATE_DEFAULT_VALUE);
                setStartTime(START_TIME_DEFAULT_VALUE);
                setEndTime(END_TIME_DEFAULT_VALUE);
                setRecurrent(RECURRENT_DEFAULT_VALUE);

                setShowCreatedEventModal(true)
            })
    }

    const submit = (evt) => {
        const startDate = addTimeStringToDate(eventDate, startTime);
        const endDate = addTimeStringToDate(eventDate, endTime);

        if (new Date(endDate) < new Date(startDate)) {
            setShowDifferentDayModal(true);
        }
        else {
            saveRaid(startDate, endDate, selectedRaidGroup, recurrent);
        }
        evt.preventDefault();
        evt.stopPropagation();
    }

    const changeEndDateAndScheduleEvent = () => {
        const startDate = addTimeStringToDate(eventDate, startTime);
        const date = new Date(eventDate);
        date.setDate(date.getDate() + 1);
        const eventEndDate = formatISODateString(date.toISOString(), "yyyy-MM-dd");
        const newEndDate = addTimeStringToDate(eventEndDate, endTime);
        saveRaid(startDate, newEndDate, selectedRaidGroup, recurrent);
    }

    const handleRaidGroupChange = (evt) => {
        const raidGroup = evt.target.value;
        setSelectedRaidGroup(raidGroup);
    }

    const handleDateChange = (evt) => {
        const date = evt.target.value;
        setEventDate(date);
    }

    return (
        <Container className="ods_raidplanner_schedule-event-container">
            <Modal {...differentDayModalOptions} >
                <Modal.Header closeButton>
                    <Modal.Title>Creazione evento</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>La data di fine é precedente alla data di inizio.</p>
                    <p>Confermando la fine dell'evento slitterá al giorno successivo, confermare?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDifferentDayModal(false)}>
                        Annulla
                    </Button>
                    <Button variant={`primary`} onClick={changeEndDateAndScheduleEvent}>
                        Conferma
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal {...eventCreatedModalOptions} >
                <Modal.Header closeButton>
                    <Modal.Title>Evento creato!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>L'Evento é stato creato correttamente</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant={`primary`} onClick={() => setShowCreatedEventModal(false)}>
                        OK
                    </Button>
                </Modal.Footer>
            </Modal>
            <Row className="justify-content-md-center">
                <Jumbotron className="ods_raidplanner_schedule-event-jumbotron">
                    <h1>Crea nuovo evento</h1>
                    <Form noValidate onSubmit={submit}>
                        <Form.Group controlId="raidGroup">
                            <Form.Label>Tipo evento: </Form.Label>
                            <Form.Control required id="raidGroupForm"
                                          as="select"
                                          value={selectedRaidGroup}
                                          onChange={handleRaidGroupChange} >
                                <option key={0}>{EMPTY_RAID_GROUP}</option>
                                {raidGroups.map((value) => {return <option key={value.id} value={value.id}>{value.name}</option>})}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="dateTime">
                            <Form.Label>Data evento: </Form.Label>
                            <Form.Control type="date"
                                          value={eventDate}
                                          onChange={handleDateChange}
                                          isInvalid={validator.invalidDate()} />
                            <Form.Control type="time" value={startTime} onChange={(evt) => setStartTime(evt.target.value)} />
                            <Form.Control type="time" value={endTime} onChange={(evt) => setEndTime(evt.target.value)} />
                            <Form.Group controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="Evento ricorrente" checked={recurrent} onChange={() => setRecurrent(!recurrent)}/>
                            </Form.Group>
                            <Form.Control.Feedback type="invalid">
                                Data non valida
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Button disabled={validator.invalidDate() || validator.invalidRaidGroup()} variant="primary" type="submit">
                            Crea evento
                        </Button>
                    </Form>
                </Jumbotron>
            </Row>
        </Container>
    )
}
