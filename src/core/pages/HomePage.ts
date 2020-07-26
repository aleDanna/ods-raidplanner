import restClient from '@core/services/restClient';
import { AsyncComponentLoader } from '@core/ui/atoms/AsyncComponentLoader/AsyncComponentLoader';
import { ContentTitle } from '../ui/atoms/ContentTitle/ContentTitle';
import pageBuilder from '@core/common/pageBuilder';
import { Home } from '../ui/components/Home/Home';
import windowUtils from '@core/common/windowUtils';

export const HomePage = routeProps => {

  windowUtils.checkAuthenticated();

  async function loadEvents () {

    const today = new Date();
    const next2Weeks = new Date();
    next2Weeks.setDate(next2Weeks.getDate() + 14);

    return await restClient.getRaidsByFilter({
      startDateFilter: today,
      endDateFilter: next2Weeks
    });
  }

  const titleComponent = ContentTitle({ nameTitle: 'Home' });
  const mainComponent = AsyncComponentLoader({
    Component: Home,
    asyncFn: loadEvents,
    componentProps: { history: routeProps.history },
    propFetched: 'events'
  });

  return pageBuilder.build(titleComponent, mainComponent);
};
