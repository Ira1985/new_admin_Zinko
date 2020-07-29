import FilterItem from './FilterItem';
import GridColumn from "./GridColumn";
import {Fieldset} from "primereact/fieldset";

export default class BaseEntity {
    id = null;
    name = '';
    comment = '';
    enabled = true;
    deleted = false;
    createdAt = null;
    createdBy = null;
    updatedAt = null;
    updatedBy = null;

    build(item) {
        this.id = item['id'];
        this.name = (item['name']?item['name']:this.name);
        this.comment = (item['comment']?item['comment']:this.comment);
        this.enabled = (item.hasOwnProperty('enabled')?item['enabled']:this.enabled);
        this.deleted = (item.hasOwnProperty('deleted')?item['deleted']:this.deleted);
        this.createdAt = (item['createdAt']?item['createdAt']:this.createdAt);
        this.createdBy = (item['createdBy']?item['createdBy']:this.createdBy);
        this.updatedAt = (item['updatedAt']?item['updatedAt']:this.updatedAt);
        this.updatedBy = (item['updatedBy']?item['updatedBy']:this.updatedBy);
        return this;
    }

  static buildFilters() {
       return [
           FilterItem.buildIds('baseEntity.id','ids', true),
           FilterItem.buildText('baseEntity.name','name', true),
           FilterItem.buildText('baseEntity.comment','comment', true),
           FilterItem.buildDate('baseEntity.createdAt','createdAt', false),
           FilterItem.buildList('baseEntity.createdBy','createdBy', false),
           FilterItem.buildDate('baseEntity.updatedAt','updatedAt', false),
           FilterItem.buildList('baseEntity.updatedBy','updatedBy', false)
        ];
  }

  static buildColumns(skipped = new Set()) {
      let columns = [];
      if(!skipped.has('id'))
        columns.push(new GridColumn().build({field: 'id', header: 'baseEntity.id', style:{}, sortable: true, order: 1, default: false, widthCoef:1}));
      if(!skipped.has('name'))
        columns.push(new GridColumn().build({field: 'name', header: 'baseEntity.name', style:{}, sortable: true, order: 2, default: true, widthCoef:3}));
      if(!skipped.has('comment'))
        columns.push(new GridColumn().build({field: 'comment', header: 'baseEntity.comment', style:{}, sortable: false, order: 3, default: true, widthCoef:2}));
      if(!skipped.has('createdAt'))
        columns.push(new GridColumn().build({field: 'createdAt', header: 'baseEntity.createdAt', style:{}, sortable: true, order: 20, default: false, widthCoef:1.5}));
      if(!skipped.has('updatedAt'))
        columns.push(new GridColumn().build({field: 'updatedAt', header: 'baseEntity.updatedAt', style:{}, sortable: true, order: 22, default: false, widthCoef:1.5}));
      if(!skipped.has('createdBy'))
        columns.push(new GridColumn().build({field: 'createdBy', header: 'baseEntity.createdBy', style:{}, sortable: false, order: 21, default: false, widthCoef:1.5}));
      if(!skipped.has('updatedBy'))
        columns.push(new GridColumn().build({field: 'updatedBy', header: 'baseEntity.updatedBy', style:{}, sortable: false, order: 23, default: false, widthCoef:1.5}));
      return columns;
      /*return [
          new GridColumn().build({field: 'id', header: 'baseEntity.id', style:{}, sortable: true, order: 1, default: false, widthCoef:1}),
          new GridColumn().build({field: 'name', header: 'baseEntity.name', style:{}, sortable: true, order: 2, default: true, widthCoef:3}),
          new GridColumn().build({field: 'comment', header: 'baseEntity.comment', style:{}, sortable: false, order: 3, default: true, widthCoef:3}),
          new GridColumn().build({field: 'createdAt', header: 'baseEntity.createdAt', style:{}, sortable: true, order: 20, default: false, widthCoef:1.5}),
          new GridColumn().build({field: 'updatedAt', header: 'baseEntity.updatedAt', style:{}, sortable: true, order: 22, default: false, widthCoef:1.5}),
          new GridColumn().build({field: 'createdBy', header: 'baseEntity.createdBy', style:{}, sortable: false, order: 21, default: false, widthCoef:1.5}),
          new GridColumn().build({field: 'updatedBy', header: 'baseEntity.updatedBy', style:{}, sortable: false, order: 23, default: false, widthCoef:1.5})
      ];*/
  }

}