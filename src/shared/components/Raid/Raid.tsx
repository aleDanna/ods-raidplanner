import * as React from 'react';
import {useState} from 'react';
import {Alert, Button, Col, Container, Form, Row} from "react-bootstrap";
import {formatISODateString} from "../../../utils/dateUtils";
import {calculateSubscriptions} from "../../../utils/dataUtils";
import sessionStorageService from "@shared/services/sessionStorageService";
import subscriptionRestClient from "@shared/services/restClient";
import windowUtils from "../../../utils/windowUtils";

export const Raid = ({raid}) => {

    const userData = sessionStorageService.get("loggedUser");
    const [characterMissingShow, setCharacterMissingShow] = useState(false);

    const subscribe = () => {
        const characterId = sessionStorageService.get("selectedCharacter");
        if (characterId) {
            setCharacterMissingShow(false);
            subscriptionRestClient.subscribe(raid.id, characterId)
                .then(() => {
                    windowUtils.reload();
                })
        }
        else {
            setCharacterMissingShow(true);
        }
    }

    const unsubscribe = () => {
        subscriptionRestClient.unsubscribe(raid.id)
            .then(() => {
                windowUtils.reload();
            })
    };

    return (
        <Container fluid>
            <Container className="ods_raidplanner_raid-container">
                <Alert variant="danger" show={characterMissingShow}>
                    Seleziona un personaggio!
                </Alert>
                <Row className="justify-content-md-center">
                    <Form>
                        <Form.Group controlId="title">
                            <Row className="justify-content-md-center">
                                <Form.Label column md={4}><strong>Evento: </strong></Form.Label>
                                <Col md={8}>
                                    <Form.Control className="ods_raidplanner_raid-detail" plaintext readOnly value={raid.title} />
                                </Col>
                            </Row>
                        </Form.Group>
                        <Form.Group controlId="date">
                            <Row className="justify-content-md-center">
                                <Form.Label column md={4}><strong>Data: </strong></Form.Label>
                                <Col md={8}>
                                    <Form.Control className="ods_raidplanner_raid-detail" plaintext readOnly value={formatISODateString(raid.start_date, "iii dd-MM hh:mm")} />
                                </Col>
                            </Row>
                        </Form.Group>
                        <Form.Group controlId="subscriptions">
                            <Row className="justify-content-md-center">
                                <Form.Label column md={4}><strong>Iscrizioni: </strong></Form.Label>
                                <Col md={8}>
                                    <Form.Control className="ods_raidplanner_raid-detail" plaintext readOnly value={raid.subscriptions.length} />
                                </Col>
                            </Row>
                        </Form.Group>

                        <Form.Group controlId="groups">
                            <Row className="justify-content-md-center">
                                <Form.Label column md={4}><strong>Gruppi: </strong></Form.Label>
                                <Col md={8}>
                                    <Form.Control className="ods_raidplanner_raid-detail" plaintext readOnly value={calculateSubscriptions(raid.subscriptions.length).groups} />
                                </Col>
                            </Row>
                        </Form.Group>
                        <Form.Group controlId="subscriptions-users">
                            <Row className="justify-content-md-center">
                                <Form.Label column md={4}><strong>Utenti iscritti: </strong></Form.Label>
                                <Col md={8}>
                                    <Form.Control className="ods_raidplanner_raid-subscriptions ods_raidplanner_raid-detail" as="select" multiple readOnly plaintext>
                                        {raid.subscriptions.map((user) => {
                                            return (<option key={user.id} className="ods_raidplanner_raid-subscriptions">
                                                {user.eso_username} - {user.character_name} ({user.role_name})
                                            </option>)
                                        })}
                                    </Form.Control>
                                </Col>
                            </Row>
                        </Form.Group>
                        <Form.Group controlId="submit">
                            <Row className="justify-content-md-center">
                                <Col md={12}>
                                    {raid.subscriptions.filter(item => item.eso_username === userData.eso_username).length === 0 ?
                                        <Button variant="success" onClick={subscribe}>Iscriviti</Button> :
                                        <Button variant="danger" onClick={unsubscribe}>Annulla iscrizione</Button>
                                    }
                                </Col>
                            </Row>
                        </Form.Group>
                    </Form>
                </Row>
            </Container>
        </Container>
    )
}
