import * as React from 'react';
import {Col, Container, Row, Media, Button, Alert} from "react-bootstrap";
import {formatISODateString} from "../../../utils/dateUtils";
import sessionStorageService from "@shared/services/sessionStorageService";
import restClient from "@shared/services/restClient";
import windowUtils from "../../../utils/windowUtils";
import {useState} from "react";
import {RaidCard} from "@shared/components/RaidCard/RaidCard";

export const RaidsGrid = ({events, history}) => {

    const [characterMissingShow, setCharacterMissingShow] = useState(false);

    const groupBy = (array, key) => {
        return array.reduce((result, currentValue) => {
            (result[currentValue[key]] = result[currentValue[key]] || []).push(
                currentValue
            );
            return result;
        }, {});
    };

    const subscribe = (eventId) => {
        const characterId = sessionStorageService.get("selectedCharacter");
        if (characterId) {
            setCharacterMissingShow(false);
            restClient.subscribe(eventId, characterId)
                .then(() => {
                    windowUtils.reload();
                })
        }
        else {
            setCharacterMissingShow(true);
        }
    }

    const unsubscribe = (eventId) => {
        restClient.unsubscribe(eventId)
            .then(() => {
                windowUtils.reload();
            })
    };

    const eventDetails = (eventId) => {
        history.push(`/rp/raid/${eventId}`);
    }

    const events2group = groupBy(events, "title");

    const generateGroups = () => {
        const fragments = [];
        const groupRow = (title, imageName, events) => {
            return (
                <Row>
                    <Col md={2} xs={12} className="ods_raidplanner_raidgrid-summary-column">
                        <Container className="ods_raidplanner_raidgrid-summary-content">
                            <Row>
                                {title}
                            </Row>
                            <Row>
                                <Media>
                                    <img src={require(`../../images/icons/${imageName}.jpg`)} className="ods_raidplanner_groupcard-groupImage"/>
                                </Media>
                            </Row>
                        </Container>
                    </Col>
                    <Col>
                        <Container fluid="md">
                            <Row>
                                {events.map((value, _) => {
                                    return <Col md="auto" xs={6} className="ods_raidplanner_raidgrid-event">
                                        <RaidCard event={value} />
                                        {value.subscribed ?
                                            <Button variant="danger" size="sm" block onClick={() => unsubscribe(value.id)}>
                                                Rimuovi iscrizione
                                            </Button> :
                                            <Button variant="success" size="sm" block onClick={() => subscribe(value.id)}>
                                                Iscriviti
                                            </Button>
                                        }
                                        <Button variant="secondary" size="sm" block onClick={() => eventDetails(value.id)}>
                                            Dettagli evento
                                        </Button>
                                    </Col>
                                })}
                            </Row>
                        </Container>
                    </Col>
                </Row>
            )}

        for (let title in events2group) {
            const events = events2group[title];
            const imageName = events[0].icon;
            // @ts-ignore
            fragments.push(groupRow(title, imageName, events));
        }

        // @ts-ignore
        return fragments.reduce((result, current) => {
            return (
                <>
                    {result}
                    <hr className="mt-3 mb-3"/>
                    {current}
                </>
            )
        }, <></>)
    }


    return (
        <Container className="ods_raidplanner_raidgrid-container">
            <Alert variant="danger" show={characterMissingShow}>
                Seleziona un personaggio!
            </Alert>
            {generateGroups()}
        </Container>
    )
}
