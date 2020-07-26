import restClient from '../services/restClient';
import { AsyncComponentLoader } from '@core/ui/atoms/AsyncComponentLoader/AsyncComponentLoader';
import { ContentTitle } from '@core/ui/atoms/ContentTitle/ContentTitle';
import pageBuilder from '@core/common/pageBuilder';
import { EventSearch } from '@core/ui/components/EventSearch/EventSearch';
import windowUtils from '@core/common/windowUtils';

export const EventSearchPage = (routeProps) => {

  windowUtils.checkAuthenticated();

  async function loadGroups() {
    return await restClient.getRaidGroups();
  }

  const titleComponent = ContentTitle({nameTitle: 'Cerca eventi'});
  const mainComponent = AsyncComponentLoader({
    Component: EventSearch,
    asyncFn: loadGroups,
    componentProps: {history: routeProps.history},
    propFetched: 'groups'
  });

  return pageBuilder.build(titleComponent, mainComponent);
};
