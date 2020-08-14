import restClient from '../services/restClient';
import { AsyncComponentLoader } from '@core/ui/atoms/AsyncComponentLoader/AsyncComponentLoader';
import { ContentTitle } from '@core/ui/atoms/ContentTitle/ContentTitle';
import pageBuilder from '@core/common/pageBuilder';
import { RaidsGrid } from '@core/ui/components/RaidsGrid/RaidsGrid';
import windowUtils from '@core/common/windowUtils';

export const RaidsGridPage = (routeProps) => {

  windowUtils.checkAuthenticated();

  async function loadRaids () {

    const today = new Date();
    const next2Weeks = new Date();
    next2Weeks.setDate(next2Weeks.getDate() + 14);

    return await restClient.getRaidsByFilter({
      startDateFilter: today,
      endDateFilter: next2Weeks
    }, (status) => console.error('Raids page failed to fetch events from backend: ', status));
  }

  const titleComponent = ContentTitle({nameTitle: 'Raid disponibili'});
  const mainComponent =
    AsyncComponentLoader({
      Component: RaidsGrid,
      asyncFn: loadRaids,
      componentProps: {history: routeProps.history},
      propFetched: 'events'
    });

  return pageBuilder.build(titleComponent, mainComponent);
};
