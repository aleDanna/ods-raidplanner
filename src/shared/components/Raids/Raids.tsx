import * as React from 'react';
import {ContentTitle} from "../ContentTitle/ContentTitle";
import {RaidsGrid} from "../RaidsGrid/RaidsGrid";
import {Container} from "react-bootstrap";
import {RaidCalendar} from "../RaidsCalendar/RaidCalendar";

export const Raids = ({mode, groups, isMobile}) => {


    let title;
    let content = <RaidsGrid items={groups} />

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
