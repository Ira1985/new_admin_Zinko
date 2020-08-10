import React from "react";
import * as Yup from "yup";
import BaseEntity from "./base/BaseEntity";
import FilterItem from "./base/FilterItem";
import TreeColumn from "./base/TreeColumn";
import GridColumn from "./base/GridColumn";
import i18n from "../i18n";

export const AttrType = {
    GLOBAL: 'GLOBAL',
    INNER: 'INNER',
    OUTER: 'OUTER',
    SYSTEM:'SYSTEM'
};

export const ValueType = {
    NUMBER:'NUMBER',
    STRING:'STRING',
    SINGLE:'SINGLE',
    MULTI:'MULTI',
    YESNO:'YESNO',
    LINK_SOURCE:'LINK_SOURCE',
    FILE_LINK:'FILE_LINK'
};

export const QuantType = {
    NUMBER:'NUMBER',
    STRING:'STRING',
    YESNO:'YESNO'
};

export const LinkSourceType = {
    NONE:'NONE',
    BRAND:'BRAND',
    FAMILY:'FAMILY',
    SERIES:'SERIES',
    MODEL:'MODEL',
    MANUFACTURER:'MANUFACTURER',
    COUNTRY:'COUNTRY',
    SUBSTITUTION:'SUBSTITUTION',
    PRODUCT_CONTENT:'PRODUCT_CONTENT'
};

export const AttrSystemSource = {
    NONE:'NONE',
    PRODUCT_ID:'PRODUCT_ID',
    ARTICLE:'ARTICLE',
    MANUFACTURER:'MANUFACTURER',
    COUNTRY:'COUNTRY',
    BRAND:'BRAND',
    CODE:'CODE',
    FULL_NAME:'FULL_NAME',
    IMAGES:'IMAGES',
    BASE_IMAGE:'BASE_IMAGE',
    CERTIFICATES:'CERTIFICATES',
    INSTRUCTIONS:'INSTRUCTIONS',
    VIDEOS:'VIDEOS',
    HTML_CONTENT:'HTML_CONTENT',
    BARCODES:'BARCODES'
};

export default class Attribute extends BaseEntity {

    attrType = AttrType.GLOBAL;
    valueType = ValueType.STRING;
    unit = null;
    hasQuantities = false;
    roundUp = -1;
    length = -1;
    subsGroup = null;
    quantSubsGroup = null;
    quantType = QuantType.NUMBER;
    attrCategory = null;
    sourceType = LinkSourceType.NONE;
    system = false;
    systemSource = AttrSystemSource.NONE;


    build(item) {
        super.build(item);
        this.attrType = (item['attrType']?item['attrType']:AttrType.GLOBAL);
        this.valueType = (item['valueType']?item['valueType']:ValueType.STRING);
        this.unit = (item['unit']?item['unit']:this.unit);
        this.hasQuantities = (item.hasOwnProperty('hasQuantities')?item['hasQuantities']:this.hasQuantities);
        this.subsGroup = (item['subsGroup']?item['subsGroup']: this.subsGroup);
        this.quantType = (item['quantType']?item['quantType']:QuantType.NUMBER);
        this.roundUp = (item['roundUp']?item['roundUp']: this.roundUp);
        this.quantSubsGroup = (item['quantSubsGroup']?item['quantSubsGroup']:this.quantSubsGroup);
        this.sourceType = (item['sourceType']?item['sourceType']:LinkSourceType.NONE);
        this.attrCategory = (item['attrCategory']?item['attrCategory']:this.attrCategory);
        this.system = (item.hasOwnProperty('system')?item['system']:  this.system);
        this.systemSource = (item['systemSource']?item['systemSource']:AttrSystemSource.NONE);
        return this;
    }

    static buildFilters() {
        let base = BaseEntity.buildFilters();
        /*base.push(FilterItem.buildList('attributes.fields.attrType','attrType', true));*/
        base.push(FilterItem.buildList('attributes.fields.valueType','valueType', true));
        base.push(FilterItem.buildSelect('attributes.fields.attrCategory','attrCategory', false));
        base.push(FilterItem.buildCheck('attributes.fields.system','system', false, false));
        return base;
    }

