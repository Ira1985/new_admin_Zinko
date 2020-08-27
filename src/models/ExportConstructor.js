import React from "react";
import * as Yup from "yup";
import BaseEntity from "./base/BaseEntity";
import TreeColumn from "./base/TreeColumn";
import Unit from "./Unit";
import Attribute from "./Attribute";
import i18n from "../i18n";

export const EtElementType = {
    GROUP:'GROUP',
    ATTRIBUTE:'ATTRIBUTE',
    VALUE:'VALUE',
    UNIT:'UNIT',
    QUANTIFICATOR:'QUANTIFICATOR'
};

export const EtOutputType = {
    NOT_ASSIGNED:'NOT_ASSIGNED',
    VALUE:'VALUE',
    NAME:'NAME',
    QUANTIFICATOR:'QUANTIFICATOR',
    MATH_VALUE:'MATH_VALUE',
    MARKET_TEXT:'MARKET_TEXT'
};

export const EtUQOutputType = {
    NOT_ASSIGNED:'NOT_ASSIGNED',
    BEFORE:'BEFORE',
    AFTER:'AFTER'
};

export const EtResultType = {
    NUMBER:'NUMBER',
    STRING:'STRING',
    SINGLE:'SINGLE',
    MULTI:'MULTI',
    NONE:'NONE'
};

export const ClassCatType = {
    NONE:'NONE',
    MANUFACTURER:'MANUFACTURER',
    BRAND:'BRAND',
    FAMILY:'FAMILY',
    SERIES:'SERIES',
    MODEL:'MODEL'
};

export const  EtItemFLAGS = {
    SINGLE_VALUE:'SINGLE_VALUE', //all values single object
    UPPERCASE:'UPPERCASE',  //all to uppercase
    LOWCASE:'LOWCASE',    //all to lowcase
    LOWCASEWF:'LOWCASEWF',  //all to lowcase without first letter
    LOWCASEWFALL:'LOWCASEWFALL',//all to lowcase without first letter in all sentence
    YES:'YES',
    NO:'NO'
};

export default class ExportConstructor extends BaseEntity{
    uniqueId = '';
    templateId = null;
    parent = {};
    parentId = null;
    children = [];
    type = EtElementType.ATTRIBUTE; //select
    attribute = new Attribute(); // auto complitname = ''; //string
    groupName = ''; // string
    groupId = null;
    prefix = ''; //string
    absPrefix = ''; //string
    suffix = ''; //string
    absSuffix = ''; //string
    separator = ''; //string
    unitQuanSepElem = ''; //string
    rounding = -1; //number
    toUnit = new Unit(); //auto complit
    weight = 0; //number
    outputType = EtOutputType.NOT_ASSIGNED; //select
    uqOutputType = EtUQOutputType.NOT_ASSIGNED; //select
    resultType = EtResultType.NONE; //select
    classCatType = ClassCatType.NONE; //select
    flags = [];
    flagHelper = '';
    subs = [];
    subsUseOnly = false;
    custModelId = null;
    disabled = false;
    autoCorrects = [];
    substitutions = [];
    mathExpressions = [];

    build(item){
        super.build(item);
        this.description = (item['description']?item['description']:this.description);
        this.category = (item['category']?item['category']:this.category);
        this.customerCategory = (item['customerCategory']?item['customerCategory']:this.customerCategory);
        //this.type = (item['type']?item['type']:ExportTemplateType.CARD);
        this.customer = (item['customer']?item['customer']:this.customer);
        this.changePlain = (item['changePlain']?item['changePlain']:this.changePlain);
        this.useBaseGroup = (item['useBaseGroup']?item['useBaseGroup']:this.useBaseGroup);
        /*        this.elements = (item['elements']?item['elements']:null);
                this.autoCorrects = (item['autoCorrects']?item['autoCorrects']:null);
                this.linkingList = (item['linkingList']?item['linkingList']:null);*/
        return this;
    }

    static buildFilters() {
        return BaseEntity.buildFilters();
    }

