import restClient from '../services/restClient';
import { AsyncComponentLoader } from '@core/ui/atoms/AsyncComponentLoader/AsyncComponentLoader';
import { ContentTitle } from '@core/ui/atoms/ContentTitle/ContentTitle';
import pageBuilder from '@core/common/pageBuilder';
import { RaidsGrid } from '@core/ui/components/RaidsGrid/RaidsGrid';

export const RaidsGridPage = (routeProps) => {

  async function loadRaids () {

    const today = new Date();
    const next2Weeks = new Date();
    next2Weeks.setDate(next2Weeks.getDate() + 14);

    return await restClient.getRaidsByFilter({
      startDateFilter: today,
      endDateFilter: next2Weeks
    });
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
