import * as Yup from "yup";
import BaseEntity from "./base/BaseEntity";
import GridColumn from "./base/GridColumn";
import React from "react";
import {getValueType} from "./Attribute";
import {Button} from "primereact/button";

export default class SubsGroup extends BaseEntity {

    subs = [];

    build(item) {
        super.build(item);
        this.subs = (item.hasOwnProperty('subs')?item['subs']:this.subs);
        return this;
    }

    static buildFilters() {
        return BaseEntity.buildFilters();
    }

    renderActionColumnInGrid(rowData, column) {
        return <div className={'column-button'}>
            <Button icon="pi p-empty-button chain-ico"/>
        </div>
    }

    static buildColumns() {
        let columns =  BaseEntity.buildColumns();
        columns.push(new GridColumn().build({field: '', header: '', style: {width:'50px'}, actionColumn: true,
            sortable: false, order: 5, default: true, widthCoef: 1.5, renderer: (rowData, column) => renderActionColumnInGrid(rowData, column)}));
    }
}

export const SubsGroupSchema = Yup.object().shape({
    name: Yup.string()
        .min(2,'baseEntity.errors.min')
        .trim()
        .required('baseEntity.errors.required')
});
