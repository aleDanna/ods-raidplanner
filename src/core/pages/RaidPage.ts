import restClient from '../services/restClient';
import { AsyncComponentLoader } from '@core/ui/atoms/AsyncComponentLoader/AsyncComponentLoader';
import { Raid } from '@core/ui/components/Raid/Raid';
import { ContentTitle } from '@core/ui/atoms/ContentTitle/ContentTitle';
import pageBuilder from '@core/common/pageBuilder';
import windowUtils from '@core/common/windowUtils';

export const RaidPage = routeProps => {

  windowUtils.checkAuthenticated();

  const id = routeProps.match.params.raidId;

  async function loadRaid () {
    const raid = await restClient.getRaidDetails(id);
    for (const subscription of raid.subscriptions) {
      const valueDTO = await restClient.getEsoUsername(subscription.character.userId);
      subscription.esoUsername = valueDTO.value;
    }
    return raid;
  }

  const title = ContentTitle({ nameTitle: 'Dettagli evento' });
  const mainComponent = AsyncComponentLoader({
    Component: Raid,
    asyncFn: loadRaid,
    componentProps: {history: routeProps.history},
    propFetched: 'raid'
  });

  return pageBuilder.build(title, mainComponent);
};
