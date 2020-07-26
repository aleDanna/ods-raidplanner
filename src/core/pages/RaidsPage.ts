import { isMobile } from 'react-device-detect';
import restClient from '../services/restClient';
import { AsyncComponentLoader } from '@core/ui/atoms/AsyncComponentLoader/AsyncComponentLoader';
import { ContentTitle } from '@core/ui/atoms/ContentTitle/ContentTitle';
import pageBuilder from '@core/common/pageBuilder';
import { RaidCalendar } from '@core/ui/components/RaidsCalendar/RaidCalendar';
import { RaidsGrid } from '@core/ui/components/RaidsGrid/RaidsGrid';

export const RaidsPage = (routeProps) => {
  const mode = routeProps.match.params.mode;

  async function loadRaids () {

    const today = new Date();
    const next2Weeks = new Date();
    next2Weeks.setDate(next2Weeks.getDate() + 14);

    return await restClient.getRaidsByFilter({
      startDateFilter: today,
      endDateFilter: next2Weeks
    });
  }

  async function emptyLoad () {
    console.log('loading calendar...');
    return routeProps.history;
  }

  const isCalendarView = mode === 'calendar' && !isMobile;
  const title = isCalendarView ? 'Calendario' : 'Raid disponibili';

  const titleComponent = ContentTitle({nameTitle: title});
  const mainComponent =
    AsyncComponentLoader({
      Component: isCalendarView ? RaidCalendar : RaidsGrid,
      asyncFn: isCalendarView ? emptyLoad : loadRaids,
      componentProps: isCalendarView ? {} : {events: {}, history: routeProps.history},
      propFetched: isCalendarView ? 'history' : 'events'
    });

  return pageBuilder.build(titleComponent, mainComponent);
};
