import restClient from "@core/services/restClient";
import {AsyncComponentLoader} from "@core/ui/atoms/AsyncComponentLoader/AsyncComponentLoader";
import {ContentTitle} from "@core/ui/atoms/ContentTitle/ContentTitle";
import pageBuilder from "@core/common/pageBuilder";
import {EditUser} from "@core/ui/components/EditUser/EditUser";

export const EditUserPage = (routeProps) => {

    const loadRoles = () =>
        restClient.getUserRoles()
            .then(userRoles => {
                return userRoles;
            });


    const title = ContentTitle({nameTitle: "Aggiorna utente"})
    const mainComponent = AsyncComponentLoader({
        Component: EditUser,
        asyncFn: loadRoles,
        componentProps: {},
        propFetched: 'roles'
    });

    return pageBuilder.build(title, mainComponent);
}
