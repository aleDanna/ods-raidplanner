import { AsyncComponentLoader } from '@core/ui/atoms/AsyncComponentLoader/AsyncComponentLoader';
import { ContentTitle } from '@core/ui/atoms/ContentTitle/ContentTitle';
import pageBuilder from '@core/common/pageBuilder';
import { RaidCalendar } from '@core/ui/components/RaidsCalendar/RaidCalendar';
import windowUtils from '@core/common/windowUtils';

export const RaidsCalendarPage = (routeProps) => {

  windowUtils.checkAuthenticated();

  async function emptyLoad () {
    console.log('loading calendar...');
    return {};
  }

  const titleComponent = ContentTitle({nameTitle: 'Calendario'});
  const mainComponent =
    AsyncComponentLoader({
      Component: RaidCalendar,
      asyncFn: emptyLoad,
      componentProps: {history: routeProps.history},
      propFetched: ''
    });

  return pageBuilder.build(titleComponent, mainComponent);
};
