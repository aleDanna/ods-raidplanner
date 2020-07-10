import {UserProfile} from "@shared/components/UserProfile/UserProfile";
import pageBuilder from "@shared/pages/pageBuilder";
import {ContentTitle} from "@shared/components/ContentTitle/ContentTitle";

export const UserProfilePage = (routeProps) => {

    const contentTitle = ContentTitle({nameTitle: "Profilo"})
    const mainComponent = UserProfile(routeProps);

    return pageBuilder.build(contentTitle, mainComponent);
}
