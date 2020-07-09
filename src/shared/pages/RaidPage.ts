import restClient from "../services/restClient";
import {AsyncComponentLoader} from "@shared/components/AsyncComponentLoader/AsyncComponentLoader";
import {Raid} from "@shared/components/Raid/Raid";
import {ContentTitle} from "@shared/components/ContentTitle/ContentTitle";
import {Container} from "react-bootstrap";
import * as React from "react";
import pageBuilder from "@shared/pages/pageBuilder";

export const RaidPage = (routeProps) => {
    const id = routeProps.match.params.raidId;

    const loadRaid = () =>
        restClient.getRaidDetails(id)
            .then(raid => {
                return restClient.getSubscriptionsFor(id)
                    .then(subscriptions => {
                        raid.subscriptions = subscriptions;
                        return raid;
                    })
            });


    const title = ContentTitle({nameTitle: "Dettagli evento"})
    const mainComponent = AsyncComponentLoader({
        Component: Raid,
        asyncFn: loadRaid,
        componentProps: {},
        propFetched: 'raid'
    });

    return pageBuilder.build(title, mainComponent);
}
