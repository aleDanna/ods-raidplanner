import * as React from 'react';
import {Col, Container, Row, Media, Button} from "react-bootstrap";
import {formatISODateString} from "../../../utils/dateUtils";

export const RaidsGrid = ({events}) => {

    const groupBy = (array, key) => {
        return array.reduce((result, currentValue) => {
            (result[currentValue[key]] = result[currentValue[key]] || []).push(
                currentValue
            );
            return result;
        }, {});
    };

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
                                        <Container fluid="md" className="ods_raidplanner_raidgrid-event-content">
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
                    {result} {current}
                </>
            )
        })
    }


    return (
        <Container className="ods_raidplanner_raidgrid-container">
            {generateGroups()}
        </Container>
    )
}
