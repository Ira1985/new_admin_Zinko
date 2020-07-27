import * as Yup from "yup";
import BaseEntity from "./base/BaseEntity";
import FilterItem from "./base/FilterItem";
import TreeColumn from "./base/TreeColumn";
import GridColumn from "./base/GridColumn";

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
        this.unit = (item['unit']?item['unit']:null);
        this.hasQuantities = (item.hasOwnProperty('hasQuantities')?item['hasQuantities']:false);
        this.subsGroup = (item['subsGroup']?item['subsGroup']:null);
        this.quantType = (item['quantType']?item['quantType']:QuantType.NUMBER);
        this.roundUp = (item['roundUp']?item['roundUp']:null);
        this.quantSubsGroup = (item['quantSubsGroup']?item['quantSubsGroup']:null);
        this.sourceType = (item['sourceType']?item['sourceType']:LinkSourceType.NONE);
        this.attrCategory = (item['attrCategory']?item['attrCategory']:null);
        this.system = (item.hasOwnProperty('system')?item['system']:false);
        this.systemSource = (item['systemSource']?item['systemSource']:AttrSystemSource.NONE);
        return this;
    }

    static buildFilters() {
        let base = BaseEntity.buildFilters();
        base.push(FilterItem.buildList('attributes.attrType','attrType', true));
        base.push(FilterItem.buildList('attributes.valueType','valueType', true));
        base.push(FilterItem.buildSelect('attributes.attrCategory','attrCategory', false));
        base.push(FilterItem.buildCheck('attributes.system','system', false, false));
        return base;
    }

    static buildColumns() {
        let columns =  BaseEntity.buildColumns();
        columns.push(new GridColumn().build({field: 'attrType', header: 'attributes.attrType', style:{}, sortable: true, order: 4, default: true, widthCoef:1.5}));
        columns.push(new GridColumn().build({field: 'valueType', header: 'attributes.valueType', style:{}, sortable: true, order: 5, default: true, widthCoef:1.5}));
        columns.push(new GridColumn().build({field: 'unit', header: 'attributes.unit', style:{}, sortable: true, order: 6, default: true, widthCoef:1.5}));
        columns.push(new GridColumn().build({field: 'attrCategory', header: 'attributes.attrCategory', style:{}, sortable: true, order: 7, default: true, widthCoef:1.5}));
        columns.push(new GridColumn().build({field: 'subsGroup', header: 'attributes.subsGroup', style:{}, sortable: true, order: 8, default: true, widthCoef:1.5}));
        columns.push(new GridColumn().build({field: 'hasQuantities', header: 'attributes.hasQuantities', style:{}, sortable: true, order: 9, default: true, widthCoef:0.5}));
        columns.push(new GridColumn().build({field: 'system', header: 'attributes.system', style:{}, sortable: true, order: 10, default: true, widthCoef:0.5}));

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

export function getAttrSystemSource(type){
    switch (type) {
        case AttrSystemSource.NONE: return '';
        case AttrSystemSource.PRODUCT_ID: return 'ID продукта';
        case AttrSystemSource.ARTICLE: return 'Артикль';
        case AttrSystemSource.MANUFACTURER: return 'Производитель';
        case AttrSystemSource.COUNTRY: return 'Страна';
        case AttrSystemSource.BRAND: return 'Бренд';
        case AttrSystemSource.CODE: return 'Код';
        case AttrSystemSource.FULL_NAME: return 'Имя';
        case AttrSystemSource.IMAGES: return 'Изображения';
        case AttrSystemSource.BASE_IMAGE: return 'Базовое изображение';
        case AttrSystemSource.CERTIFICATES: return 'Сертификаты';
        case AttrSystemSource.INSTRUCTIONS: return 'Инструкции';
        case AttrSystemSource.VIDEOS: return 'Видео';
        case AttrSystemSource.HTML_CONTENT: return 'Контент HTML';
        case AttrSystemSource.BARCODES: return 'Штрихкоды';
        default: return type;
    }
}

export function renderAttrSystemSource(){
    return (
        <React.Fragment>
            <option value='NONE'>{getAttrSystemSource('NONE')}</option>
            <option value='PRODUCT_ID'>{getAttrSystemSource('PRODUCT_ID')}</option>
            <option value='ARTICLE'>{getAttrSystemSource('ARTICLE')}</option>
            <option value='MANUFACTURER'>{getAttrSystemSource('MANUFACTURER')}</option>
            <option value='COUNTRY'>{getAttrSystemSource('COUNTRY')}</option>
            <option value='BRAND'>{getAttrSystemSource('BRAND')}</option>
            <option value='CODE'>{getAttrSystemSource('CODE')}</option>
            <option value='FULL_NAME'>{getAttrSystemSource('FULL_NAME')}</option>
            <option value='IMAGES'>{getAttrSystemSource('IMAGES')}</option>
            <option value='BASE_IMAGE'>{getAttrSystemSource('BASE_IMAGE')}</option>
            <option value='CERTIFICATES'>{getAttrSystemSource('CERTIFICATES')}</option>
            <option value='INSTRUCTIONS'>{getAttrSystemSource('INSTRUCTIONS')}</option>
            <option value='VIDEOS'>{getAttrSystemSource('VIDEOS')}</option>
            <option value='HTML_CONTENT'>{getAttrSystemSource('HTML_CONTENT')}</option>
            <option value='BARCODES'>{getAttrSystemSource('BARCODES')}</option>
            {/*<option value='SUBSTITUTION'>{getLinkSourceType('SUBSTITUTION')}</option>*/}
            {/*<option value='FILE_LINK'>{getValueType('FILE_LINK')}</option>*/}
        </React.Fragment>
    );
}

export function getAttrType(type){
    switch (type) {
        case AttrType.GLOBAL: return 'Глобальный';
        case AttrType.INNER: return 'Внутренний';
        case AttrType.OUTER: return 'Внешний';
        case AttrType.SYSTEM: return 'Системный';
        default: return type;
    }
}

export function renderAttrType(){
    return (
        <React.Fragment>
            <option value='GLOBAL'>{getAttrType('GLOBAL')}</option>
            {/*<option value='INNER'>{getAttrType('INNER')}</option>
            <option value='OUTER'>{getAttrType('OUTER')}</option>*/}
            <option value='SYSTEM'>{getAttrType('SYSTEM')}</option>
        </React.Fragment>
    );
}

export function renderValueType(){
    return (
        <React.Fragment>
            <option value='NUMBER'>{getValueType('NUMBER')}</option>
            <option value='STRING'>{getValueType('STRING')}</option>
            <option value='SINGLE'>{getValueType('SINGLE')}</option>
            <option value='MULTI'>{getValueType('MULTI')}</option>
            <option value='YESNO'>{getValueType('YESNO')}</option>
            <option value='LINK_SOURCE'>{getValueType('LINK_SOURCE')}</option>
            {/*<option value='FILE_LINK'>{getValueType('FILE_LINK')}</option>*/}
        </React.Fragment>
    );
}

export function renderQuantType(){
    return (
        <React.Fragment>
            <option value='NUMBER'>{getQuantType('NUMBER')}</option>
            <option value='STRING'>{getQuantType('STRING')}</option>
            <option value='YESNO'>{getQuantType('YESNO')}</option>
        </React.Fragment>
    );
}

export function getValueType(type){
    switch (type) {
        case ValueType.NUMBER: return 'Число';
        case ValueType.STRING: return 'Строка';
        case ValueType.SINGLE: return 'Одно значение';
        case ValueType.MULTI: return 'Список значений';
        case ValueType.YESNO: return 'Да/Нет';
        case ValueType.LINK_SOURCE: return 'Ссылка на источник';
        case ValueType.FILE_LINK: return 'Ссылка на файл';
        default: return type;
    }
}

export function getQuantType(type){
    switch (type) {
        case QuantType.NUMBER: return 'Число';
        case QuantType.STRING: return 'Строка';
        case QuantType.YESNO: return 'Да/Нет';
        default: return type;
    }
}

export function getLinkSourceType(type){
    switch (type) {
        case LinkSourceType.NONE: return '';
        case LinkSourceType.BRAND: return 'Бренд';
        case LinkSourceType.MANUFACTURER: return 'Производитель';
        case LinkSourceType.COUNTRY: return 'Страна';
        case LinkSourceType.SUBSTITUTION: return 'Значений с списка';
        case LinkSourceType.PRODUCT_CONTENT: return 'Контент продукта';
        default: return type;
    }
}

export function renderLinkSourceType(){
    return (
        <React.Fragment>
            <option value='NONE'>{getLinkSourceType('NONE')}</option>
            <option value='BRAND'>{getLinkSourceType('BRAND')}</option>
            <option value='MANUFACTURER'>{getLinkSourceType('MANUFACTURER')}</option>
            <option value='COUNTRY'>{getLinkSourceType('COUNTRY')}</option>
            {/*<option value='SUBSTITUTION'>{getLinkSourceType('SUBSTITUTION')}</option>*/}
            <option value='PRODUCT_CONTENT'>{getLinkSourceType('PRODUCT_CONTENT')}</option>
            {/*<option value='FILE_LINK'>{getValueType('FILE_LINK')}</option>*/}
        </React.Fragment>
    );
}
