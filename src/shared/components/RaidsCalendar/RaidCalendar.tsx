import * as React from 'react';
import {Container, Col, Row, Alert} from "react-bootstrap";
import DayPicker from "react-day-picker";
import {isSameDay} from "date-fns";
import {ConfirmationModal} from "@shared/components/ConfirmationModal/ConfirmationModal";
import {calculateSubscriptions} from "../../../utils/dataUtils";
import {getDateTimeString} from "../../../utils/dateUtils";
import {UserSubscribeModalContent, UserUnsubscribeModalContent} from "@shared/fragments/modalContents/RaidsCalendarModal";
import subscriptionRestClient from "../../services/subscriptionRestClient";
import sessionStorageService from "@shared/services/sessionStorageService";
import {useState} from "react";
import windowUtils from "../../../utils/windowUtils";

export const RaidCalendar = ({events}) => {

    const [characterMissingShow, setCharacterMissingShow] = useState(false);

    const CalendarModalComponent = ({event}) => {

        const modalOpener = <img src={require(`../../images/icons/${event.icon}.jpg`)} style={{width: "60px", height: "60px"}} />
        const subscribe = () => {
            const characterId = sessionStorageService.get("selectedCharacter");
            if (characterId) {
                setCharacterMissingShow(false);
                subscriptionRestClient.subscribe(event, characterId)
                    .then(() => {
                        windowUtils.reload();
                    })
            }
            else {
                setCharacterMissingShow(true);
            }
        }
        const unsubscribe = (event) => {
            console.log("Unsubscribed to event: ", event);
        };

        const modalProps = {
            modalOpener: modalOpener,
            title: event.title,
            content: event.subscribed ?
                <UserUnsubscribeModalContent description={event.description} /> :
                <UserSubscribeModalContent description={event.description} subscriptions={calculateSubscriptions(event.subscriptions)} />,
            confirmButtonText: event.subscribed ? "Rimuovi iscrizione" : "Iscriviti",
            closeButtonText: "Annulla",
            confirmAction: event.subscribed ? unsubscribe : subscribe,
            confirmButtonVariant: event.subscribed ? "danger" : "success"
        }

        return <ConfirmationModal {...modalProps}/>
    }

    function renderDay(day: Date) {

        const list = events.filter((item: any) => {
            return isSameDay(new Date(item.start), day);
        });

        return (
            <Container>
                <Row>
                    <Col md className="ods_raidplanner_raidcalendar-cell-day">
                        {day.getDate()}
                    </Col>
                </Row>
                <Container fluid>
                    <Row className="ods_raidplanner_raidcalendar-icons">
                        {list.map((value: any, index) => {
                            return <Col md={4} key={index}>
                                <div className="ods_raidplanner_raidcalendar-icon-container">
                                    <CalendarModalComponent event={value} />
                                </div>
                            </Col>;
                        })}
                    </Row>
                </Container>
            </Container>
        )
    }

    return (
        <Container className="ods_raidplanner_raidcalendar-container">
            <Alert variant="danger" show={characterMissingShow}>
                Seleziona un personaggio!
            </Alert>
            <DayPicker
                canChangeMonth={false}
                renderDay={renderDay}
            />
        </Container>
    )
};
