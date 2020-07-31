import * as Yup from "yup";
import BaseEntity from "./base/BaseEntity";
import FilterItem from "./base/FilterItem";
import GridColumn from "./base/GridColumn";

export default class Unit extends BaseEntity {

    /*description = '';*/

    build(item) {
        super.build(item);
        /*this.description = (item['description']?item['description']:this.description);*/
        return this;
    }

    static buildFilters() {
        let base = BaseEntity.buildFilters();
        /*base.push(FilterItem.buildText('units.fields.description','description', false));*/
        return base;
    }

    static buildColumns() {
        let columns =  BaseEntity.buildColumns();
        /*columns.push(new GridColumn().build({field: 'description', header: 'units.fields.description', style:{}, sortable: false, order: 5, default: true, widthCoef: 1.5}));*/
        return columns;
    }
}

export const UnitSchema = Yup.object().shape({
    name: Yup.string()
        .min(2,'baseEntity.errors.min')
        .trim()
        .required('baseEntity.errors.required')
});
