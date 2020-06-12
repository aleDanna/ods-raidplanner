import * as React from 'react';
import {Container, Col, Row, Media} from "react-bootstrap";
import DayPicker from "react-day-picker";
import {isSameDay, parseISO} from "date-fns";


export const RaidCalendar = ({items}) => {

    let events = [];

    items.allowedRaidGroups.map(eventGroup => {
        const title = eventGroup.groupName;
        const imageIcon = eventGroup.imageName;
        return eventGroup.scheduledEvents.map(event => {
            return {
                title: title,
                start: event.start,
                description: title,
                icon: imageIcon
            }
        })

    }).forEach(elem => {events = events.concat(elem)});

    function renderDay(day: Date) {
        events = events.filter(item => {
            return isSameDay(new Date(item.start), day);
        });

        return (
            <Container>
                <Row>
                    <Col md className="ods_raidplanner_raidcalendar-cell-day">
                        {day.getDate()}
                    </Col>
                </Row>
                <Container fluid className="ods_raidplanner_raidcalendar-icons">
                    <Row className="ods_raidplanner_raidcalendar-icons">
                        {events.map((value, _) => {
                            return <Col md={4}>
                                <Media>
                                    <a className="ods_raidplanner_raidcalendar-icon-container" onClick={event => openPopup(event, value)}>
                                        <img src={`/static/images/${value.icon}.jpg`} style={{width: "60px", height: "60px"}}/>
                                    </a>
                                </Media>
                                </Col>
                        })}
                    </Row>
                </Container>
            </Container>
        )
    }

    const openPopup = (click, event) => {
        console.log(click);
        console.log(event);
    };

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