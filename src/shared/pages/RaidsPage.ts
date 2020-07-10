import {Raids} from "@shared/components/Raids/Raids";
import {isMobile} from "react-device-detect";
import restClient from "../services/restClient";
import {AsyncComponentLoader} from "@shared/components/AsyncComponentLoader/AsyncComponentLoader";
import {ContentTitle} from "@shared/components/ContentTitle/ContentTitle";
import pageBuilder from "@shared/pages/pageBuilder";
import RaidTransformer from "../../utils/raidTransformer";

export const RaidsPage = (routeProps) => {
    const mode = routeProps.match.params.mode;

    const loadRaids = () =>
        restClient.getAvailableRaids()
            .then(data => {
                return restClient.getSubscribedRaids()
                    .then(ids => {
                        const subscribedEvents = ids.map(row => {return row.raid_ref})
                        const events = RaidTransformer.transform(data);
                        events.forEach(event => {
                            event.subscribed = subscribedEvents.indexOf(event.id) > -1
                        });
                        return events;
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