    static buildColumns() {
        let base =  BaseEntity.buildColumns(new Set(['name', 'comment']));
        /*base[1] = new TreeColumn().build({field: 'name', header: 'categories.fields.name', style:{}, sortable: true, order: 1, default: true, widthCoef:3, expander: true});
        base[2] = new GridColumn().build({field: 'comment', header: 'baseEntity.comment', style:{}, sortable: true, order: 2, default: true, widthCoef:1});*/
        base.push(new TreeColumn().build({field: 'groupName', header: 'exportConstructors.fields.groupName', style:{}, sortable: true, order: 1, default: true, widthCoef: 1, expander: true}));
        base.push(new TreeColumn().build({field: 'comment', header: 'exportConstructors.fields.comment', style:{}, sortable: true, order: 1, default: false, widthCoef: 3}));
        base.push(new TreeColumn().build({field: 'attribute', header: 'exportConstructors.fields.attribute', style:{}, sortable: false, order: 4, default: true, widthCoef:2, renderer: (rowData, column) => {return <p>{rowData.data.attribute?rowData.data.attribute.name:''}</p>}}));
        base.push(new TreeColumn().build({field: 'type', header: 'exportConstructors.fields.type', style:{}, sortable: true, order: 5, default: true, widthCoef:1, renderer: (rowData, column) => {return <p>{rowData.data.type?getEtElementType(rowData.data.type).name:''}</p>}}));
        base.push(new TreeColumn().build({field: 'absPrefix', header: 'exportConstructors.fields.absPrefix', style:{}, sortable: true, order: 5, default: true, widthCoef:3}));
        base.push(new TreeColumn().build({field: 'prefix', header: 'exportConstructors.fields.prefix', style:{}, sortable: true, order: 5, default: true, widthCoef:1}));
        base.push(new TreeColumn().build({field: 'absSuffix', header: 'exportConstructors.fields.absSuffix', style:{}, sortable: true, order: 5, default: true, widthCoef:1}));
        base.push(new TreeColumn().build({field: 'suffix', header: 'exportConstructors.fields.suffix', style:{}, sortable: true, order: 5, default: true, widthCoef:1}));
        base.push(new TreeColumn().build({field: 'toUnit', header: 'exportConstructors.fields.toUnit', style:{}, sortable: false, order: 5, default: true, widthCoef:2, renderer: (rowData, column) => {return <p>{rowData.data.toUnit?rowData.data.toUnit.name:''}</p>}}));
        base.push(new TreeColumn().build({field: 'outputType', header: 'exportConstructors.fields.outputType', style:{}, sortable: true, order: 5, default: true, widthCoef:1, renderer: (rowData, column) => {return <p>{rowData.data.outputType?getEtOutputType(rowData.data.outputType).name:''}</p>}}));
        /*        base.push(new TreeColumn().build({field: 'count', header: 'categories.fields.count', style:{}, sortable: true, order: 4, default: true, widthCoef:0.5, body: "count"}));
                base.push(new TreeColumn().build({field: 'presenceAttributes', header: 'categories.fields.presenceAttributes', style:{}, sortable: true, order: 5, default: true, widthCoef:0.5, body: "presenceAttributes"}));*/
        return base;
    }
}

export const ExportConstructorSchema = Yup.object().shape({

});

export function getEtElementType(type){
    switch (type) {
        case EtElementType.GROUP: return {
            nameForRemember: 'GROUP',
            name: i18n.t('exportConstructors.fields.types.group')
        };
        case EtElementType.ATTRIBUTE: return {
            nameForRemember: 'ATTRIBUTE',
            name: i18n.t('exportConstructors.fields.types.attribute')
        };
        case EtElementType.VALUE: return {
            nameForRemember: 'VALUE',
            name: i18n.t('exportConstructors.fields.types.value')
        };
        case EtElementType.UNIT: return {
            nameForRemember: 'UNIT',
            name: i18n.t('exportConstructors.fields.types.unit')
        };
        case EtElementType.QUANTIFICATOR: return {
            nameForRemember: 'QUANTIFICATOR',
            name: i18n.t('exportConstructors.fields.types.quantificator')
        };
        default: return type;
    }
}

export function renderEtElementType(){
    return [
        getEtElementType('GROUP'),
        getEtElementType('ATTRIBUTE'),
        getEtElementType('VALUE'),
        getEtElementType('UNIT'),
        getEtElementType('QUANTIFICATOR')
    ];
}

export function getEtOutputType(type){
    switch (type) {
        case EtOutputType.NOT_ASSIGNED: return {
            nameForRemember: 'NOT_ASSIGNED',
            name: i18n.t('')
        };
        case EtOutputType.VALUE: return {
            nameForRemember: 'VALUE',
            name: i18n.t('exportConstructors.fields.outputTypes.value')
        };
        case EtOutputType.NAME: return {
            nameForRemember: 'NAME',
            name: i18n.t('exportConstructors.fields.outputTypes.name')
        };
        case EtOutputType.QUANTIFICATOR: return {
            nameForRemember: 'QUANTIFICATOR',
            name: i18n.t('exportConstructors.fields.outputTypes.quantificator')
        };
        case EtOutputType.MATH_VALUE: return {
            nameForRemember: 'MATH_VALUE',
            name: i18n.t('exportConstructors.fields.outputTypes.mathValue')
        };
        /*case EtOutputType.MARKET_TEXT: return 'Маркет. текст';*/
        default: return type;
    }
}

