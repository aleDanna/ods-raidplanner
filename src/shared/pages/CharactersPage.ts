import pageBuilder from "@shared/pages/pageBuilder";
import {ContentTitle} from "@shared/components/ContentTitle/ContentTitle";
import {Characters} from "@shared/components/Characters/Characters";
import {AsyncComponentLoader} from "@shared/components/AsyncComponentLoader/AsyncComponentLoader";
import restClient from "@shared/services/restClient";

export const CharactersPage = () => {

    const loadGroups = () =>
        restClient.getRoles()
            .then(roles => {
                return roles
            });

    const contentTitle = ContentTitle({nameTitle: "Personaggi"})

    const mainComponent = AsyncComponentLoader({
        Component: Characters,
        asyncFn: loadGroups,
        componentProps: {},
        propFetched: 'groups'
    });

    return pageBuilder.build(contentTitle, mainComponent);
}
