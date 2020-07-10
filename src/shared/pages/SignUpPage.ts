import {ContentTitle} from "@shared/components/ContentTitle/ContentTitle";
import pageBuilder from "@shared/pages/pageBuilder";
import {SignUp} from "@shared/components/SignUp/SignUp";

export const SignUpPage = (routeProps) => {

    const title = ContentTitle({nameTitle: "SignUp"});
    const mainComponent = SignUp({history: routeProps.history});

    return pageBuilder.build(title, mainComponent);
}
