import React from "react";
import * as Yup from "yup";
import BaseEntity from "./base/BaseEntity";
import FilterItem from "./base/FilterItem";
import GridColumn from "./base/GridColumn";
import {getValueType} from "./Attribute";

export default class Substitution extends BaseEntity {

    subsGroup = null;

    build(item) {
        super.build(item);
        this.subsGroup = (item['subsGroup']?item['subsGroup']:this.subsGroup);
        return this;
    }

    static buildFilters() {
        let filters = BaseEntity.buildFilters();
        filters.push(FilterItem.buildSelect('substitutions.fields.subsGroup','subsGroup', false));
        return filters;
    }

    static buildColumns() {
        let columns = BaseEntity.buildColumns();
        columns.push(new GridColumn().build({field: 'subsGroup', header: 'substitutions.fields.subsGroup', style:{}, sortable: false, order: 3, default: true, widthCoef:2,
            renderer: (rowData, column) => {return <p>{rowData.subsGroup?rowData.subsGroup.name:''}</p>}}));
        return columns;
    }
}

export const SubstitutionSchema = Yup.object().shape({
    name: Yup.string()
        .min(2,'baseEntity.errors.min')
        .trim()
        .required('baseEntity.errors.required')
});
