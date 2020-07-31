import React from 'react';
import * as Yup from "yup";
import BaseEntity from "./base/BaseEntity";
import FilterItem from "./base/FilterItem";
import GridColumn from "./base/GridColumn";

export default class UnitMapping extends BaseEntity {

    unitFrom = null;
    unitTo = null;
    ratio = 1;


    build(item) {
        super.build(item);
        this.unitFrom = (item['unitFrom']?item['unitFrom']:this.unitFrom);
        this.unitTo = (item['unitTo']?item['unitTo']:this.unitTo);
        this.ratio = (item['ratio']?item['ratio']:this.ratio);
        return this;
    }

    static buildFilters() {
        let base = BaseEntity.buildFilters();
        base.push(FilterItem.buildSelect('unitMappings.fields.unitFrom','unitFrom', false));
        base.push(FilterItem.buildSelect('unitMappings.fields.unitTo','unitTo', false));
        base.push(FilterItem.buildNumber('unitMappings.fields.ratio','ratio', false));
        return base;
    }

    static buildColumns() {
        let columns =  BaseEntity.buildColumns();
        columns.forEach((item, index) => {
            item.order += 10;
            item.default = false;
        });
        columns.push(new GridColumn().build({field: 'unitFrom', header: 'unitMappings.fields.unitFrom', style:{},
            sortable: false, order: 5, default: true, widthCoef:3, renderer: (rowData, column) => {return <p>{rowData.unitFrom?rowData.unitFrom.name:''}</p>}}));
        columns.push(new GridColumn().build({field: 'unitTo', header: 'unitMappings.fields.unitTo', style:{},
            sortable: false, order: 5, default: true, widthCoef:3, renderer: (rowData, column) => {return <p>{rowData.unitTo?rowData.unitTo.name:''}</p>}}));
        columns.push(new GridColumn().build({field: 'ratio', header: 'unitMappings.fields.ratio', style:{},
            sortable: false, order: 6, default: true, widthCoef:2}));
        return columns;
    }
}

export const UnitMappingSchema = Yup.object().shape({
    unitFrom: Yup.object().shape({
        id:Yup.number().required('baseEntity.errors.required'),
        name:Yup.string().required()
    }).nullable().required('baseEntity.errors.required'),
    unitTo: Yup.object().shape({
        id:Yup.number().required('baseEntity.errors.required'),
        name:Yup.string().required()
    }).nullable().required('baseEntity.errors.required')
});
