import {Repository} from '@/services/base/global.interfaces';
import {EnumFieldType, EnumHeaderAlign} from '@/services/base/global.enums';
import {Section} from '@/services/base/global.classes.section';

const entity = 'dashboards';
const slug = entity;

export interface Dashboard {
  id: string;
  thumbnail: string;
  title: string;
  description?: string;
  modifiedAt: Date;
  createdAt: Date;
}

const repository = new Repository<Dashboard>(slug, {}, {});

repository.addField('title', {
  label: '',
  type: EnumFieldType.Text,
});
repository.addField('description', {
  label: '',
  type: EnumFieldType.TextArea,
});

repository.setHeaders([
  {
    fieldKey: 'title',
  },
  {
    fieldKey: 'createdAt',
    align: EnumHeaderAlign.End,
  },
]);

repository.addSection(
  new Section(`$vuetify.${entity}.sections.general`, [
    'id',
    'title',
    'description',
    'modifiedAt',
    'createdAt',
  ], {
    childXl: 3,
    childLg: 4,
    childMd: 6,
  })
);

repository.bulkActions = [
  {
    color: 'error',
    icon: 'mdi-delete',
    title: '$vuetify.entityList.delete',
    key: 'delete'
  }
];

export const dashboards = repository;
