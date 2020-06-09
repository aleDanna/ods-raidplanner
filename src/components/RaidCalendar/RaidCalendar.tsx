import * as React from 'react';
import {Container} from "react-bootstrap";
import {parseISO} from "date-fns";
import DayPicker from "react-day-picker";


export const RaidCalendar = ({items}) => {

    let result = [];

    items.allowedRaidGroups.map(eventGroup => {
        const title = eventGroup.groupName;
        return eventGroup.scheduledEvents.map(event => {
            return {
                title: title,
                start: '2020-06-17',
                end: '2020-06-17',
                eventClasses: 'optionalEvent',
                description: title,
            }
        })
    }).forEach(elem => {result = result.concat(elem)})

    return (
        <Container className="ods_raidplanner_raidcalendar-container">
            <DayPicker
                canChangeMonth={false}
                className="Raids"
            />
        </Container>
    )
}