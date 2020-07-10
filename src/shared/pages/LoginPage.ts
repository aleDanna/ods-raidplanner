import {Login} from "@shared/components/Login/Login";
import {ContentTitle} from "@shared/components/ContentTitle/ContentTitle";
import pageBuilder from "@shared/pages/pageBuilder";

export const LoginPage = (routeProps) => {

    const title = ContentTitle({nameTitle: "Login"});
    const mainComponent = Login({history: routeProps.history});

    return pageBuilder.build(title, mainComponent);
}
