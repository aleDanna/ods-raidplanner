import { AppRoute } from '@core/common/routes';

import { LoginPage } from '@core/pages/LoginPage';
import { HomePage } from '@core/pages/HomePage';
import { RaidsPage } from '@core/pages/RaidsPage';
import { RaidPage } from '@core/pages/RaidPage';
import { ScheduleEventPage } from '@core/pages/ScheduleEventPage';
import {CharactersPage} from "@core/pages/CharactersPage";
import {EditUserPage} from "@core/pages/EditUserPage";
import {EventSearchPage} from "@core/pages/EventSearchPage";
import {SignUpPage} from "@core/pages/SignUpPage";
import {UserProfilePage} from "@core/pages/UserProfilePage";
import { RaidGroupPage } from '@core/pages/RaidGroupPage';

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
