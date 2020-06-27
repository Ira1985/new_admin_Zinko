import FilterItem from './FilterItem';

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
  };
}