import { Raids } from '@core/ui/components/Raids/Raids';
import { isMobile } from 'react-device-detect';
import restClient from '../services/restClient';
import { AsyncComponentLoader } from '@core/ui/components/AsyncComponentLoader/AsyncComponentLoader';
import { ContentTitle } from '@core/ui/components/ContentTitle/ContentTitle';
import pageBuilder from '@core/common/pageBuilder';
import RaidTransformer from '@core/features/transformers/raidTransformer';

export const RaidsPage = routeProps => {
  const mode = routeProps.match.params.mode;

  const loadRaids = () =>
    restClient.getAvailableRaids().then(data => {
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

  const props = { mode: mode, raids: {}, history: routeProps.history };

  const title = mode === 'calendar' && !isMobile ? 'Calendario' : 'Raid disponibili';

  const titleComponent = ContentTitle({ nameTitle: title });
  const mainComponent = AsyncComponentLoader({
    Component: Raids,
    asyncFn: loadRaids,
    componentProps: props,
    propFetched: 'raids'
  });

  return pageBuilder.build(titleComponent, mainComponent);
};