    static buildColumns() {
        let columns =  BaseEntity.buildColumns();
        columns.push(new GridColumn().build({field: 'valueType', header: 'attributes.fields.valueType', style: {},
            sortable: true, order: 5, default: true, widthCoef: 1.5, renderer: (rowData, column) => {return <p>{rowData.valueType?getValueType(rowData.valueType).name:''}</p>}}));
        columns.push(new GridColumn().build({field: 'unit', header: 'attributes.fields.unit', style:{},
            sortable: true, order: 6, default: false, widthCoef: 1.5, renderer: (rowData, column) => {return <p>{rowData.unit?rowData.unit.name:''}</p>}}));
        columns.push(new GridColumn().build({field: 'attrCategory', header: 'attributes.fields.attrCategory', style:{},
            sortable: true, order: 7, default: true, widthCoef: 1.5, renderer: (rowData, column) => {return <p>{rowData.attrCategory?rowData.attrCategory.name:''}</p>}}));
        columns.push(new GridColumn().build({field: 'subsGroup', header: 'attributes.fields.subsGroup', style:{},
            sortable: true, order: 8, default: false, widthCoef: 1.5, renderer: (rowData, column) => {return <p>{rowData.subsGroup?rowData.subsGroup.name:''}</p>}}));
        columns.push(new GridColumn().build({field: 'hasQuantities', header: 'attributes.fields.hasQuantities', style:{},
            sortable: true, order: 9, default: false, widthCoef: 0.5, renderer: (rowData, column) => {return <p>{rowData.hasQuantities?'Да':''}</p>}}));
        columns.push(new GridColumn().build({field: 'system', header: 'attributes.fields.system', style:{},
            sortable: true, order: 10, default: false, widthCoef: 0.5, renderer: (rowData, column) => {return <p>{rowData.system?'Да':''}</p>}}));

        return columns;
    }
}

export const AttributeSchema = Yup.object().shape({
    name: Yup.string()
        .min(2,'baseEntity.errors.min')
        .trim()
        .required('baseEntity.errors.required'),
    attrType: Yup.string()
        .trim()
        .required('baseEntity.errors.required'),
    valueType: Yup.string()
        .trim()
        .required('baseEntity.errors.required')
});

export function getAttrSystemSource(type) {
    switch (type) {
        case AttrSystemSource.NONE: return {
            nameForRemember: 'NONE',
            name: i18n.t('')
        };
        case AttrSystemSource.PRODUCT_ID: return {
            nameForRemember: 'PRODUCT_ID',
            name: i18n.t('attributes.fields.systemSource.productId')
        };
        case AttrSystemSource.ARTICLE: return {
            nameForRemember: 'ARTICLE',
            name: i18n.t('attributes.fields.systemSource.article')
        };
        case AttrSystemSource.MANUFACTURER: return {
            nameForRemember: 'MANUFACTURER',
            name: i18n.t('attributes.fields.systemSource.manufacturer')
        };
        case AttrSystemSource.COUNTRY: return {
            nameForRemember: 'COUNTRY',
            name: i18n.t('attributes.fields.systemSource.country')
        };
        case AttrSystemSource.BRAND: return {
            nameForRemember: 'BRAND',
            name: i18n.t('attributes.fields.systemSource.brand')
        };
        case AttrSystemSource.CODE: return {
            nameForRemember: 'CODE',
            name: i18n.t('attributes.fields.systemSource.code')
        };
        case AttrSystemSource.FULL_NAME: return {
            nameForRemember: 'FULL_NAME',
            name: i18n.t('attributes.fields.systemSource.fullName')
        };
        case AttrSystemSource.IMAGES: return {
            nameForRemember: 'IMAGES',
            name: i18n.t('attributes.fields.systemSource.images')
        };
        case AttrSystemSource.BASE_IMAGE: return {
            nameForRemember: 'BASE_IMAGE',
            name: i18n.t('attributes.fields.systemSource.baseImage')
        };
        case AttrSystemSource.CERTIFICATES: return {
            nameForRemember: 'CERTIFICATES',
            name: i18n.t('attributes.fields.systemSource.certificates')
        };
        case AttrSystemSource.INSTRUCTIONS: return {
            nameForRemember: 'INSTRUCTIONS',
            name: i18n.t('attributes.fields.systemSource.instructions')
        };
        case AttrSystemSource.VIDEOS: return {
            nameForRemember: 'VIDEOS',
            name: i18n.t('attributes.fields.systemSource.videos')
        };
        case AttrSystemSource.HTML_CONTENT: return {
            nameForRemember: 'HTML_CONTENT',
            name: i18n.t('attributes.fields.systemSource.htmlContent')
        };
        case AttrSystemSource.BARCODES: return {
            nameForRemember: 'BARCODES',
            name: i18n.t('attributes.fields.systemSource.barcodes')
        };
        default: return type;
    }
}

export function renderAttrSystemSource(){
    return [
        getAttrSystemSource('NONE'),
        getAttrSystemSource('PRODUCT_ID'),
        getAttrSystemSource('ARTICLE'),
        getAttrSystemSource('MANUFACTURER'),
        getAttrSystemSource('COUNTRY'),
        getAttrSystemSource('BRAND'),
        getAttrSystemSource('CODE'),
        getAttrSystemSource('FULL_NAME'),
        getAttrSystemSource('IMAGES'),
        getAttrSystemSource('BASE_IMAGE'),
        getAttrSystemSource('CERTIFICATES'),
        getAttrSystemSource('INSTRUCTIONS'),
        getAttrSystemSource('VIDEOS'),
        getAttrSystemSource('HTML_CONTENT'),
        getAttrSystemSource('BARCODES'),
        //getLinkSourceType('SUBSTITUTION'),
        //getValueType('FILE_LINK')
    ];
}

