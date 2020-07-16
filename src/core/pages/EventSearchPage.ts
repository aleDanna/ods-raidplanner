import restClient from "../services/restClient";
import {AsyncComponentLoader} from "@core/ui/components/AsyncComponentLoader/AsyncComponentLoader";
import {ContentTitle} from "@core/ui/atoms/ContentTitle/ContentTitle";
import pageBuilder from "@core/common/pageBuilder";
import {EventSearch} from "@core/ui/components/EventSearch/EventSearch";

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
