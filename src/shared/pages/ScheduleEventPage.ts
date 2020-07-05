import {AsyncComponentLoader} from "@shared/components/AsyncComponentLoader/AsyncComponentLoader";
import {ScheduleEvent} from "@shared/components/ScheduleEvent/ScheduleEvent";
import subscriptionRestClient from "@shared/services/restClient";

export const ScheduleEventPage = () => {

    const loadRaidGroups = () =>
        subscriptionRestClient.getRaidGroups()
            .then(data => {
                return data;
            });

    return AsyncComponentLoader({
        Component: ScheduleEvent,
        asyncFn: loadRaidGroups,
        componentProps: {},
        propFetched: 'raidGroups'
    });
}
