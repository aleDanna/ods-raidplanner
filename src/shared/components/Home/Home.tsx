import {Alert, Button, Col, Container, Row} from "react-bootstrap";
import {EventInterface} from "../../../datatypes/event-datatype";
import {RaidCard} from "@shared/components/RaidCard/RaidCard";
import * as React from "react";
import sessionStorageService from "@shared/services/sessionStorageService";
import {ContentTitle} from "@shared/components/ContentTitle/ContentTitle";


export const Home = ({history, events}) => {

    const userData = sessionStorageService.get("loggedUser");
    const isAdmin = userData.role === "ADMIN";
    const subscribedEvents = events.filter(event => event.subscribed);

    const eventDetails = (eventId) => {
        history.push(`/rp/raid/${eventId}`);
    }

    return (
        <>
            <ContentTitle nameTitle="I tuoi eventi" />
            <Container fluid="md" className="ods_raidplanner_home-container">
                <Row className="justify-content-md-center">
                    {subscribedEvents.length > 0 && subscribedEvents.map((item: EventInterface) => {
                        return (
                            <Col md="auto" xs={6} className="ods_raidplanner_home-event">
                                <RaidCard event={item} />
                                <Button variant="primary" size="sm" block onClick={() => eventDetails(item.id)}>
                                    Dettagli
                                </Button>
                            </Col>
                        )
                    })}
                    {subscribedEvents.length === 0 &&
                    <Alert variant="warning">
                        Non sei iscritto ad alcun evento. Vai su Raid per iscriverti ad un evento disponibile!
                    </Alert>
                    }
                </Row>
            </Container>

            {isAdmin &&
            <>
                <ContentTitle nameTitle="Prossimi eventi" />
                <Container fluid="md" className="ods_raidplanner_home-container">
                    <Row className="justify-content-md-center">
                        {events.map((item: EventInterface) => {
                            return (
                                <Col md="auto" xs={6} className="ods_raidplanner_home-event">
                                    <RaidCard event={item} />
                                    <Button variant="primary" size="sm" block onClick={() => eventDetails(item.id)}>
                                        Dettagli
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
