import { AppRoute } from '@core/common/routes';

import { LoginPage } from '@core/pages/LoginPage';
import { HomePage } from '@core/pages/HomePage';
import { RaidsPage } from '@core/pages/RaidsPage';
import { RaidPage } from '@core/pages/RaidPage';
import { ScheduleEventPage } from '@core/pages/ScheduleEventPage';

export const commonRoutes: AppRoute[] = [
  {
    path: '/',
    exact: true,
    component: HomePage
  },
  {
    path: '/login',
    exact: true,
    component: LoginPage
  },
  {
    path: '/raids/:mode',
    exact: true,
    component: RaidsPage
  },
  {
    path: '/raid/:raidId',
    exact: true,
    component: RaidPage
  },
  {
    path: '/admin/schedule',
    exact: true,
    component: ScheduleEventPage
  }
];
