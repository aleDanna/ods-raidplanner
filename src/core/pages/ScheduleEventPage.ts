import { AsyncComponentLoader } from '@core/ui/atoms/AsyncComponentLoader/AsyncComponentLoader';
import { ScheduleEvent } from '@core/ui/components/ScheduleEvent/ScheduleEvent';
import subscriptionRestClient from '@core/services/restClient';
import { ContentTitle } from '@core/ui/atoms/ContentTitle/ContentTitle';
import pageBuilder from '@core/common/pageBuilder';
import windowUtils from '@core/common/windowUtils';

export const ScheduleEventPage = () => {

  windowUtils.checkAuthenticated();

  const loadRaidGroups = () =>
    subscriptionRestClient.getRaidGroups().then(data => {
      return data;
    });

  const contentTitle = ContentTitle({ nameTitle: 'Crea nuovo evento' });
  const mainComponent = AsyncComponentLoader({
    Component: ScheduleEvent,
    asyncFn: loadRaidGroups,
    componentProps: {},
    propFetched: 'raidGroups'
  });

  return pageBuilder.build(contentTitle, mainComponent);
};
