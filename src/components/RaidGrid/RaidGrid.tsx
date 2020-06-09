import * as React from 'react';
import {Col, Container, Row, Media, Button} from "react-bootstrap";
import {formatISODateString} from "../../utils/dateUtils";

export const RaidGrid = ({items}) => {
    return (
        <Container className="ods_raidplanner_raidgrid-container">
            {items.allowedRaidGroups.map((value, _) => {
                return <Row>
                    <Col md={2} xs={12} className="ods_raidplanner_raidgrid-summary-column">
                        <Container className="ods_raidplanner_raidgrid-summary-content">
                            <Row>
                                {value.groupName}
                            </Row>
                            <Row>
                                <Media>
                                    <img src={`/static/images/${value.imageName}.jpg`} className="ods_raidplanner_groupcard-groupImage"/>
                                </Media>
                            </Row>
                        </Container>
                    </Col>
                    <Col>
                        <Container fluid="md">
                            <Row>
                                {value.scheduledEvents.map((value, _) => {
                                    return <Col md="auto" xs={6} className="ods_raidplanner_groupcard-event">
                                        <Container fluid="md" className="ods_raidplanner_groupcard-event-content">
                                            <span>Data: {formatISODateString(value.start, "dd-MM")}</span>
                                            <span>Ora: {formatISODateString(value.start, "hh:mm")}</span>
                                            <span>Day: {formatISODateString(value.start, "iii")}</span>
                                            <span>Iscrizioni: {value.subscriptions}</span>
                                        </Container>
                                        <Button variant={value.subscribed ? `danger` : `success`} size="sm" block>
                                            {value.subscribed ? 'Rimuovi' : 'Iscriviti'}
                                        </Button>
                                        <Button variant="secondary" size="sm" block>
                                            Dettagli evento
                                        </Button>
                                    </Col>
                                })}
                            </Row>
                        </Container>
                    </Col>
                </Row>
            })}
        </Container>
    )
}