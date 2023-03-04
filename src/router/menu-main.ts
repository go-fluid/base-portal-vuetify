import {users} from '@/services/repositories/users';
import {userRoles} from '@/services/repositories/user-roles';
import {translate} from '@/plugins/base/vuetify';
import {userAttributes} from '@/services/repositories/user-attributes';
import {createMenuItem} from '@/services/base/entity.crud';
import {events} from "@/services/repositories/events";

export const mainMenuItems = [
  {
    title: translate('$vuetify.home.pageTitle'),
    icon: translate('$vuetify.home.icon'),
    location: '/'
  },
  {
    title: translate('$vuetify.menu.reports.title'),
    icon: translate('$vuetify.menu.reports.icon'),
    location: '/reports'
  },
  {
    title: translate('$vuetify.menu.events.title'),
    icon: translate('$vuetify.menu.events.icon'),
    location: '/events'
  },
  {
    title: translate('$vuetify.menu.users.title'),
    icon: translate('$vuetify.menu.users.icon'),
    children: [
      createMenuItem(users),
      createMenuItem(userRoles),
      createMenuItem(userAttributes),
    ],
  },
]
