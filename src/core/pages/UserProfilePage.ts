import {UserProfile} from "@core/ui/components/UserProfile/UserProfile";
import pageBuilder from "@core/common/pageBuilder";
import {ContentTitle} from "@core/ui/atoms/ContentTitle/ContentTitle";

export const UserProfilePage = (routeProps) => {

    const contentTitle = ContentTitle({nameTitle: "Profilo"})
    const mainComponent = UserProfile(routeProps);

    return pageBuilder.build(contentTitle, mainComponent);
}
