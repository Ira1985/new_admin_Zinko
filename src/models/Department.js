import * as Yup from "yup";
import BaseEntity from "./base/BaseEntity";
import FilterItem from "./base/FilterItem";
import GridColumn from "./base/GridColumn";
import React from "react";

export default class Department extends BaseEntity {

    description = '';
    parent = null;
    roles = [];
    allowedRoles = [];

    build(item) {
        super.build(item);
        this.description = (item['description']?item['description']:this.description);
        this.parent = (item['parent']?item['parent']:this.parent);
        this.roles = (item['roles']?item['roles']:this.roles);
        this.allowedRoles = (item['allowedRoles']?item['allowedRoles']:this.allowedRoles);
        return this;
    }

    static buildFilters() {
        let base = BaseEntity.buildFilters();
        base.push(FilterItem.buildText('departments.fields.description','description', false));
        return base;
    }

    static buildColumns() {
        let columns =  BaseEntity.buildColumns();
        columns.push(new GridColumn().build({field: 'description', header: 'departments.fields.description', style:{}, sortable: false,
            order: 4, default: false, widthCoef:2}));
        columns.push(new GridColumn().build({field: 'parent', header: 'departments.fields.parent', style:{}, sortable: false,
            order: 5, default: true, widthCoef:2, renderer: (rowData, column) => {return <p>{rowData.parent?rowData.parent.name:''}</p>}}));
        return columns;
    }
}

export const DepartmentSchema = Yup.object().shape({
    name: Yup.string()
        .min(5,'baseEntity.errors.min')
        .trim()
        .required('baseEntity.errors.required')
});
