import * as Yup from "yup";
import BaseEntity from "./base/BaseEntity";
import TreeColumn from "./base/TreeColumn";
import GridColumn from "./base/GridColumn";
import classNames from "classnames";
import React from "react";

export default class Category extends BaseEntity {

    definition = '';
    customer = null;
    customerId = null;
    layout = false;
    forMatchingAnalog = false;
    foreignMarket = false;
    parent = null;
    leaf = true;

    build(item) {
        super.build(item);
        this.definition = (item['definition']?item['definition']:this.definition);
        this.foreignMarket = (item.hasOwnProperty('foreignMarket')?item['foreignMarket']:this.foreignMarket);
        this.layout = (item.hasOwnProperty('layout')?item['layout']:this.layout);
        this.forMatchingAnalog = (item.hasOwnProperty('forMatchingAnalog')?item['forMatchingAnalog']:this.forMatchingAnalog);
        this.leaf = (item.hasOwnProperty('leaf')?item['leaf']:this.leaf);
        return this;
    }

    static buildFilters() {
        return BaseEntity.buildFilters();
    }

    static buildColumns() {
        let base =  BaseEntity.buildColumns();
        base[1] = new TreeColumn().build({field: 'name', header: 'baseEntity.name', style:{}, sortable: true, order: 1, default: true, widthCoef:3, expander: true});
        base[2] = new GridColumn().build({field: 'comment', header: 'baseEntity.comment', style:{}, sortable: true, order: 2, default: true, widthCoef:1});
        base.push(new TreeColumn().build({field: 'layout', header: 'baseEntity.layout', style:{}, sortable: true, order: 3, default: true, widthCoef:0.5}));
        base.push(new TreeColumn().build({field: 'count', header: 'baseEntity.count', style:{}, sortable: true, order: 4, default: true, widthCoef:0.5, body: "count"}));
        base.push(new TreeColumn().build({field: 'presenceAttributes', header: 'baseEntity.presenceAttributes', style:{}, sortable: true, order: 5, default: true, widthCoef:0.5, body: "presenceAttributes"}));
        return base;
    }
}

export const CategorySchema = Yup.object().shape({
    name: Yup.string()
        .min(2,'baseEntity.errors.min')
        .trim()
        .required('baseEntity.errors.required')
});