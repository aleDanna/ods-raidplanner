import restClient from '../services/restClient';
import { AsyncComponentLoader } from '@core/ui/components/AsyncComponentLoader/AsyncComponentLoader';
import { Raid } from '@core/ui/components/Raid/Raid';
import { ContentTitle } from '@core/ui/components/ContentTitle/ContentTitle';
import pageBuilder from '@core/common/pageBuilder';

export const RaidPage = routeProps => {
  const id = routeProps.match.params.raidId;

  const loadRaid = () =>
    restClient.getRaidDetails(id).then(raid => {
      return restClient.getSubscriptionsFor(id).then(subscriptions => {
        raid.subscriptions = subscriptions;
        return raid;
      });
    });

  const title = ContentTitle({ nameTitle: 'Dettagli evento' });
  const mainComponent = AsyncComponentLoader({
    Component: Raid,
    asyncFn: loadRaid,
    componentProps: {},
    propFetched: 'raid'
  });

  return pageBuilder.build(title, mainComponent);
};
