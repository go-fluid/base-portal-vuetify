import {
  baseList,
  baseCreate,
  baseRead,
  baseUpdate,
  baseDelete,
  baseTableHeaders,
  baseListStub,
  baseCreateStub, baseReadStub, baseUpdateStub, baseDeleteStub, baseBulk, baseBulkStub
} from '../base';
import {userRoles} from '@/services/repositories/userRoles';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  userRoleId: string;
  userRoleLabel: string;
  modifiedAt: Date;
  createdAt: Date;
}

interface IListResponse {
  status: number;
  headers: Headers;
  items: User[];
}

interface IItemResponse {
  status: number;
  headers: Headers;
  item: User;
}

const StubList: User[] = [
  {
    id: '624df08c51e0aff721208a9c',
    firstName: 'Justin',
    lastName: 'Robertson',
    username: 'justin@somewhere.co.za',
    email: 'justin@somewhere.co.za',
    password: 'password',
    userRoleId: '624df0929bc786ddf868f7e8',
    userRoleLabel: 'Administrators',
    modifiedAt: new Date('2022-04-06T08:31:04.000Z'),
    createdAt: new Date('2022-04-06T08:31:04.000Z'),
  },
];
const StubRecord: User = StubList[0];
const entity = 'users';

export const users: any = {
  entity: entity,
  title: {
    singular: 'User',
    plural: 'Users',
  },
  defaultSortOrder: '-createdAt',
  listPage: '/users',
  addPage: '/users/add',
  viewPagePrefix: '/users/view',
  editPagePrefix: '/users/edit',
  default: {},
  fields: {
    id: {
      label: 'Id',
      type: 'uuid',
      readonly: true,
    },
    firstName: {
      label: 'First Name',
      type: 'text',
    },
    lastName: {
      label: 'Last Name',
      type: 'text',
    },
    username: {
      label: 'Username',
      type: 'text',
    },
    email: {
      label: 'Email',
      type: 'text',
    },
    userRoleId: {
      label: 'User Role',
      type: 'linkId',
      linkLabelField: 'userRoleLabel',
      linkRepository: userRoles,
      linkTargetPath: userRoles.viewPagePrefix,
    },
    userRoleLabel: {
      label: 'User Role',
      type: 'linkLabel',
      linkIdField: 'userRoleId',
    },
    modifiedAt: {
      label: 'Modified At',
      type: 'datetime',
      readonly: true,
    },
    createdAt: {
      label: 'Created At',
      type: 'datetime',
      readonly: true,
    },
  },
  headers: [
    {
      field: 'firstName',
    },
    {
      field: 'lastName',
    },
    {
      field: 'username',
    },
    {
      field: 'email',
    },
    {
      field: 'userRoleId',
    },
    {
      field: 'createdAt',
    },
  ],
  sections: [
    {
      lg: 12,
      md: 12,
      title: 'General',
      fields: [
        'id',
        'firstName',
        'lastName',
        'username',
        'email',
      ],
    },
    {
      lg: 6,
      title: 'Links',
      fields: [
        'userRoleId',
      ],
    },
    {
      lg: 6,
      title: 'Time Based',
      fields: [
        'modifiedAt',
        'createdAt',
      ],
    }
  ],
  filters: (): any => {
    return {};
  },
  bulkActions: [
    {
      color: 'error',
      icon: 'mdi-delete',
      key: 'delete',
      title: 'Delete'
    },
  ],

  list: baseListStub<IListResponse>(entity, {status: 200, headers: new Headers(), items: StubList}),
  create: baseCreateStub<IItemResponse>(entity, {status: 200, headers: new Headers(), item: StubRecord}),
  read: baseReadStub<IItemResponse>(entity, {status: 200, headers: new Headers(), item: StubRecord}),
  update: baseUpdateStub<IItemResponse>(entity, {status: 200, headers: new Headers(), item: StubRecord}),
  delete: baseDeleteStub<IItemResponse>(entity, StubList, {status: 200, headers: new Headers(), item: StubRecord}),
  bulk: baseBulkStub(entity, {status: 200, headers: new Headers(), item: {}})
};
