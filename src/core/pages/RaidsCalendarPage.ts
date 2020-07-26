import { ContentTitle } from '@core/ui/atoms/ContentTitle/ContentTitle';
import pageBuilder from '@core/common/pageBuilder';
import { RaidCalendar } from '@core/ui/components/RaidsCalendar/RaidCalendar';

export const RaidsCalendarPage = (routeProps) => {

  const titleComponent = ContentTitle({nameTitle: 'Calendario'});
  const mainComponent = RaidCalendar({history: routeProps.history});

  return pageBuilder.build(titleComponent, mainComponent);
};
