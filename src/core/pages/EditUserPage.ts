import restClient from '@core/services/restClient';
import { AsyncComponentLoader } from '@core/ui/atoms/AsyncComponentLoader/AsyncComponentLoader';
import { ContentTitle } from '@core/ui/atoms/ContentTitle/ContentTitle';
import pageBuilder from '@core/common/pageBuilder';
import { EditUser } from '@core/ui/components/EditUser/EditUser';
import windowUtils from '@core/common/windowUtils';

export const EditUserPage = (routeProps) => {

  windowUtils.checkAuthenticated();

  async function loadRoles() {
    return await restClient.getUserRoles();
  }

  const title = ContentTitle({nameTitle: 'Aggiorna utente'});
  const mainComponent = AsyncComponentLoader({
    Component: EditUser,
    asyncFn: loadRoles,
    componentProps: {},
    propFetched: 'roles'
  });

  return pageBuilder.build(title, mainComponent);
};
