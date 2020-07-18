import restClient from '@core/services/restClient';
import { AsyncComponentLoader } from '@core/ui/atoms/AsyncComponentLoader/AsyncComponentLoader';
import { ContentTitle } from '../ui/atoms/ContentTitle/ContentTitle';
import pageBuilder from '@core/common/pageBuilder';
import RaidTransformer from '@core/features/transformers/raidTransformer';
import { formatISODateString } from '@core/common/dateUtils';
import { Home } from '../ui/components/Home/Home';
import windowUtils from "@core/common/windowUtils";

export const HomePage = routeProps => {

  windowUtils.checkAuthenticated();

  const today = new Date();
  const next2Weeks = new Date();
  next2Weeks.setDate(next2Weeks.getDate() + 14);

  const loadEvents = () =>
    restClient
      .getRaidsByFilter({
        startDateFilter: formatISODateString(today.toISOString(), 'yyyy-MM-dd'),
        endDateFilter: formatISODateString(next2Weeks.toISOString(), 'yyyy-MM-dd')
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