export function getAttrType(type){
    switch (type) {
        case AttrType.GLOBAL: return {
            nameForRemember: 'GLOBAL',
            name: i18n.t('attributes.fields.types.global')
        };
        case AttrType.INNER: return {
            nameForRemember: 'INNER',
            name: i18n.t('attributes.fields.types.inner')
        };
        case AttrType.OUTER: return {
            nameForRemember: 'OUTER',
            name: i18n.t('attributes.fields.types.outer')
        };
        case AttrType.SYSTEM: return {
            nameForRemember: 'SYSTEM',
            name: i18n.t('attributes.fields.types.system')
        };
        default: return type;
    }
}

export function renderAttrType(){
    return [
        getAttrType('GLOBAL'),
        //getAttrType('INNER'),
        //getAttrType('OUTER'),
        getAttrType('SYSTEM')
    ];
}

export function renderValueType(){
    return [
        getValueType('NUMBER'),
        getValueType('STRING'),
        getValueType('SINGLE'),
        getValueType('MULTI'),
        getValueType('YESNO'),
        getValueType('LINK_SOURCE'),
        //getValueType('FILE_LINK')
    ];
}

export function renderQuantType(){
    return [
        getQuantType('NUMBER'),
        getQuantType('STRING'),
        getQuantType('YESNO')
    ];
}

export function getValueType(type){
    switch (type) {
        case ValueType.NUMBER: return {
            nameForRemember: 'NUMBER',
            name: i18n.t('attributes.fields.valueTypes.number')
        };
        case ValueType.STRING: return {
            nameForRemember: 'STRING',
            name: i18n.t('attributes.fields.valueTypes.string')
        };
        case ValueType.SINGLE: return {
            nameForRemember: 'SINGLE',
            name: i18n.t('attributes.fields.valueTypes.single')
        };
        case ValueType.MULTI: return {
            nameForRemember: 'MULTI',
            name: i18n.t('attributes.fields.valueTypes.multi')
        };
        case ValueType.YESNO: return {
            nameForRemember: 'YESNO',
            name: i18n.t('attributes.fields.valueTypes.yesNo')
        };
        case ValueType.LINK_SOURCE: return {
            nameForRemember: 'LINK_SOURCE',
            name: i18n.t('attributes.fields.valueTypes.linkSource')
        };
        case ValueType.FILE_LINK: return {
            nameForRemember: 'FILE_LINK',
            name: i18n.t('attributes.fields.valueTypes.fileLink')
        };
        default: return type;
    }
}

export function getQuantType(type){
    switch (type) {
        case QuantType.NUMBER: return {
            nameForRemember: 'NUMBER',
            name: i18n.t('attributes.fields.quantTypes.number')
        };
        case QuantType.STRING: return {
            nameForRemember: 'STRING',
            name: i18n.t('attributes.fields.quantTypes.string')
        };
        case QuantType.YESNO: return {
            nameForRemember: 'YESNO',
            name: i18n.t('attributes.fields.quantTypes.yesNo')
        };
        default: return type;
    }
}

export function getLinkSourceType(type){
    switch (type) {
        case LinkSourceType.NONE: return {
            nameForRemember: 'NONE',
            name: ''
        };
        case LinkSourceType.BRAND: return {
            nameForRemember: 'BRAND',
            name: i18n.t('attributes.fields.sourceTypes.brand')
        };
        case LinkSourceType.MANUFACTURER: return {
            nameForRemember: 'MANUFACTURER',
            name: i18n.t('attributes.fields.sourceTypes.manufacturer')
        };
        case LinkSourceType.COUNTRY: return {
            nameForRemember: 'COUNTRY',
            name: i18n.t('attributes.fields.sourceTypes.country')
        };
        case LinkSourceType.SUBSTITUTION: return {
            nameForRemember: 'SUBSTITUTION',
            name: i18n.t('attributes.fields.sourceTypes.substitution')
        };
        case LinkSourceType.PRODUCT_CONTENT: return {
            nameForRemember: 'PRODUCT_CONTENT',
            name: i18n.t('attributes.fields.sourceTypes.productContent')
        };

        case LinkSourceType.FAMILY: return {
            nameForRemember: 'FAMILY',
            name: i18n.t('attributes.fields.sourceTypes.family')
        };
        case LinkSourceType.SERIES: return {
            nameForRemember: 'SERIES',
            name: i18n.t('attributes.fields.sourceTypes.series')
        };
        case LinkSourceType.MODEL: return {
            nameForRemember: 'MODEL',
            name: i18n.t('attributes.fields.sourceTypes.model')
        };
        default: return type;
    }
}


export function renderLinkSourceType(){
    return [
        getLinkSourceType('NONE'),
        getLinkSourceType('BRAND'),
        getLinkSourceType('MANUFACTURER'),
        getLinkSourceType('COUNTRY'),
        //getLinkSourceType('SUBSTITUTION'),
        getLinkSourceType('PRODUCT_CONTENT'),
        //getValueType('FILE_LINK')
    ];
}
