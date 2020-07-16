import { isMobile } from 'react-device-detect';
import restClient from '../services/restClient';
import { AsyncComponentLoader } from '@core/ui/components/AsyncComponentLoader/AsyncComponentLoader';
import { ContentTitle } from '@core/ui/atoms/ContentTitle/ContentTitle';
import pageBuilder from '@core/common/pageBuilder';
import RaidTransformer from '@core/features/transformers/raidTransformer';
import { RaidCalendar } from '@core/ui/components/RaidsCalendar/RaidCalendar';
import { RaidsGrid } from '@core/ui/components/RaidsGrid/RaidsGrid';

export const RaidsPage = (routeProps) => {
  const mode = routeProps.match.params.mode;

  const loadRaids = () =>
    restClient.getAvailableRaids()
      .then(data => {
        return restClient.getSubscribedRaids()
          .then(ids => {
            const subscribedEvents = ids.map(row => {return row.raid_ref; });
            const events = RaidTransformer.transform(data);
            events.forEach(event => {
              event.subscribed = subscribedEvents.indexOf(event.id) > -1;
            });
            return events;
          });
      });

  const isCalendarView = mode === 'calendar' && !isMobile;
  const title = isCalendarView ? 'Calendario' : 'Raid disponibili';

  const titleComponent = ContentTitle({nameTitle: title});
  const mainComponent = isCalendarView ?
    RaidCalendar({history: routeProps.history}) :
    AsyncComponentLoader({
      Component: RaidsGrid,
      asyncFn: loadRaids,
      componentProps: {events: {}, history: routeProps.history},
      propFetched: 'events'
    });

  return pageBuilder.build(titleComponent, mainComponent);
};
