import {Raids} from "@shared/components/Raids/Raids";
import {isMobile} from "react-device-detect";
import subscriptionRestClient from "../services/restClient";
import {AsyncComponentLoader} from "@shared/components/AsyncComponentLoader/AsyncComponentLoader";

export const RaidsPage = (routeProps) => {
    const mode = routeProps.match.params.mode;

    const loadRaids = () =>
        subscriptionRestClient.getAvailableRaidGroups()
            .then(data => {
                return subscriptionRestClient.getSubscribedRaids()
                    .then(ids => {
                        const subscribedEvents = ids.map(row => {return row.raid_ref})
                        console.log("subscribed raid ids fetched...", subscribedEvents)
                        data.map(event => {
                            return event['subscribed'] = subscribedEvents.indexOf(event.id) > -1;
                        });
                        return data;
                    });
            });

    const props = {mode: mode, isMobile: isMobile, raids: {}};

    return AsyncComponentLoader({
        Component: Raids,
        asyncFn: loadRaids,
        componentProps: props,
        propFetched: 'raids'
    });
}
