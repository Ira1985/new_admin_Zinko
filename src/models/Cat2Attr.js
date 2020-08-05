import BaseEntity from "./base/BaseEntity";
import TreeColumn from "./base/TreeColumn";
import {AttrType} from "./Attribute";
import * as Yup from "yup";

export default class Cat2Attr extends BaseEntity {
    category = {};
    attribute = {};
    id = null;
    name = '';
    comment = '';
    groupName = '';
    attrType = AttrType.GLOBAL;
    groupWeight = 0;
    weight = 0;
    required = false;
    key = false;
    grouping = false;
    groupId = 0;
    analog = false;
    filter = false;
    title = false;
    titleNumber = 0;
    filterNumber = 0;

    build(cat, attr){
        this.category = {id:cat.id, name:cat.name};
        //this.attribute = {id:attr.id, name:attr.name, comment:attr.comment, attrType: attr.attrType};
        this.attribute = attr;
        this.attrType =  attr.attrType;
        return this;
    }

    static buildColumns() {
        let base =  [];
        /*base[1] = new TreeColumn().build({field: 'name', header: 'categories.fields.name', style:{}, sortable: true, order: 1, default: true, widthCoef:3, expander: true});
        base[2] = new GridColumn().build({field: 'comment', header: 'baseEntity.comment', style:{}, sortable: true, order: 2, default: true, widthCoef:1});*/
        base.push(new TreeColumn().build({field: 'attribute.name', header: 'cat2Attrs.fields.attribute', style:{}, sortable: false, order: 1, default: true, widthCoef: 3, expander: true}));
        base.push(new TreeColumn().build({field: 'required', header: 'cat2Attrs.fields.required', style:{}, sortable: false, order: 4, default: true, widthCoef:2}));
        base.push(new TreeColumn().build({field: 'key', header: 'cat2Attrs.fields.key', style:{}, sortable: false, order: 5, default: true, widthCoef:1}));
        base.push(new TreeColumn().build({field: 'weight', header: 'cat2Attrs.fields.weight', style:{}, sortable: false, order: 5, default: true, widthCoef:1}));
        /*        base.push(new TreeColumn().build({field: 'count', header: 'categories.fields.count', style:{}, sortable: true, order: 4, default: true, widthCoef:0.5, body: "count"}));
                base.push(new TreeColumn().build({field: 'presenceAttributes', header: 'categories.fields.presenceAttributes', style:{}, sortable: true, order: 5, default: true, widthCoef:0.5, body: "presenceAttributes"}));*/
        return base;
    }
}
export const Cat2AttrSchema = Yup.object().shape({
    name: Yup.string()
        .min(2,'baseEntity.errors.min')
        .trim()
        .required('baseEntity.errors.required')
});