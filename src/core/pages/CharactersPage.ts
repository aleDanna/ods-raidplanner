import pageBuilder from '@core/common/pageBuilder';
import { ContentTitle } from '@core/ui/atoms/ContentTitle/ContentTitle';
import { Characters } from '@core/ui/components/Characters/Characters';
import { AsyncComponentLoader } from '@core/ui/atoms/AsyncComponentLoader/AsyncComponentLoader';
import restClient from '@core/services/restClient';
import windowUtils from '@core/common/windowUtils';

export const CharactersPage = () => {

  windowUtils.checkAuthenticated();

  const loadRoles = () =>
    restClient.getRoles()
      .then(roles => {
        return roles;
      });

  const contentTitle = ContentTitle({nameTitle: 'Personaggi'});

  const mainComponent = AsyncComponentLoader({
    Component: Characters,
    asyncFn: loadRoles,
    componentProps: {},
    propFetched: 'roles'
  });

  return pageBuilder.build(contentTitle, mainComponent);
};
