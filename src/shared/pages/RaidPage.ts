import restClient from "../services/restClient";
import {AsyncComponentLoader} from "@shared/components/AsyncComponentLoader/AsyncComponentLoader";
import {Raid} from "@shared/components/Raid/Raid";

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

    return AsyncComponentLoader({
        Component: Raid,
        asyncFn: loadRaid,
        componentProps: {},
        propFetched: 'raid'
    });
}
