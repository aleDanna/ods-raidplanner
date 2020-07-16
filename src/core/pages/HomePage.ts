import restClient from '@core/services/restClient';
import { AsyncComponentLoader } from '@core/ui/components/AsyncComponentLoader/AsyncComponentLoader';
import { ContentTitle } from '../ui/components/ContentTitle/ContentTitle';
import pageBuilder from '@core/common/pageBuilder';
import RaidTransformer from '@core/features/transformers/raidTransformer';
import { formatISODateString } from '@core/common/dateUtils';
import { Home } from '../ui/components/Home/Home';
import windowUtils from "@core/common/windowUtils";

export const HomePage = routeProps => {

  windowUtils.checkAuthenticated();

  const today = new Date();
  const nextWeek = new Date();
  nextWeek.setMonth(nextWeek.getMonth() + 1);

  const loadEvents = () =>
    restClient
      .getRaidsByFilter({
        startDateFilter: formatISODateString(today.toISOString(), 'yyyy-MM-dd'),
        endDateFilter: formatISODateString(nextWeek.toISOString(), 'yyyy-MM-dd')
      })
      .then(data => {
        return restClient.getSubscribedRaids().then(ids => {
          const subscribedEvents = ids.map(row => {
            return row.raid_ref;
          });
          const events = RaidTransformer.transform(data);
          events.forEach(event => {
            event.subscribed = subscribedEvents.indexOf(event.id) > -1;
          });
          return events;
        });
      });

  const titleComponent = ContentTitle({ nameTitle: 'Home' });
  const mainComponent = AsyncComponentLoader({
    Component: Home,
    asyncFn: loadEvents,
    componentProps: { history: routeProps.history },
    propFetched: 'events'
  });

  return pageBuilder.build(titleComponent, mainComponent);
};
