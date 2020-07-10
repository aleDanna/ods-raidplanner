import {useState} from "react";
import {Button, Col, Container, Form, Modal, Row} from "react-bootstrap";
import * as React from "react";
import restClient from "@shared/services/restClient";
import {ContentTitle} from "@shared/components/ContentTitle/ContentTitle";
import {RaidCard} from "@shared/components/RaidCard/RaidCard";
import RaidTransformer from "../../../utils/raidTransformer";
import {EmptyEvent, EventInterface} from "../../../datatypes/event-datatype";

export const EventSearch = ({history, groups}) => {

    const [eventToDelete, setEventToDelete] = useState(EmptyEvent);
    const DeleteEventModal = ({show}) => {

        const modalProps = {
            show: show
        }

        const deleteEvent = () => {
            restClient.deleteEvent(eventToDelete.id)
                .then((res) => {
                    if (res.status === 200) {
                        setShowDeleteModal(false);
                        searchEvents();
                    }
                })
        }

        return (
            <Modal {...modalProps} >
                <Modal.Header>
                    <Modal.Title>Elimina evento {eventToDelete.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Sei sicuro di voler eliminare l'evento?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={deleteEvent}>
                        Elimina evento
                    </Button>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                        Annulla
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }

    const EMPTY_GROUP = "---";

    const [showResult, setShowResult] = useState(false);
    const [raids, setRaids] = useState<Array<EventInterface>>([]);

    const [groupFilter, setGroupFilter] = useState(EMPTY_GROUP);
    const [startDateFilter, setStartDateFilter] = useState("");
    const [endDateFilter, setEndDateFilter] = useState("");

    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const searchEvents = () => {
        restClient.getRaidsByFilter({
            startDateFilter: startDateFilter ? startDateFilter : null,
            endDateFilter: endDateFilter ? endDateFilter : null,
            groupFilter: groupFilter && groupFilter != EMPTY_GROUP ? groupFilter : null
        })
            .then(events => {
                setRaids(RaidTransformer.transform(events));
                setShowResult(true);
            })
    }

    const eventDetails = (eventId) => {
        history.push(`/rp/raid/${eventId}`);
    }

    const onDeleteHandler = (event) => {
        setEventToDelete(event);
        setShowDeleteModal(true);
    }

    return (
        <>
            <DeleteEventModal show={showDeleteModal}/>
            <Container className="ods_raidplanner_event-search-container">
                <Form noValidate>
                    <Form.Row>
                        <Form.Group as={Col} controlId="startDateFilterSearchEvent">
                            <Form.Label>Data inizio: </Form.Label>
                            <Form.Control required type="date" value={startDateFilter}
                                          onChange={e => setStartDateFilter(e.target.value)}/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="endDateFilterSearchEvent">
                            <Form.Label>Data fine: </Form.Label>
                            <Form.Control required type="date" value={endDateFilter}
                                          onChange={e => setEndDateFilter(e.target.value)}/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="raidGroupFilterSearchEvent">
                            <Form.Label>Evento: </Form.Label>
                            <Form.Control required as="select" value={groupFilter}
                                          onChange={e => setGroupFilter(e.target.value)}>
                                {groups.map(group => {
                                    return <option value={group.id}>{group.name}</option>
                                })}
                                <option selected value={EMPTY_GROUP}>{EMPTY_GROUP}</option>
                            </Form.Control>
                        </Form.Group>
                    </Form.Row>
                    <Button variant="primary" onClick={searchEvents}>
                        Cerca eventi
                    </Button>
                </Form>
            </Container>

            {showResult &&
            <>
                <ContentTitle nameTitle={raids.length === 0 ? "Nessun evento trovato" : "Eventi"} />
                <Container fluid="md" className="ods_raidplanner_event-search-result-container">
                    <Row>
                        {raids.map((item: EventInterface) => {
                            return (
                                <Col md="auto" xs={6} className="ods_raidplanner_event-search-result-event">
                                    <RaidCard event={item} />
                                    <Button variant="primary" size="sm" block onClick={() => eventDetails(item.id)}>
                                        Dettagli
                                    </Button>
                                    <Button variant="danger" size="sm" block onClick={() => onDeleteHandler(item)}>
                                        Elimina
                                    </Button>
                                </Col>
                            )
                        })}
                    </Row>
                </Container>
            </>
            }
        </>
    )

}
