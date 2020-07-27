import * as Yup from "yup";
import BaseEntity from "./base/BaseEntity";
import FilterItem from "./base/FilterItem";
import GridColumn from "./base/GridColumn";

export default class AttrCategory extends BaseEntity {

    system = false;

    build(item) {
        super.build(item);
        this.system = (item.hasOwnProperty('system')?item['system']:this.system);
        return this;
    }

    static buildFilters() {
        let base = BaseEntity.buildFilters();
        base.push(FilterItem.buildCheck('attrCategories.fields.system','system', false, false));
        return base;
    }

    static buildColumns() {
        let columns =  BaseEntity.buildColumns();
        columns.push(new GridColumn().build({field: 'system', header: 'attrCategories.fields.system', style:{}, sortable: false, order: 4, default: true, widthCoef:1.5}));
        return columns;
    }
}

export const AttrCategorySchema = Yup.object().shape({
    name: Yup.string()
        .min(2,'baseEntity.errors.min')
        .trim()
        .required('baseEntity.errors.required')
});
