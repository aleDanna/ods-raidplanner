import {Raids} from "@shared/components/Raids/Raids";
import {isMobile} from "react-device-detect";
import subscriptionRestClient from "../services/restClient";
import {AsyncComponentLoader} from "@shared/components/AsyncComponentLoader/AsyncComponentLoader";
import {ContentTitle} from "@shared/components/ContentTitle/ContentTitle";
import pageBuilder from "@shared/pages/pageBuilder";

export const RaidsPage = (routeProps) => {
    const mode = routeProps.match.params.mode;

    const loadRaids = () =>
        subscriptionRestClient.getAvailableRaids()
            .then(data => {
                return subscriptionRestClient.getSubscribedRaids()
                    .then(ids => {
                        const subscribedEvents = ids.map(row => {return row.raid_ref})
                        data.map(event => {
                            return event['subscribed'] = subscribedEvents.indexOf(event.id) > -1;
                        });
                        return data;
                    });
            });

    const props = {mode: mode, raids: {}, history: routeProps.history};

    const title = mode === "calendar" && !isMobile ? "Calendario" : "Raid disponibili";

    const titleComponent = ContentTitle({nameTitle: title})
    const mainComponent = AsyncComponentLoader({
        Component: Raids,
        asyncFn: loadRaids,
        componentProps: props,
        propFetched: 'raids'
    });

    return pageBuilder.build(titleComponent, mainComponent);
}
