import * as Yup from "yup";
import BaseEntity from "./base/BaseEntity";
import TreeColumn from "./base/TreeColumn";
import React from "react";

export default class Category extends BaseEntity {

    description = '';
    parent = null;
    leaf = true;
    productCnt = 0;
    hasAttr = false;

    build(item) {
        super.build(item);
        this.description = (item['description']?item['description']:this.description);
        this.leaf = (item.hasOwnProperty('leaf')?item['leaf']:this.leaf);
        this.hasAttr = (item.hasOwnProperty('hasAttr')?item['hasAttr']:this.hasAttr);
        this.productCnt = (item['productCnt']?item['productCnt']:this.productCnt);
        this.parent = (item.hasOwnProperty('parent')?item['parent']:this.parent);
        return this;
    }

    static buildFilters() {
        return BaseEntity.buildFilters();
    }

    static buildColumns() {
        let base =  BaseEntity.buildColumns(new Set(['name']));
        /*base[1] = new TreeColumn().build({field: 'name', header: 'categories.fields.name', style:{}, sortable: true, order: 1, default: true, widthCoef:3, expander: true});
        base[2] = new GridColumn().build({field: 'comment', header: 'baseEntity.comment', style:{}, sortable: true, order: 2, default: true, widthCoef:1});*/
        base.push(new TreeColumn().build({field: 'name', header: 'categories.fields.name', style:{}, sortable: true, order: 1, default: true, widthCoef: 3, expander: true}));
        base.push(new TreeColumn().build({field: 'description', header: 'categories.fields.description', style:{}, sortable: false, order: 4, default: false, widthCoef:2}));
        base.push(new TreeColumn().build({field: 'productCnt', header: 'categories.fields.productCnt', style:{}, sortable: true, order: 5, default: true, widthCoef:1}));
        base.push(new TreeColumn().build({field: 'hasAttr', header: 'categories.fields.hasAttr', style:{}, sortable: true, order: 5, default: true, widthCoef:1}));
/*        base.push(new TreeColumn().build({field: 'count', header: 'categories.fields.count', style:{}, sortable: true, order: 4, default: true, widthCoef:0.5, body: "count"}));
        base.push(new TreeColumn().build({field: 'presenceAttributes', header: 'categories.fields.presenceAttributes', style:{}, sortable: true, order: 5, default: true, widthCoef:0.5, body: "presenceAttributes"}));*/
        return base;
    }
}

export const CategorySchema = Yup.object().shape({
    name: Yup.string()
        .min(2,'baseEntity.errors.min')
        .trim()
        .required('baseEntity.errors.required')
});