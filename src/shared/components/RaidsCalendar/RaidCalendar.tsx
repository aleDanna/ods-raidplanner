import * as React from 'react';
import {Container, Col, Row} from "react-bootstrap";
import DayPicker from "react-day-picker";
import {isSameDay} from "date-fns";
import {ConfirmationModal} from "@shared/components/ConfirmationModal/ConfirmationModal";
import {calculateSubscriptions} from "../../../utils/dataUtils";
import {getDateTimeString} from "../../../utils/dateUtils";
import {UserSubscribeModalContent, UserUnsubscribeModalContent} from "@shared/fragments/modalContents/RaidsCalendarModal";
import subscriptionRestClient from "../../services/subscriptionRestClient";

export const RaidCalendar = ({items}) => {

    const CalendarModalComponent = ({event}) => {

        const modalOpener = <img src={require(`../../images/icons/${event.icon}.jpg`)} style={{width: "60px", height: "60px"}} />
        const subscribe = () => {
            subscriptionRestClient.subscribe(event, {id: 1})
                .then(res => res.json())
                .then((data) => {
                    console.log(data);
                })
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

        const events = items.map(item => {
                return {
                    title: item.name,
                    start: item.start_date,
                    description: `${item.name} del ${getDateTimeString(item.start_date)}`,
                    subscriptions: item.subscriptions,
                    subscribed: item.subscribed,
                    eventId: item.id,
                    icon: item.image_name
                }
        });

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
            <DayPicker
                canChangeMonth={false}
                className="Raids"
                renderDay={renderDay}
            />
        </Container>
    )
};
