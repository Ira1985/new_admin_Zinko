import BaseEntity from "./base/BaseEntity";
import GridColumn from "./base/GridColumn";
import {AttrType} from "./Attribute";
import * as Yup from "yup";

export default class Cat2Attr extends BaseEntity {
    category = {};
    attribute = {};
    groupName = '';
    attrType = AttrType.GLOBAL;
    weight = 0;
    required = false;
    key = false;

    build(item){
        super.build(item);
        this.attrType = (item['attrType']?item['attrType']:AttrType.GLOBAL);
        this.attribute = (item['attribute']?item['attribute']:this.attribute);
        this.category = (item['category']?item['category']:this.category);
        this.weight = (item['weight']?item['weight']: this.weight);
        this.groupName = (item['groupName']?item['groupName']: this.groupName);
        this.required = (item.hasOwnProperty('required')?item['required']:this.required);
        this.key = (item.hasOwnProperty('key')?item['key']:this.key);
        return this;
    }

    static buildColumns() {
        let base =  [];
        base.push(new GridColumn().build({field: 'attribute.name', header: 'cat2Attrs.fields.attribute', style:{}, sortable: false, order: 1, default: true, widthCoef: 3, expander: true}));
        base.push(new GridColumn().build({field: 'required', header: 'cat2Attrs.fields.required', style:{}, sortable: false, order: 4, default: true, widthCoef:2}));
        base.push(new GridColumn().build({field: 'key', header: 'cat2Attrs.fields.key', style:{}, sortable: false, order: 5, default: true, widthCoef:1}));
        base.push(new GridColumn().build({field: 'weight', header: 'cat2Attrs.fields.weight', style:{}, sortable: false, order: 5, default: true, widthCoef:1}));
        return base;
    }
}
export const Cat2AttrSchema = Yup.object().shape({
    //attribute: Yup.object().shape({
        //id:Yup.number().required('baseEntity.errors.required'),
        //name:Yup.string().required()
    //}).nullable().required('baseEntity.errors.required')
});