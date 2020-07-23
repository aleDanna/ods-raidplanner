import { ContentTitle } from '@core/ui/atoms/ContentTitle/ContentTitle';
import pageBuilder from '@core/common/pageBuilder';
import windowUtils from '@core/common/windowUtils';
import { RaidGrouping } from '@core/ui/components/RaidGrouping/RaidGrouping';

export const RaidGroupPage = routeProps => {

  windowUtils.checkAuthenticated();

  const subscriptions = routeProps.location.state.subscriptions;

  const title = ContentTitle({ nameTitle: 'Gruppi evento' });
  const mainComponent = RaidGrouping({subscriptions, history: routeProps.history});

  return pageBuilder.build(title, mainComponent);
};
