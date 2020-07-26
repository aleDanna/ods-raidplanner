import { AppRoute } from '@core/common/routes';

import { LoginPage } from '@core/pages/LoginPage';
import { HomePage } from '@core/pages/HomePage';
import { RaidsGridPage } from '@core/pages/RaidsGridPage';
import { RaidPage } from '@core/pages/RaidPage';
import { ScheduleEventPage } from '@core/pages/ScheduleEventPage';
import { CharactersPage } from '@core/pages/CharactersPage';
import { EditUserPage } from '@core/pages/EditUserPage';
import { EventSearchPage } from '@core/pages/EventSearchPage';
import { SignUpPage } from '@core/pages/SignUpPage';
import { UserProfilePage } from '@core/pages/UserProfilePage';
import { RaidGroupPage } from '@core/pages/RaidGroupPage';
import { RaidsCalendarPage } from '@core/pages/RaidsCalendarPage';

export const commonRoutes: AppRoute[] = [
  {
    path: '/',
    exact: true,
    component: HomePage
  },
  {
    path: '/signup',
    exact: true,
    component: SignUpPage
  },
  {
    path: '/login',
    exact: true,
    component: LoginPage
  },
  {
    path: '/profile',
    exact: true,
    component: UserProfilePage
  },
  {
    path: '/raids/grid',
    exact: true,
    component: RaidsGridPage
  },
  {
    path: '/raids/calendar',
    exact: true,
    component: RaidsCalendarPage
  },
  {
    path: '/raid/:raidId',
    exact: true,
    component: RaidPage
  },
  {
    path: '/raid/:raidId/groups',
    exact: true,
    component: RaidGroupPage
  },
  {
    path: '/admin/schedule',
    exact: true,
    component: ScheduleEventPage
  },
  {
    path: '/characters',
    exact: true,
    component: CharactersPage
  },
  {
    path: '/admin/editUser',
    exact: true,
    component: EditUserPage
  },
  {
    path: '/admin/raids',
    exact: true,
    component: EventSearchPage
  }
];
