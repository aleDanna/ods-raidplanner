import * as React from 'react';
import {Container, Col, Row, Media} from "react-bootstrap";
import DayPicker from "react-day-picker";
import {isSameDay} from "date-fns";
import {ConfirmationModal} from "@shared/components/ConfirmationModal/ConfirmationModal";
import {calculateSubscriptions} from "../../../utils/dataUtils";
import {getDateTimeString} from "../../../utils/dateUtils";
import raidsCalendarModalFragments from "@shared/fragments/modalContents/RaidsCalendarModal";

export const RaidCalendar = ({items}) => {

    const CalendarModalComponent = ({event}) => {

        const modalOpener = <img src={require(`../../images/icons/${event.icon}.jpg`)} style={{width: "60px", height: "60px"}} />
        const subscribe = (event) => {
            console.log("Subscribed to event: ", event);
        };
        const unsubscribe = (event) => {
            console.log("Unsubscribed to event: ", event);
        };

        const modalProps = {
            modalOpener: modalOpener,
            title: event.title,
            content: event.subscribed ?
                raidsCalendarModalFragments.userSubscribedModalContent(event.description) :
                raidsCalendarModalFragments.userUnsubscribedModalContent(event.description, calculateSubscriptions(event.subscriptions)),
            confirmButtonText: event.subscribed ? "Rimuovi iscrizione" : "Iscriviti",
            closeButtonText: "Annulla",
            confirmAction: event.subscribed ? unsubscribe : subscribe,
            confirmButtonVariant: event.subscribed ? "danger" : "success"
        }

        return <ConfirmationModal {...modalProps}/>
    }

    function renderDay(day: Date) {
        let events = [];

        items.allowedRaidGroups.map(eventGroup => {
            const title = eventGroup.groupName;
            const imageIcon = eventGroup.imageName;
            return eventGroup.scheduledEvents.map(event => {
                return {
                    title: title,
                    start: event.start,
                    description: `${title} del ${getDateTimeString(event.start)}`,
                    subscriptions: event.subscriptions,
                    subscribed: event.subscribed,
                    icon: imageIcon
                }
            })
        }).forEach(elem => {events = events.concat(elem)});

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
