import pageBuilder from "@core/common/pageBuilder";
import {ContentTitle} from "@core/ui/atoms/ContentTitle/ContentTitle";
import {Characters} from "@core/ui/components/Characters/Characters";
import {AsyncComponentLoader} from "@core/ui/components/AsyncComponentLoader/AsyncComponentLoader";
import restClient from "@core/services/restClient";

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
