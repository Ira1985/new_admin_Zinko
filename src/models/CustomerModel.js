import React from "react";
import BaseEntity from "./base/BaseEntity";
import FilterItem from "./base/FilterItem";
import TreeColumn from "./base/TreeColumn";
import GridColumn from "./base/GridColumn";
import i18n from "../i18n";

export const ModelItemType = {
    GROUP :'GROUP',
    ATTRIBUTE:'ATTRIBUTE',
    VALUE:'VALUE',
    UNIT:'UNIT',
    QUANTIFIER:'QUANTIFIER'
};

export default class CustomerModel extends BaseEntity {

    description = '';
    type = ModelItemType.ATTRIBUTE;
    parent = null;
    leaf = true;
    category = null;
    fromApi = false;
    fromExport = false;
    fromInnerModel = false;
    weight = 0;
    productCnt = 0;
    hasModel = false;

    build(item){
        super.build(item);
        this.type = (item['type']?item['type']:ModelItemType.ATTRIBUTE);
        this.description = (item['description']?item['description']:this.description);
        this.leaf = (item.hasOwnProperty('leaf')?item['leaf']:this.leaf);
        this.parent = (item.hasOwnProperty('parent')?item['parent']:this.parent);
        this.category = (item.hasOwnProperty('category')?item['category']:this.customer);
        this.fromApi = (item['fromApi']?item['fromApi']:this.fromApi);
        this.fromExport = (item['fromExport']?item['fromExport']:this.fromExport);
        this.fromInnerModel = (item['fromInnerModel']?item['fromInnerModel']:this.fromInnerModel);
        this.weight = (item['weight']?item['weight']:this.weight);
        this.hasModel = (item.hasOwnProperty('hasModel')?item['hasModel']:this.hasModel);
        this.productCnt = (item['productCnt']?item['productCnt']:this.productCnt);
        return this;
    }

    static buildFilters() {
        return BaseEntity.buildFilters();
    }

    static buildColumns() {
        let base =  BaseEntity.buildColumns(new Set(['name']));
        /*base[1] = new TreeColumn().build({field: 'name', header: 'categories.fields.name', style:{}, sortable: true, order: 1, default: true, widthCoef:3, expander: true});
        base[2] = new GridColumn().build({field: 'comment', header: 'baseEntity.comment', style:{}, sortable: true, order: 2, default: true, widthCoef:1});*/
        base.push(new TreeColumn().build({field: 'name', header: 'customerModels.fields.name', style:{}, sortable: true, order: 1, default: true, widthCoef: 3, expander: true}));
        base.push(new TreeColumn().build({field: 'description', header: 'customerModels.fields.description', style:{}, sortable: false, order: 4, default: false, widthCoef:2}));
        base.push(new TreeColumn().build({field: 'productCnt', header: 'customerModels.fields.productCnt', style:{}, sortable: true, order: 5, default: true, widthCoef:1}));
        base.push(new TreeColumn().build({field: 'hasModel', header: 'customerModels.fields.hasModel', style:{}, sortable: true, order: 5, default: true, widthCoef:1}));
        /*        base.push(new TreeColumn().build({field: 'count', header: 'categories.fields.count', style:{}, sortable: true, order: 4, default: true, widthCoef:0.5, body: "count"}));
                base.push(new TreeColumn().build({field: 'presenceAttributes', header: 'categories.fields.presenceAttributes', style:{}, sortable: true, order: 5, default: true, widthCoef:0.5, body: "presenceAttributes"}));*/
        return base;
    }
}

export function getModelItemType(type){
    switch (type) {
        case ModelItemType.GROUP: return {
            nameForRemember: 'GROUP',
            name: i18n.t('customerModels.fields.type.group')
        };
        case ModelItemType.ATTRIBUTE: return {
            nameForRemember: 'ATTRIBUTE',
            name: i18n.t('customerModels.fields.type.attribute')
        };
        case ModelItemType.VALUE: return {
            nameForRemember: 'VALUE',
            name: i18n.t('customerModels.fields.type.value')
        };
        case ModelItemType.UNIT: return {
            nameForRemember: 'UNIT',
            name: i18n.t('customerModels.fields.type.unit')
        };
        case ModelItemType.QUANTIFIER: return {
            nameForRemember: 'QUANTIFIER',
            name: i18n.t('customerModels.fields.type.quantifier')
        };
        default: return type;
    }
}

export function renderModelItemType(){
    return [
        getModelItemType('GROUP'),
        getModelItemType('ATTRIBUTE'),
        getModelItemType('VALUE'),
        getModelItemType('UNIT')
    ];
}