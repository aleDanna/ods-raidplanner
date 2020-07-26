import { UserProfile } from '@core/ui/components/UserProfile/UserProfile';
import pageBuilder from '@core/common/pageBuilder';
import { ContentTitle } from '@core/ui/atoms/ContentTitle/ContentTitle';
import windowUtils from '@core/common/windowUtils';

export const UserProfilePage = (routeProps) => {

  windowUtils.checkAuthenticated();

  const contentTitle = ContentTitle({nameTitle: 'Profilo'});
  const mainComponent = UserProfile(routeProps);

  return pageBuilder.build(contentTitle, mainComponent);
};
