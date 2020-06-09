import * as React from 'react';
import {ContentTitle} from "../ContentTitle/ContentTitle";
import {RaidGrid} from "../RaidGrid/RaidGrid";
import {Container} from 'react-bootstrap';
import {RaidCalendar} from "../RaidCalendar/RaidCalendar";

export const Raids = ({mode, groups, isMobile}) => {

    let title;
    let content = <RaidGrid items={groups} />

    if (mode === "grid") {
        title = "Raid disponibili";
    }

    if (mode === "calendar" && !isMobile) {
        title = "Calendario";
        content = <RaidCalendar items={groups} />
    }

   return (
       <Container fluid>
           <ContentTitle nameTitle={title} />
           {content}
       </Container>
   )
}