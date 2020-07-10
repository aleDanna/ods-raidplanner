import restClient from "../services/restClient";
import {AsyncComponentLoader} from "@shared/components/AsyncComponentLoader/AsyncComponentLoader";
import {Raid} from "@shared/components/Raid/Raid";
import {ContentTitle} from "@shared/components/ContentTitle/ContentTitle";
import {Container} from "react-bootstrap";
import * as React from "react";
import pageBuilder from "@shared/pages/pageBuilder";
import {EditUser} from "@shared/components/EditUser/EditUser";

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
