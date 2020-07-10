import {formatISODateString} from "../../../utils/dateUtils";
import {Container} from "react-bootstrap";
import * as React from "react";

export const RaidCard = ({event}) => {
    return (
        <Container fluid="md" className="ods_raidplanner_raidcard-content">
            <span>Evento: {event.title}</span>
            <span>Data: {formatISODateString(event.start, "dd-MM")}</span>
            <span>Ora: {formatISODateString(event.start, "hh:mm")}</span>
            <span>Day: {formatISODateString(event.start, "iii")}</span>
            <span>Iscrizioni: {event.subscriptions}</span>
        </Container>
    )
}
