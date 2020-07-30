import * as Yup from "yup";
import BaseEntity from "./base/BaseEntity";
import {AttrType, getValueType, QuantType, ValueType} from "./Attribute";
import FilterItem from "./base/FilterItem";
import GridColumn from "./base/GridColumn";
import React from "react";
import i18n from "../i18n";

export const ExportTemplateType = {
    CARD:'CARD',
    AUTO_NAME:'AUTO_NAME',
    NOT_ASSIGNED:'NOT_ASSIGNED',
    TEXT:'TEXT'
};

export default class ExportTemplate extends BaseEntity {

    description = null;
    category = null;
    customerCategory = null;
    type = ExportTemplateType.CARD;
    customer = null;
    changePlain = false;
    useBaseGroup = false;

    build(item) {
        super.build(item);
        this.type = (item['type']?item['type']:this.type);
        this.description = (item['description']?item['description']:this.description);
        this.category = (item['category']?item['category']:this.category);
        this.customerCategory = (item['customerCategory']?item['customerCategory']:this.customerCategory);
        this.customer = (item['customer']?item['customer']:this.customer);
        this.changePlain = (item.hasOwnProperty('changePlain')?item['changePlain']:this.changePlain);
        this.useBaseGroup = (item.hasOwnProperty('useBaseGroup')?item['useBaseGroup']:this.useBaseGroup);
    }

    static buildFilters() {
        let filters = BaseEntity.buildFilters();

        filters.push(FilterItem.buildList('exportTemplates.fields.type','type', false));
        filters.push(FilterItem.buildSelect('exportTemplates.fields.category','category', true));
        filters.push(FilterItem.buildSelect('exportTemplates.fields.customerCategory','customerCategory', true));
        filters.push(FilterItem.buildSelect('exportTemplates.fields.customer','customer', true));
        filters.push(FilterItem.buildCheck('exportTemplates.fields.changePlain','changePlain', false, false));
        filters.push(FilterItem.buildCheck('exportTemplates.fields.useBaseGroup','useBaseGroup', false, false));
        return filters;
    }

    static buildColumns() {
        let columns = BaseEntity.buildColumns();
        columns.push(new GridColumn().build({field: 'customer', header: 'exportTemplates.fields.customer', style:{}, sortable: true,
            order: 5, default: true, widthCoef:2, renderer: (rowData, column) => {return <p>{rowData.customer?rowData.customer.name:''}</p>}}));
        columns.push(new GridColumn().build({field: 'category', header: 'exportTemplates.fields.category', style:{}, sortable: true,
            order: 6, default: true, widthCoef:2, renderer: (rowData, column) => {return <p>{rowData.category?rowData.category.name:''}</p>}}));
        columns.push(new GridColumn().build({field: 'customerCategory', header: 'exportTemplates.fields.customerCategory', style:{}, sortable: true,
            order: 7, default: true, widthCoef:2, renderer: (rowData, column) => {return <p>{rowData.customerCategory?rowData.customerCategory.name:''}</p>}}));
        columns.push(new GridColumn().build({field: 'type', header: 'exportTemplates.fields.type', style:{}, sortable: false,
            order: 8, default: false, widthCoef:1, renderer: (rowData, column) => {return <p>{rowData.valueType?getTemplateType(rowData.valueType).name:''}</p>}}));
        columns.push(new GridColumn().build({field: 'changePlain', header: 'exportTemplates.fields.changePlain', style:{}, sortable: false,
            order: 9, default: true, widthCoef:1, renderer: (rowData, column) => {return <p>{rowData.changePlain?'Да':''}</p>}}));
        columns.push(new GridColumn().build({field: 'useBaseGroup', header: 'exportTemplates.fields.useBaseGroup', style:{}, sortable: false,
            order: 10, default: true, widthCoef:1, renderer: (rowData, column) => {return <p>{rowData.useBaseGroup?'Да':''}</p>}}));
        return columns;
    }
}


export function getTemplateType(type){
    switch (type) {
        case ExportTemplateType.CARD: return {
            nameForRemember: 'CARD',
            name: i18n.t('exportTemplates.fields.types.card')
        };
        case ExportTemplateType.AUTO_NAME: return {
            nameForRemember: 'AUTO_NAME',
            name: i18n.t('exportTemplates.fields.types.autoName')
        };
        case ExportTemplateType.NOT_ASSIGNED: return {
            nameForRemember: 'NOT_ASSIGNED',
            name: i18n.t('exportTemplates.fields.types.notAssigned')
        };
        case ExportTemplateType.TEXT: return {
            nameForRemember: 'TEXT',
            name: i18n.t('exportTemplates.fields.types.text')
        };
        default: return type;
    }
}

export function renderExportTemplateType(){
    return [
        getTemplateType('CARD'),
        getTemplateType('AUTO_NAME'),
        //getTemplateType('TEXT'),
        getTemplateType('NOT_ASSIGNED')
    ];
}

export const ExportTemplateSchema = Yup.object().shape({
    name: Yup.string()
        .min(2,'baseEntity.errors.min')
        .trim()
        .required('baseEntity.errors.required')
});
