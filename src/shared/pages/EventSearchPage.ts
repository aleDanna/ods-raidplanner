import restClient from "../services/restClient";
import {AsyncComponentLoader} from "@shared/components/AsyncComponentLoader/AsyncComponentLoader";
import {ContentTitle} from "@shared/components/ContentTitle/ContentTitle";
import pageBuilder from "@shared/pages/pageBuilder";
import {EventSearch} from "@shared/components/EventSearch/EventSearch";

export const EventSearchPage = (routeProps) => {

    const loadGroups = () =>
        restClient.getRaidGroups()
            .then(data => {
                return data;
            });

    const titleComponent = ContentTitle({nameTitle: "Cerca eventi"})
    const mainComponent = AsyncComponentLoader({
        Component: EventSearch,
        asyncFn: loadGroups,
        componentProps: {history: routeProps.history},
        propFetched: 'groups'
    });

    return pageBuilder.build(titleComponent, mainComponent);
}
