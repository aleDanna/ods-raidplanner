import * as React from 'react';
import {ContentTitle} from "../ContentTitle/ContentTitle";
import {RaidsGrid} from "../RaidsGrid/RaidsGrid";
import {Container} from "react-bootstrap";
import {RaidCalendar} from "../RaidsCalendar/RaidCalendar";
import {getDateTimeString} from "../../../utils/dateUtils";

export const Raids = ({mode, raids, isMobile, history}) => {

    const events = raids.map(item => {
        return {
            id: item.id,
            title: item.name,
            start: item.start_date,
            description: `${item.name} del ${getDateTimeString(item.start_date)}`,
            subscriptions: item.subscriptions,
            subscribed: item.subscribed,
            eventId: item.id,
            icon: item.image_name
        }
    });

    let title;
    let content = <RaidsGrid events={events} history={history} />

    if (mode === "grid") {
        title = "Raid disponibili";
    }

    if (mode === "calendar" && !isMobile) {
        title = "Calendario";
        content = <RaidCalendar events={events} history={history}/>
    }

   return (
       <Container fluid>
           <ContentTitle nameTitle={title} />
           {content}
       </Container>
   )
}
