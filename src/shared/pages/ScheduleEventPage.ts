import {AsyncComponentLoader} from "@shared/components/AsyncComponentLoader/AsyncComponentLoader";
import {ScheduleEvent} from "@shared/components/ScheduleEvent/ScheduleEvent";
import subscriptionRestClient from "@shared/services/restClient";
import {ContentTitle} from "@shared/components/ContentTitle/ContentTitle";
import {Jumbotron} from "react-bootstrap";
import React from "react";
import pageBuilder from "@shared/pages/pageBuilder";

export const ScheduleEventPage = () => {

    const loadRaidGroups = () =>
        subscriptionRestClient.getRaidGroups()
            .then(data => {
                return data;
            });

    const contentTitle = ContentTitle({nameTitle: "Crea nuovo evento"});
    const mainComponent = AsyncComponentLoader({
        Component: ScheduleEvent,
        asyncFn: loadRaidGroups,
        componentProps: {},
        propFetched: 'raidGroups'
    });

    return pageBuilder.build(contentTitle, mainComponent);
}