export function renderEtOutputType(type){
    return [
        getEtOutputType('NOT_ASSIGNED'),
        getEtOutputType('VALUE'),
        getEtOutputType('NAME'),
        getEtOutputType('QUANTIFICATOR'),
        getEtOutputType('MATH_VALUE')
    ];
}

export function getEtUQOutputType(type){
    switch (type) {
        case EtUQOutputType.NOT_ASSIGNED: return '';
        case EtUQOutputType.BEFORE: return 'До';
        case EtUQOutputType.AFTER: return 'После';
        default: return type;
    }
}

export function renderEtUQOutputType(){
    return (
        <React.Fragment>
            <option key={'NOT_ASSIGNED'} value='NOT_ASSIGNED'>{getEtUQOutputType('NOT_ASSIGNED')}</option>
            <option key={'BEFORE'} value='BEFORE'>{getEtUQOutputType('BEFORE')}</option>
            <option key={'AFTER'} value='AFTER'>{getEtUQOutputType('AFTER')}</option>
        </React.Fragment>
    );
}

export function getEtResultType(type){
    switch (type) {
        case EtResultType.NONE: return '';
        case EtResultType.NUMBER: return 'Число';
        case EtResultType.STRING: return 'Строка';
        case EtResultType.SINGLE: return 'Одно знач.';
        case EtResultType.MULTI: return 'Списко знач.';
        default: return type;
    }
}

export function renderEtResultType(){
    return (
        <React.Fragment>
            <option key='NONE' value='NONE'>{getEtResultType('NONE')}</option>
            <option key='NUMBER' value='NUMBER'>{getEtResultType('NUMBER')}</option>
            <option key='STRING' value='STRING'>{getEtResultType('STRING')}</option>
            <option key='SINGLE' value='SINGLE'>{getEtResultType('SINGLE')}</option>
            <option key='MULTI' value='MULTI'>{getEtResultType('MULTI')}</option>
        </React.Fragment>
    );
}

export function getClassCatType(type){
    switch (type) {
        case ClassCatType.NONE: return '';
        case ClassCatType.MANUFACTURER: return 'Производитель';
        case ClassCatType.BRAND: return 'Бренд';
        case ClassCatType.FAMILY: return 'Семейство';
        case ClassCatType.SERIES: return 'Серия';
        case ClassCatType.MODEL: return 'Модель';
        default: return type;
    }
}

export function renderClassCatType(){
    return (
        <React.Fragment>
            <option key='NONE' value='NONE'>{getClassCatType('NONE')}</option>
            <option key='MANUFACTURER' value='MANUFACTURER'>{getClassCatType('MANUFACTURER')}</option>
            <option key='BRAND' value='BRAND'>{getClassCatType('BRAND')}</option>
            <option key='FAMILY' value='FAMILY'>{getClassCatType('FAMILY')}</option>
            <option key='SERIES' value='SERIES'>{getClassCatType('SERIES')}</option>
            <option key='MODEL' value='MODEL'>{getClassCatType('MODEL')}</option>
        </React.Fragment>
    );
}

export function getEtItemFLAGS(type) {
    switch (type) {
        case EtItemFLAGS.SINGLE_VALUE: return 'Каждое значение как отдельный компонент';
        case EtItemFLAGS.UPPERCASE: return 'Все в верхний регистр';
        case EtItemFLAGS.LOWCASE: return 'Все в нижний регистр';
        case EtItemFLAGS.LOWCASEWF: return 'Все в нижний регистр кроме первой буквы';
        case EtItemFLAGS.LOWCASEWFALL: return 'Все в нижний регистр кроме первой (во все словах)';
        case EtItemFLAGS.YES: return 'Если ЕСТЬ значение';
        case EtItemFLAGS.NO: return 'Если НЕТУ знчаения';
        default: return type;
    }
}

export function renderEtItemFLAGS(){
    return (
        <React.Fragment>
            <option key='SINGLE_VALUE' value='SINGLE_VALUE'>{getEtItemFLAGS('SINGLE_VALUE')}</option>
            <option key='UPPERCASE' value='UPPERCASE'>{getEtItemFLAGS('UPPERCASE')}</option>
            <option key='LOWCASE' value='LOWCASE'>{getEtItemFLAGS('LOWCASE')}</option>
            <option key='LOWCASEWF' value='LOWCASEWF'>{getEtItemFLAGS('LOWCASEWF')}</option>
            <option key='LOWCASEWFALL' value='LOWCASEWFALL'>{getEtItemFLAGS('LOWCASEWFALL')}</option>
            <option key='YES' value='YES'>{getEtItemFLAGS('YES')}</option>
            <option key='NO' value='NO'>{getEtItemFLAGS('NO')}</option>
        </React.Fragment>
    );
}